using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public static class Loans
    {
        //<summary> return all the loans.
        public static List<DAL.Loans> GetAllLoans()
        {
            return ProtectedDataMembers.db.Loans.ToList();
        }

        //<summary> return all the loans of specific user.
        public static List<DAL.Loans> GetLoansById(string identity, DateTime date)
        {
            DateTime firstDate = new DateTime();
            if (date > firstDate)
            {
                List<DAL.Scholarships> nextScholarship = ProtectedDataMembers.db.Scholarships.Where(sclr => sclr.Identity == identity && sclr.Date >= date && sclr.Confirm).OrderBy(sclr => sclr.Date).Take(2).ToList();

                DateTime nextScholarshipDate = nextScholarship.Last().Date;
                var c = ProtectedDataMembers.db.Loans.Where(loan => loan.BorrowerIdentity == identity && loan.ReturnLoanGeorgianDate >= date && loan.ReturnLoanGeorgianDate < nextScholarshipDate).OrderBy(loan => loan.ReturnLoanGeorgianDate).ToList();

                return ProtectedDataMembers.db.Loans.Where(loan => loan.BorrowerIdentity == identity && loan.ReturnLoanGeorgianDate >= date && loan.ReturnLoanGeorgianDate < nextScholarshipDate).OrderBy(loan => loan.ReturnLoanGeorgianDate).ToList();
                //}
                //var monthAgoDate = date.AddMonths(-1);
                //return ProtectedDataMembers.db.Loans.Where(loan => loan.BorrowerIdentity == identity && loan.ReturnLoanGeorgianDate < date && loan.ReturnLoanGeorgianDate > monthAgoDate).OrderBy(loan => loan.ReturnLoanGeorgianDate).ToList();
            }
            return new List<DAL.Loans>();
        }

        //<summary> chack if the wanted bank account is already saved.
        public static string CheckIfExistBankAccount(DAL.BankAccounts bankAccount)
        {
            try
            {
                DAL.BankAccounts isExistBankAccount = ProtectedDataMembers.db.BankAccounts.Where(x => x.BranchNumber == bankAccount.BranchNumber && x.AccountNumber == bankAccount.AccountNumber).FirstOrDefault();
                if (isExistBankAccount != null)
                    return "true";
                return "false";
            }
            catch (Exception ex)
            {

                return ex.ToString();
            }
        }

        //<summary> save bank account detailes.
        public static string SaveBankAccount(DAL.BankAccounts bankAccount)
        {
            try
            {
                DAL.BankAccounts isExistBankAccount = ProtectedDataMembers.db.BankAccounts.Where(x => x.BranchNumber == bankAccount.BranchNumber && x.AccountNumber == bankAccount.AccountNumber).FirstOrDefault();
                if (isExistBankAccount == null)
                {
                    ProtectedDataMembers.db.BankAccounts.Add(bankAccount);
                    ProtectedDataMembers.db.SaveChanges();
                    return "save bankAccount detailes succesfully";
                }
                else
                    return "find similar details for bank account";
            }
            catch (Exception ex)
            {

                return ex.ToString();
            }
        }

        //<summary> save the datailes of return loan and calculate 
        //          the new debt for the user.
        public static string SaveReturnLoan(DAL.Loans loan)
        {
            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();

            loan.ReturnLoanGeorgianDate = DateTime.Today;
            loan.ReturnLoanHebrewDate = DateTime.Today.ToString("d MMM y", ci);
            DAL.Loans previousLoan = ProtectedDataMembers.db.Loans.Where(x => x.BorrowerIdentity == loan.BorrowerIdentity).OrderByDescending(x => x.ReturnLoanGeorgianDate).FirstOrDefault();
            int sum;
            if (previousLoan == null)
            {
                sum = ProtectedDataMembers.db.Scholarships.Where(x => x.Identity == loan.BorrowerIdentity).Sum(x => x.RemainderDebt);
                loan.DebtBalance = sum - loan.LoanSum;
            }
            else
                loan.DebtBalance = previousLoan.DebtBalance - loan.DebtBalance;

            //loan.DebtBalance = ProtectedDataMembers.db.Loans.Where(x => x.BorrowerIdentity == loan.BorrowerIdentity).OrderByDescending(x => x.ReturnLoanGeorgianDate).FirstOrDefault().DebtBalance;
            // if(loan.DebtBalance is )
            try
            {
                ProtectedDataMembers.db.BankAccounts.Local.Clear();
                ProtectedDataMembers.db.Loans.Add(loan);
                ProtectedDataMembers.db.SaveChanges();
            }
            catch (Exception ex)
            {
                ProtectedDataMembers.db.Loans.Remove(loan);
                ProtectedDataMembers.db.SaveChanges();
                return ex.ToString();

            }
            return "";
        }

        public static int GetPrevScholarshipByIdForCalculateRemaindDebt(string identity, DateTime date)
        {
            int remaindDebt = 0;
            DateTime firstDate = new DateTime();
            if (date > firstDate)
            {
                DAL.Loans lastLoan = ProtectedDataMembers.db.Loans.Where(ln => ln.BorrowerIdentity == identity && ln.ReturnLoanGeorgianDate <= date).OrderByDescending(ln => ln.ReturnLoanGeorgianDate).Take(1).SingleOrDefault();
                DateTime firstDateForSearching;
                if (lastLoan != null)
                {
                    firstDateForSearching = lastLoan.ReturnLoanGeorgianDate;
                    remaindDebt = lastLoan.DebtBalance;
                }
                else
                    firstDateForSearching = new DateTime();
                remaindDebt += ProtectedDataMembers.db.Scholarships.Where(sclr => sclr.Identity == identity && sclr.Date >= firstDateForSearching && sclr.Date < date).Sum(sclr => (int?)sclr.RemainderDebt) ?? 0;
                //var monthAgoDate = date.AddMonths(-1);
                //var loan = ProtectedDataMembers.db.Scholarships.Where(schlp => schlp.Identity == identity && schlp.Date <= date && schlp.RemainderDebt > 0).ToList();
                return remaindDebt;
            }
            return 0;
        }
    }
}
