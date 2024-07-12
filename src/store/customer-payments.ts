import { create } from 'zustand';

export type CustomerPayments = {
  name: string;
  email: string;
  phone: string;
  member_qty: number;
  price_plan: number;
  plan: string;
  setNames: (name: string) => void;
  setEmails: (email: string) => void;
  setPhones: (phone: string) => void;
  setMemberQtys: (member_qty: number) => void;
  setPricePlan: (price_plan: string) => void;
};

export const useCustomerPayments = create<CustomerPayments>(set => ({
  name: '',
  email: '',
  phone: '',
  member_qty: 0,
  price_plan: 0,
  plan: '',
  setNames: (name: string) => set({ name }),
  setEmails: (email: string) => set({ email }),
  setPhones: (phone: string) => set({ phone }),
  setMemberQtys: (member_qty: number) => set({ member_qty }),
  setPricePlan: (plan: string) => {
    let price;

    switch (plan) {
      case 'standard':
        price = 50000;
        break;
      default:
        price = 0;
        break;
    }

    set({ price_plan: price, plan});
  },
}));
