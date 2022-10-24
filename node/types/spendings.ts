interface Spending {
  description: string;
  amount: number;
  spent_at: string;
  currency: string;
}

interface SpendingDB extends Spending {
  id: string;
}

export { Spending, SpendingDB };
