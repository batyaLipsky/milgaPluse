using System;
using System.Collections.Generic;
using System.Web.Http;

namespace API.Controllers
{
    public class LoansController : ApiController
    {
        [HttpGet]
        public List<DAL.Loans> GetAllLoans()
        {
            return BL.Loans.GetAllLoans();
        }

        [HttpGet]
        public List<DAL.Loans> GetLoansById(string identity, DateTime date)
        {
            return BL.Loans.GetLoansById(identity, date);
        }

        [HttpPost]
        public string CheckIfExistBankAccount(DAL.BankAccounts bankAccount)
        {
            return BL.Loans.CheckIfExistBankAccount(bankAccount);
        }

        [HttpPost]
        public string SaveBankAccount(DAL.BankAccounts bankAccount)
        {
            return BL.Loans.SaveBankAccount(bankAccount);
        }

        [HttpPost]
        public string SaveReturnLoan(DAL.Loans loan)
        {
            return BL.Loans.SaveReturnLoan(loan);
        }

        [HttpGet]
        public int GetPrevScholarshipByIdForCalculateRemaindDebt(string identity, DateTime date)
        {
            return BL.Loans.GetPrevScholarshipByIdForCalculateRemaindDebt(identity, date);
        }
    }
}