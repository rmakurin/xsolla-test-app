export interface transaction {
  transaction: {
    project: {
      id: number;
      name: string;
    };
    payment_method: {
      id: number;
      name: string;
    };
    transfer_date: string;
    id: number;
    refund_reason: string | null;
    status: string;
    external_id: number | null;
    dry_run: number;
    is_refund_allowed: number;
  };
  user: {
    id: string;
    name: string | null;
    email: string | null;
    phone: number | null;
    country: string;
  };
  payment_details: {
    payment: {
      currency: string;
      amount: number;
      amount_from_ps: number;
    };
    sales_tax: {
      percent: number;
      amount: number;
    };
  };
  purchase: {
    virtual_currency: {
      amount: number;
      name: string | null;
    };
    virtual_items: string | null;
    simple_checkout: {
      amount: number;
      currency: string;
    };
    pin_codes: {
      amount: number | null;
      currency: string | null;
      content: number | null;
    };
    subscription: {
      name: string | null;
    };
  };
}
