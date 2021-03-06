//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class Users
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Users()
        {
            this.BankAccounts = new HashSet<BankAccounts>();
            this.Loans = new HashSet<Loans>();
            this.Scholarships = new HashSet<Scholarships>();
        }
    
        public string Identity { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Telephon { get; set; }
        public string CellularTelephone1 { get; set; }
        public string CellularTelephone2 { get; set; }
        public int City { get; set; }
        public string Street { get; set; }
        public int BuildingNumber { get; set; }
        public Nullable<int> HomeNumber { get; set; }
        public Nullable<int> ZipCode { get; set; }
        public string BirthDate_hebrew { get; set; }
        public System.DateTime BirthDate_gregorian { get; set; }
        public int Children { get; set; }
        public Nullable<bool> FullDay { get; set; }
        public Nullable<bool> DoingTest { get; set; }
        public Nullable<bool> IsManager { get; set; }
        public bool LearnNowadays { get; set; }
        public Nullable<System.DateTime> DateOfLeave { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BankAccounts> BankAccounts { get; set; }
        public virtual City City1 { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Loans> Loans { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Scholarships> Scholarships { get; set; }
    }
}
