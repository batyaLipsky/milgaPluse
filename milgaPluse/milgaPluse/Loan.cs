using System;

namespace milgaPluse
{
    class Loan
    {
        public DateTime date { get; set; }
        public int lenderId { get; set; }
        public bool takeOrBack { get; set; }
        public string firstNanelender { get; set; }
        public string lastNanelender { get; set; }
        public string firstNaneBorrwer { get; set; }
        public string lastNaneBorrwer { get; set; }
        public string wayOfReturn { get; set; }
        public int accountNumberLender { get; set; }
        public int accountNumberBorrower { get; set; }

    }
}

