export interface Spending {
  description: string;
  spent_at: string;
  currency: string;
  amount: number;
}

export interface SpendingDB extends Spending {
  id: string;
}
