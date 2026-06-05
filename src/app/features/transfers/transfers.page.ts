import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { BankingService } from '../../core/services/banking.service';
import { NotificationStore } from '../../core/state/notification.store';
import { AuditStore } from '../../core/state/audit.store';
import { AuthStore } from '../../core/state/auth.store';
import { AccountSummary } from '../../core/models/banking.models';

function amountLimitValidator(control: AbstractControl<number>): ValidationErrors | null {
  const value = Number(control.value);
  if (value > 50000) {
    return { limitExceeded: true };
  }
  return null;
}

@Component({
  selector: 'app-transfers-page',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './transfers.page.html',
  styleUrl: './transfers.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransfersPage {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly bankingService = inject(BankingService);
  private readonly notificationStore = inject(NotificationStore);
  private readonly auditStore = inject(AuditStore);
  protected readonly authStore = inject(AuthStore);
  private readonly overview = toSignal(this.bankingService.getOverview(), { initialValue: null });

  protected readonly accounts = computed(() => this.overview()?.accounts ?? [] as AccountSummary[]);
  protected readonly today = new Date().toISOString().slice(0, 10);

  protected readonly form = this.fb.group({
    originAccount: ['acc-corrente', [Validators.required]],
    destinationName: ['', [Validators.required, Validators.minLength(3)]],
    agency: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
    accountNumber: ['', [Validators.required, Validators.minLength(5)]],
    amount: [100, [Validators.required, Validators.min(1), amountLimitValidator]],
    executionDate: [this.today, [Validators.required]],
    description: ['']
  });

  protected readonly selectedAccount = computed(() => this.accounts().find((account) => account.id === this.form.controls.originAccount.value));
  protected readonly insufficientBalance = computed(() => Number(this.form.controls.amount.value) > (this.selectedAccount()?.balance ?? 0));

  protected isInvalid(controlName: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.touched || control.dirty);
  }

  protected submit(): void {
    if (this.form.invalid || this.insufficientBalance()) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.auditStore.register(`Transferência solicitada para ${value.destinationName}`, 'Transferências', 'sucesso', this.authStore.role());
    this.notificationStore.addNotification({
      title: 'Transferência enviada',
      description: `Operação de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value.amount)} registrada para validação.`,
      type: 'success'
    });
    this.form.reset({ originAccount: 'acc-corrente', destinationName: '', agency: '', accountNumber: '', amount: 100, executionDate: this.today, description: '' });
  }
}
