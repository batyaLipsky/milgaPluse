export class loan {
	ReturnLoanGeorgianDate: Date;
	ReturnLoanHebrewDate: string;
	BorrowerIdentity: string;
	AccountNumberBorrower: string;
	NoteOfReturnLoan: string;
	WayOfPay: string;
	LoanSum: number;
	DebtBalance:number;
}
        
export enum loanTitle {
	DateGetLoan = "תאריך לועזי",
	DateReturnLoan = "תאריך החזרה",
	BorrowerName = "שם הלווה",
	AccountNumberBorrower = "מספר חשבון בנק",
	NoteOfGetLoan = "הערות-הלוואה",
	NoteOfReturnLoan = "הערות-החזר הלוואה",
	WayOfPay = "צורת תשלום",
	LoanSum = "סכום",
	ScholarshipDate="תאריך המלגה"
}