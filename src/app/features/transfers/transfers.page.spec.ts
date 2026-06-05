import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { DashboardOverview } from '../../core/models/banking.models';
import { BankingService } from '../../core/services/banking.service';
import { TransfersPage } from './transfers.page';

const overviewFixture: DashboardOverview = {
  accounts: [
    { id: 'acc-corrente', label: 'Conta corrente', agency: '0001', number: '12345-6', balance: 10000, currency: 'BRL' }
  ],
  investments: [],
  cards: [],
  transactions: [],
  cashflow: [],
  expensesByCategory: []
};

const bankingServiceStub = {
  getOverview: () => of(overviewFixture)
};

describe('TransfersPage', () => {
  let component: TransfersPage;
  let fixture: ComponentFixture<TransfersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransfersPage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: BankingService, useValue: bankingServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransfersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar a página de transferências', () => {
    expect(component).toBeTruthy();
  });
});
