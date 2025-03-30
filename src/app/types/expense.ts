export interface Expense {
    id: number;
    name: string;
    category: string;
    description: string;
    vendor: string;
    taxable: string;
    additionalNotes: string;
    amount: number;
    createdDate: string;
}