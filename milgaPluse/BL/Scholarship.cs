using DAL;
using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace BL
{
    public static class Scholarship
    {
        //<summary> return the scholarship of the request user in the request month of the request year
        public static List<Scholarships> GetAllScholarshipAccordingParams(string identity, string year, string month)
        {
            //ProtectedDataMembers.db.SaveChanges();
            if (identity != null)
                return ProtectedDataMembers.db.Scholarships.Where(sclr => sclr.Identity == identity && sclr.HebrewYear == year && sclr.HebrewMonth == month && sclr.Confirm).OrderBy(sclr => sclr.Identity).ThenBy(sclr => sclr.Date).ToList();
            else
                return ProtectedDataMembers.db.Scholarships.Where(sclr => sclr.HebrewYear == year && sclr.HebrewMonth == month && sclr.Confirm).OrderBy(sclr => sclr.Identity).ThenBy(sclr => sclr.Date).ToList();

        }

        //<summary> return all the scholarships of the request user in the 
        //          request month (throughout all the years) or in the request year
        public static List<Scholarships> GetAllScholarshipAccordingParams(string identity, string month_or_year)
        {
            if (identity != null)
                return ProtectedDataMembers.db.Scholarships.Where(sclr => sclr.Identity == identity && (sclr.HebrewYear == month_or_year || sclr.HebrewMonth == month_or_year) && sclr.Confirm).OrderBy(sclr => sclr.Identity).ThenBy(sclr => sclr.Date).ToList();//&&sclr.Confirm
            else
                return ProtectedDataMembers.db.Scholarships.Where(sclr => (sclr.HebrewYear == month_or_year || sclr.HebrewMonth == month_or_year) && sclr.Confirm).OrderBy(sclr => sclr.Identity).ThenBy(sclr => sclr.Date).ToList();//&&sclr.Confirm

        }

        //<summary> save the basic data for scholarship and return success or error
        public static string SaveBasicDataScholarship(ValueOfStaticScholarshipMembers getValues)
        {
            try
            {
                if (File.Exists("E:/milgaPluse/milgaPluse/getValues"))
                {
                    string[] oldFiles = Directory.GetFiles("E:/milgaPluse/milgaPluse", "getValues*");
                    File.Move("E:/milgaPluse/milgaPluse/getValues", "E:/milgaPluse/milgaPluse/getValues" + oldFiles.Length);
                }
                IFormatter formatter = new BinaryFormatter();
                Stream stream = new FileStream("E:/milgaPluse/milgaPluse/getValues", FileMode.Create, FileAccess.Write);
                formatter.Serialize(stream, getValues);
                stream.Close();
                return "succeed";
            }
            catch (Exception ex)
            {

                return ex.ToString();
            }
        }

        public static List<KeyValuePair<string, ValueOfStaticScholarshipMembers>> GetOldDtaOfBasicDataForScholarship()
        {
            //get this hebrew month and this hebrew year
            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();

            List<KeyValuePair<string, ValueOfStaticScholarshipMembers>> basicScholarshipValues = new List<KeyValuePair<string, ValueOfStaticScholarshipMembers>>();
            IFormatter formatter = new BinaryFormatter();
            string[] filesNames = Directory.GetFiles("E:/milgaPluse/milgaPluse", "getValues*");
            var i = 0;
            string hebrewDate;
            foreach (var file in filesNames)
            {
                if (i > 0)
                    using (Stream stream = new FileStream(file, FileMode.Open, FileAccess.Read, FileShare.Read))
                    {
                        hebrewDate = File.GetLastWriteTime(file).ToString("d MMM y", ci);
                        basicScholarshipValues.Add(new KeyValuePair<string, ValueOfStaticScholarshipMembers>(hebrewDate, (ValueOfStaticScholarshipMembers)formatter.Deserialize(stream)));//((hebrewDate,(ValueOfStaticScholarshipMembers)formatter.Deserialize(stream)));
                    }
                i++;
            }
            return basicScholarshipValues;
            // return new Dictionary<string, ValueOfStaticScholarshipMembers>();
        }
        //<summary> check if user can apply scholarship for this month or for the next month
        public static List<string> FindIfApplyNewScholarship(string id)
        {
            //get this hebrew month and this hebrew year
            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();
            var month = DateTime.Today.ToString("MMM", ci);
            var year = DateTime.Today.ToString("yyy", ci);
            //find scholarship for this month and year
            var scholarship = from scolar in ProtectedDataMembers.db.Scholarships
                              where scolar.HebrewYear == year && scolar.HebrewMonth == month && scolar.Identity == id
                              select scolar;
            //if already apply scholarship 
            if (scholarship.Count() > 0)
            {
                var user = ProtectedDataMembers.db.Users.Find(id);
                List<string> returnTrueOrfalse = new List<string>();

                if (user.FullDay != null)
                {
                    //user learn full day
                    if ((bool)user.FullDay)
                        //get the value of openNewScholarshipForFullDay in order to open scholarship
                        returnTrueOrfalse.Add(ProtectedDataMembers.openNewScholarshipForFullDay.ToString());
                    else
                        //get the value of openNewScholarshipForHalfDay in order to open scholarship
                        returnTrueOrfalse.Add(ProtectedDataMembers.openNewScholarshipForHalfDay.ToString());
                }
                else
                    returnTrueOrfalse.Add(ProtectedDataMembers.openNewScholarshipForHalfDay.ToString());

                if (returnTrueOrfalse[0] == "true")
                {
                    //open new scholarship
                    //get the next month name
                    month = DateTime.Today.AddMonths(1).ToString("MMM", ci);
                    //if the next month is a new year
                    if (month == "תשרי")
                        year = DateTime.Today.AddYears(1).ToString("yyy", ci);
                    returnTrueOrfalse.InsertRange(0, new List<string> { month, year });
                }
                return returnTrueOrfalse;
            }
            //didnt aplly this month
            else
            {
                ProtectedDataMembers.openNewScholarshipForFullDay = false;
                ProtectedDataMembers.openNewScholarshipForHalfDay = false;
                return new List<string> { month, year };
            }
        }

        //<summary> calculate scholarship and return it for confirm
        public static Scholarships CalculateScholarship(DAL.Scholarships scholarship)
        {
            //calculate scholarship for regular month (not as the month that the scholarship is like the previous month.
            ValueOfStaticScholarshipMembers basicScholarshipValues = new ValueOfStaticScholarshipMembers();
            int calculateScholarship = 0;
            try
            {
                //deserilize the basic values for scholarship
                IFormatter formatter = new BinaryFormatter();
                using (Stream stream = new FileStream("E:/milgaPluse/milgaPluse/getValues", FileMode.Open, FileAccess.Read, FileShare.Read))
                {
                    basicScholarshipValues = (ValueOfStaticScholarshipMembers)formatter.Deserialize(stream);
                }

                //validation
                if (!(scholarship.Mark is int))
                    return new DAL.Scholarships();//there isnt mark
                if (!(scholarship.Mark >= 0 && scholarship.Mark <= 100 && scholarship.Absence >= 0 && scholarship.Atmada >= 0
                     && !scholarship.Confirm && scholarship.Date <= DateTime.Today && scholarship.Identity.Length == 9))
                    return new DAL.Scholarships();            // return when at least one of tha details is worng;

                //use learn half day
                if (scholarship.Users.FullDay == null || !(bool)scholarship.Users.FullDay)
                {
                    basicScholarshipValues.AtmadaFullDay /= 2;
                    basicScholarshipValues.FullNumberAtmada /= 2;
                    basicScholarshipValues.ReligiousMinistryForFullDay /= 2;
                    basicScholarshipValues.BasicFullDay /= 2;
                }
                //calculate the scholarship
                /*ReligiousMinistry*/
                calculateScholarship += scholarship.Basic = basicScholarshipValues.BasicFullDay;

                /*basic*/
                calculateScholarship += scholarship.ReligiousMinistry = basicScholarshipValues.ReligiousMinistryForFullDay;

                /*shmirat sdarim*/                //more then the max valid absence, the user can't get this part of the scholarship
                if (scholarship.Absence < basicScholarshipValues.MaxAbsenceForShmiratSdarimMilga)
                    calculateScholarship += scholarship.SumForShmiratSdarim = basicScholarshipValues.ShmiratSdarim -
                        basicScholarshipValues.DiscountPerAbsenceInMilga * scholarship.Absence;
                else
                    scholarship.SumForShmiratSdarim = 0;

                /*atmada*/
                if (!(scholarship.Atmada < basicScholarshipValues.FullNumberAtmada))
                    return new DAL.Scholarships(); //it cant be so many missing atmda;
                calculateScholarship += scholarship.SumForAtmada = basicScholarshipValues.AtmadaFullDay -
                    basicScholarshipValues.DiscountPerAtmadaMilga * scholarship.Atmada;

                /*mark*/
                if (scholarship.Mark < basicScholarshipValues.MinMarkForTestMilga)
                { //too low mark - the user get nothing
                    scholarship.SumForMark = 0;
                    scholarship.ExcellenceScholarship = 0;
                    scholarship.addToShmiratSdarimBecauseGoodTest = 0;
                }
                else
                {
                    scholarship.SumForMark = basicScholarshipValues.Test;
                    scholarship.addToShmiratSdarimBecauseGoodTest = basicScholarshipValues.AddMilgaTestToAtmda *
                        (basicScholarshipValues.FullNumberAtmada - scholarship.Atmada);
                    calculateScholarship += (int)scholarship.SumForMark + (int)scholarship.addToShmiratSdarimBecauseGoodTest;

                    /*excellent mark*/
                    if (scholarship.Mark < basicScholarshipValues.MinExcellentMarkForMilga)
                        scholarship.ExcellenceScholarship = 0;
                    else
                    {
                        scholarship.ExcellenceScholarship = basicScholarshipValues.ExcellenceScholarship;
                        calculateScholarship += (int)scholarship.ExcellenceScholarship;
                    }
                }

                /*musar*/
                if (!scholarship.Musar)
                    scholarship.SumForMusar = 0;
                else
                {
                    scholarship.SumForMusar = basicScholarshipValues.Musar;
                    calculateScholarship += (int)scholarship.SumForMusar;
                }

                /*special scholarship for holidays*/
                if (basicScholarshipValues.HolidayScholarship > 0)
                    if ((int)scholarship.HolidayScholarship > 0)
                        scholarship.HolidayScholarship += basicScholarshipValues.HolidayScholarship;
                    else
                        scholarship.HolidayScholarship = basicScholarshipValues.HolidayScholarship;
                if (scholarship.HolidayScholarship != null)
                    calculateScholarship += (int)scholarship.HolidayScholarship;
                if (scholarship.RefundTransportation != null)
                    calculateScholarship += (int)scholarship.RefundTransportation;
                //neto scholarship
                scholarship.Scholarship = calculateScholarship;
                //global scholarship
                scholarship.ScholarshipsAndLoan = basicScholarshipValues.Staticscholarship;

                /*donation*/
                if (scholarship.Donation != null)
                    scholarship.RemainderDebt = scholarship.ScholarshipsAndLoan - scholarship.Scholarship - (int)scholarship.Donation;
                else
                    scholarship.RemainderDebt = scholarship.ScholarshipsAndLoan - scholarship.Scholarship;

                ProtectedDataMembers.db.Scholarships.AddOrUpdate(scholarship);
                ProtectedDataMembers.db.SaveChanges();
                return scholarship;// return "succeed";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return new DAL.Scholarships();
            }

        }

        //<summary> return list of scholarships that the manager shuold confirm
        public static List<DAL.Scholarships> GetScholarshipForConfirm()
        {
            List<DAL.Scholarships> scholarship = ProtectedDataMembers.db.Scholarships.Where(x => !x.Confirm).OrderBy(x => x.Date).ToList();
            return scholarship;
        }

        //<summary> return list of the users names that their scholarship hadn't confirm yet
        public static Dictionary<string, string> GetNamesOfUsersOfScholarshipForConfirm(string usersIdentity)
        {
            if (usersIdentity != null)
            {
                string[] identitiesArray = usersIdentity.Split(',');
                string[] names = ProtectedDataMembers.db.Users.Where(x => identitiesArray.Contains(x.Identity)).Select(x => x.LastName + " " + x.FirstName).ToArray();//(y => y == x.Identity) != null).ToArray();//.Select(x => x.LastName ).ToArray();
                Dictionary<string, string> idAndName = new Dictionary<string, string>();
                for (var i = 0; i < identitiesArray.Length; i++)
                {
                    idAndName.Add(identitiesArray[i], names[i]);
                }
                return idAndName;
            }
            return new Dictionary<string, string>();
        }

        //<summary> save the confirm scholarship and return success or error
        public static string SaveConfirmScholarship(DAL.Scholarships scholarship)
        {
            var loan = new DAL.Loans();
            int succeedToUpDate;
            ProtectedDataMembers.db.SaveChanges();
            try
            {

                scholarship.Confirm = true;
                ProtectedDataMembers.db.Scholarships.AddOrUpdate(scholarship);
                try
                {
                    succeedToUpDate = ProtectedDataMembers.db.SaveChanges();

                }
                catch (Exception ex)
                {

                }

                //if (succeedToUpDate == 1)
                //    return "המילגה אושרה ונשמרה בהצלחה.";
                //else
                return "שגיאה בשמירת המילגה";
            }
            catch (Exception ex)
            {
                //               ProtectedDataMembers.db.Loans.Remove(loan);
                return ex.ToString();
            }
        }

        //<summary> save the scholarship after the user fill it
        public static string AddNewScholarship(DAL.Scholarships scolarship)
        {
            try
            {
                DAL.Scholarships isScholarshipExist = ProtectedDataMembers.db.Scholarships.Find(scolarship.Identity, scolarship.HebrewMonth, scolarship.HebrewYear, scolarship.Date);
                if (isScholarshipExist == null)
                {
                    scolarship.Date = DateTime.Today;
                    ProtectedDataMembers.db.Scholarships.Add(scolarship);
                    ProtectedDataMembers.db.SaveChanges();
                }
                else
                    if (scolarship != (DAL.Scholarships)isScholarshipExist)
                {
                    ProtectedDataMembers.db.Scholarships.AddOrUpdate(scolarship);
                    var a = ProtectedDataMembers.db.SaveChanges();
                }
                return "true";
            }
            catch (Exception ex)
            {
                ProtectedDataMembers.db.Scholarships.Remove(scolarship);
                return ex.ToString();
            }


        }

        //<summary> get all the confirm scholarships by identity 
        public static List<DAL.Scholarships> GetAllScholarshipAccordingId(string identity)
        {
           // BL.Scholarship.GetTheLastScholarshipForAllUser(identity);
            // GetTheLastScholarshipForAllUser("");
            try
            {
                if (identity == null)
                {
                    List<DAL.Scholarships> saclr = ProtectedDataMembers.db.Scholarships.Where(sclr => sclr.Confirm).OrderBy(x => x.Identity).ThenBy(x => x.Date).ToList();

                    return saclr;
                }
                else
                {
                    List<DAL.Scholarships> saclr = ProtectedDataMembers.db.Scholarships.Where(x => x.Identity == identity).OrderBy(sclr => sclr.Date).ToList();
                    return saclr;
                }

            }
            catch (Exception ex)
            {
                return new List<Scholarships>();
            }
        }

        public static Dictionary<string, DAL.Scholarships> GetTheLastScholarshipForAllUser()
        {

            Dictionary<string, DAL.Scholarships> lastScholarship = ProtectedDataMembers.db.Scholarships.GroupBy(x => x.Identity, (x, y) => new { Key = x, Value = y.OrderByDescending(z => z.Date).FirstOrDefault() }).ToDictionary(obj=>obj.Key,obj=>obj.Value);


            return lastScholarship;
        }



    }
}
