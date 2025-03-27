export interface Expense {
    id: number;
    name: string;
    category: string;
    description: String;
    vendor: string;
    taxable: Boolean;
    additionalNotes: string;
    amount: number;
    createdDate: string;
}