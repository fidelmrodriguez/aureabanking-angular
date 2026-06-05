export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

export const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});

export function formatCurrency(value: number): string {
  return currencyFormatter.format(value);
}

export function formatDate(value: string): string {
  return dateFormatter.format(new Date(value));
}

export function uid(prefix = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 9999)}`;
}
