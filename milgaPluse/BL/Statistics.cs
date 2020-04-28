using DAL;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Globalization;
using System.Linq;


namespace BL
{
    public static class Statistics
    {
        //<summary> return the names in the x month ago (x is param from the user)
        public static List<string> GetLastXMonthNames(int num)
        {
            List<string> monthesNames = new List<string>();
            DateTime today = DateTime.Today;
            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();
            //for (var i = 0; i < num; i++)
            //    monthesNames.Add(today.AddMonths(-i).ToString("MMM", ci));
            DateTime endOfMonth;
            DateTime prevMonth = today;
            for (int i = 0; i < num; i++)
            {
                endOfMonth = new DateTime(prevMonth.Year,
                                   prevMonth.Month,
                                   DateTime.DaysInMonth(prevMonth.Year,
                                                        prevMonth.Month));
                prevMonth = prevMonth.AddDays(-(endOfMonth.Day) + 1);
                monthesNames.Add(prevMonth.ToString("MMM", ci));
            }
            monthesNames.Reverse();
            return monthesNames;
        }

        //<summary> return avg of atmada number for all the users in the x month ago (avg per month) 
        public static Dictionary<string, float> GetAtmadaForAllUsersInXMonthAgo(int num)
        {
            Dictionary<string, float> monthesNamesAndAtmada = new Dictionary<string, float>();
            DateTime today = DateTime.Today;
            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();
            //for (var i = 0; i < num; i++)
            //    monthesNamesAndAtmada.Add(today.AddMonths(-i).ToString("MMM", ci), 0);
            DateTime endOfMonth;
            DateTime prevMonth = today;
            for (int i = 0; i < num; i++)
            {
                endOfMonth = new DateTime(prevMonth.Year,
                                   prevMonth.Month,
                                   DateTime.DaysInMonth(prevMonth.Year,
                                                        prevMonth.Month));
                prevMonth = prevMonth.AddDays(-(endOfMonth.Day) + 1);
                monthesNamesAndAtmada.Add(prevMonth.ToString("MMM", ci), 0);
            }
            monthesNamesAndAtmada.Reverse();
            DateTime XMonthAgo = today.AddMonths(-(num + 1));
            List<DAL.Scholarships> scholarships = ProtectedDataMembers.db.Scholarships.Where(x => x.Confirm && monthesNamesAndAtmada.Keys.Contains(x.HebrewMonth) && XMonthAgo < x.Date).ToList();
            foreach (var item in scholarships)
            {
                monthesNamesAndAtmada[item.HebrewMonth] += item.Atmada;
            }
            monthesNamesAndAtmada = AvgOfDictionaryValues(monthesNamesAndAtmada);
            return monthesNamesAndAtmada;
        }

        //<summary> return atmada number for specific user in the x month ago (number per month) 
        public static Dictionary<string, int> GetAtmadaForUserInXMonthAgo(string id, int num)
        {
            Dictionary<string, int> monthesNamesAndAtmada = new Dictionary<string, int>();
            DateTime today = DateTime.Today;
            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();
            //for (var i = 0; i < num; i++)
            //    monthesNamesAndAtmada.Add(today.AddMonths(-i).ToString("MMM", ci), 0);
            DateTime endOfMonth;
            DateTime prevMonth = today;
            for (int i = 0; i < num; i++)
            {
                endOfMonth = new DateTime(prevMonth.Year,
                                   prevMonth.Month,
                                   DateTime.DaysInMonth(prevMonth.Year,
                                                        prevMonth.Month));
                prevMonth = prevMonth.AddDays(-(endOfMonth.Day) + 1);
                monthesNamesAndAtmada.Add(prevMonth.ToString("MMM", ci), 0);
            }
            monthesNamesAndAtmada.Reverse();
            DateTime XMonthAgo = today.AddMonths(-(num + 1));
            List<DAL.Scholarships> scholarships = ProtectedDataMembers.db.Scholarships.Where(x => x.Identity == id && x.Confirm && monthesNamesAndAtmada.Keys.Contains(x.HebrewMonth) && XMonthAgo < x.Date).ToList();
            foreach (var item in scholarships)
            {
                monthesNamesAndAtmada[item.HebrewMonth] += item.Atmada;
            }
            return monthesNamesAndAtmada;
        }

        //<summary> return avg of loans for all the users in the x month ago (avg per month) 
        public static Dictionary<string, int> GetLoansForAllUsersInXMonthAgo(int num)
        {
            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();

            Dictionary<string, int> monthesNamesAndLoans = new Dictionary<string, int>();
            DateTime today = DateTime.Today;
            if (today.Day > 28)
                today = today.AddDays(-3);
            List<string> month = new List<string>();
            DateTime endOfMonth;
            DateTime prevMonth = today;
            //for (int i = num; i >= 1; i--)
            //{
            //    month.Add(today.AddMonths(-i).Month + "" + today.AddMonths(-i).Year);
            //    monthesNamesAndLoans.Add(today.AddMonths(-i).ToString("MMM", ci), 0);
            //}
            monthesNamesAndLoans.Clear();month.Clear();
            for (int i = num; i >=1; i--)
            {
                prevMonth = today.AddMonths(-i);
                endOfMonth = new DateTime(prevMonth.Year, prevMonth.Month, DateTime.DaysInMonth(prevMonth.Year, prevMonth.Month));
                prevMonth = prevMonth.AddDays((endOfMonth.Day)-10);
                month.Add(prevMonth.Month + "" + prevMonth.Year);
                monthesNamesAndLoans.Add(prevMonth.ToString("MMM", ci), 0);
            }
            List<DAL.Loans> loans = ProtectedDataMembers.db.Loans.Where(x => month.Contains(x.ReturnLoanGeorgianDate.Month + "" + x.ReturnLoanGeorgianDate.Year)).ToList();
            string hebrewMonth;

            foreach (var item in loans)
            {
                hebrewMonth = item.ReturnLoanGeorgianDate.ToString("MMM", ci);
                monthesNamesAndLoans[hebrewMonth] += item.LoanSum;
            }
            return monthesNamesAndLoans;
        }

        //<summary> return avg of users children 
        public static double AVGChildrenForUser()
        {
            double Avg = 0;
            try
            {

                var avg = ProtectedDataMembers.db.Users.Average(x => x.Children);//     .Ticks - .Ticks);
                Avg = avg;
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
            }

            return Avg;
        }

        //<summary> return avg of users ages
        public static double AVGUsersAge()
        {
            double Avg = 0;
            try
            {

                //#pragma warning disable CS0618 // 'EntityFunctions' is obsolete: 'This class has been replaced by System.Data.Entity.DbFunctions.'
                var avg = ProtectedDataMembers.db.Users.Average(x => EntityFunctions.DiffDays(x.BirthDate_gregorian, DateTime.Today));//     .Ticks - .Ticks);
                                                                                                                                      //#pragma warning restore CS0618 // 'EntityFunctions' is obsolete: 'This class has been replaced by System.Data.Entity.DbFunctions.'
                Avg = (double)(avg / 365.2425);
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
            }

            return Avg;
        }

        //<summary> return avg of scholarship sum for all the users in the x month ago (avg per month) 
        public static Dictionary<string, float> GetScholarshipForAllUsersInXMonthAgo(int num)
        {
            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();

            Dictionary<string, float> monthesNamesAndScholarship = new Dictionary<string, float>();
            DateTime today = DateTime.Today;
            List<string> monthAndYear = new List<string>();
            List<string> month = new List<string>();
            for (int i = num; i >= 1; i--)
            {
                monthAndYear.Add(today.AddMonths(-i).ToString("MMM", ci) + "" + today.AddMonths(-i).ToString("yyy", ci));
                monthesNamesAndScholarship.Add(today.AddMonths(-i).ToString("MMM", ci), 0);
            }
            List<DAL.Scholarships> scholarships = ProtectedDataMembers.db.Scholarships.Where(x => monthAndYear.Contains(x.HebrewMonth + "" + x.HebrewYear)).ToList();
            string hebrewMonth;

            foreach (var item in scholarships)
            {
                //hebrewMonth = item.Date.ToString("MMM", ci);
                monthesNamesAndScholarship[item.HebrewMonth] += item.Scholarship;
            }

            monthesNamesAndScholarship = AvgOfDictionaryValues(monthesNamesAndScholarship);
            return monthesNamesAndScholarship;
        }

        //<summary> return scholarship sum for specific user in the x month ago (sum per month) 
        public static Dictionary<string, int> GetScholarshipForUserInXMonthAgo(string id, int num)
        {
            Dictionary<string, int> monthesNamesAndScholarship = new Dictionary<string, int>();
            DateTime today = DateTime.Today;
            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();
            for (var i = 1; i <= num; i++)
                monthesNamesAndScholarship.Add(DateTime.Today.AddMonths(-i).ToString("MMM", ci), 0);
            monthesNamesAndScholarship.Reverse();
            DateTime XMonthAgo = DateTime.Today.AddMonths(-(num + 1));
            List<DAL.Scholarships> scholarships = ProtectedDataMembers.db.Scholarships.Where(x => x.Identity == id && x.Confirm && monthesNamesAndScholarship.Keys.Contains(x.HebrewMonth) && XMonthAgo < x.Date).ToList();
            foreach (var item in scholarships)
            {
                monthesNamesAndScholarship[item.HebrewMonth] += item.Scholarship;
            }
            return monthesNamesAndScholarship;

        }

        //<summary> return avg of shmiratSdarim number for all the users in the x month ago (avg per month) 
        public static Dictionary<string, float> GetShmiratSdarimForAllUsersInXMonthAgo(int num)
        {
            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();

            Dictionary<string, float> monthesNamesAndSmiratSdarim = new Dictionary<string, float>();
            DateTime today = DateTime.Today;
            //if (today.Day > 28)
            //    today = today.AddDays(-3);
            monthesNamesAndSmiratSdarim.Clear();
            List<string> month = new List<string>();
            DateTime endOfMonth;
            DateTime prevMonth = today;
            for (int i = 0; i < num; i++)
            {
                endOfMonth = new DateTime(prevMonth.Year,
                                   prevMonth.Month,
                                   DateTime.DaysInMonth(prevMonth.Year,
                                                        prevMonth.Month));
                prevMonth = prevMonth.AddDays(-(endOfMonth.Day) + 1);
                month.Add(prevMonth.Month + "" + prevMonth.Year);
                monthesNamesAndSmiratSdarim.Add(prevMonth.ToString("MMM", ci), 0);
            }
            List<DAL.Scholarships> scholarships = ProtectedDataMembers.db.Scholarships.Where(x => month.Contains(x.Date.Month + "" + x.Date.Year)).ToList();
            string hebrewMonth;

            foreach (var item in scholarships)
            {
                hebrewMonth = item.Date.ToString("MMM", ci);
                monthesNamesAndSmiratSdarim[hebrewMonth] += item.ShmiratSdarim;
            }

            monthesNamesAndSmiratSdarim = AvgOfDictionaryValues(monthesNamesAndSmiratSdarim);
            return monthesNamesAndSmiratSdarim;
        }

        //<summary> return shmiratSdarim number for user in the x month ago (number per month) 
        public static Dictionary<string, int> GetShmiratSdarimForUserInXMonthAgo(string id, int num)
        {
            Dictionary<string, int> monthesNamesAndSmiratSdarim = new Dictionary<string, int>();
            DateTime today = DateTime.Today;
            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();
            DateTime endOfMonth;
            DateTime prevMonth = today;
            for (int i = 0; i < num; i++)
            {
                endOfMonth = new DateTime(prevMonth.Year,
                                   prevMonth.Month,
                                   DateTime.DaysInMonth(prevMonth.Year,
                                                        prevMonth.Month));
                prevMonth = prevMonth.AddDays(-(endOfMonth.Day) + 1);
                monthesNamesAndSmiratSdarim.Add(prevMonth.ToString("MMM", ci), 0);
            }
            monthesNamesAndSmiratSdarim.Reverse();
            DateTime XMonthAgo = today.AddMonths(-(num + 1));
            List<DAL.Scholarships> scholarships = ProtectedDataMembers.db.Scholarships.Where(x => x.Identity == id && x.Confirm && monthesNamesAndSmiratSdarim.Keys.Contains(x.HebrewMonth) && XMonthAgo < x.Date).ToList();
            foreach (var item in scholarships)
            {
                monthesNamesAndSmiratSdarim[item.HebrewMonth] += item.ShmiratSdarim;
            }
            return monthesNamesAndSmiratSdarim;

        }

        //<summary> return avg of marks of all the users in the x month ago (avg per month) 
        public static Dictionary<string, int> GetMarksForUserInXMonthAgo(string id, int num)
        {
            Dictionary<string, int> monthesNamesAndMarks = new Dictionary<string, int>();
            DateTime today = DateTime.Today;
            if (today.Day > 28)
                today = today.AddDays(-3);
            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();
            for (var i = num; i > 0; i--)
                monthesNamesAndMarks.Add(DateTime.Today.AddMonths(-i).ToString("MMM", ci), 0);

            //monthesNamesAndMarks.Reverse();
            DateTime XMonthAgo = DateTime.Today.AddMonths(-(num + 1));
            List<DAL.Scholarships> scholarships = ProtectedDataMembers.db.Scholarships.Where(x => x.Identity == id && x.Confirm && monthesNamesAndMarks.Keys.Contains(x.HebrewMonth) && XMonthAgo < x.Date).ToList();
            foreach (var item in scholarships)
            {
                monthesNamesAndMarks[item.HebrewMonth] += (int)item.Mark;
            }
            return monthesNamesAndMarks;

        }

        //<summary> inner function that calculate avg and return the result in dictionry 
        private static Dictionary<string, float> AvgOfDictionaryValues(Dictionary<string, float> dictionary)
        {
            int numOfUsers = ProtectedDataMembers.db.Users.Count();
            if (numOfUsers != 0)
            {
                var keys = new List<string>(dictionary.Keys);
                foreach (var key in keys)
                {
                    dictionary[key] /= numOfUsers;
                }
            }
            return dictionary;
        }

        //<summary> search users that their personal detailes is like the data
        public static List<DAL.Users> SearchForSpesificUesrs_dataAboutUsers(string data)
        {
            if (data.Length < 2)
                return new List<DAL.Users>();
            List<DAL.Users> selectedUsers = ProtectedDataMembers.db.Users.ToList();
            Dictionary<string, object> searchData = new Dictionary<string, object>();
            var dict = data.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            if (dict.Length < 2)
                return new List<DAL.Users>();
            for (int i = 0; i < dict.Length; i += 2)
            {
                searchData.Add(dict[i].Trim(new Char[] { '"', '[', '\\', ']' }), dict[i + 1].Trim(new Char[] { '"', '[', '\\', ']' }));
                selectedUsers = GetUsersList_switch(selectedUsers, searchData.Keys.Last(), searchData.Values.Last());
                if (selectedUsers.Count() == 0)
                    return null;
            }
            return selectedUsers;
        }

        //<summary> inner function that search the data
        private static List<DAL.Users> GetUsersList_switch(List<DAL.Users> selectedUsers,
                                                            string nameOfParamForSearch, object paramForSearch)
        {
            switch (nameOfParamForSearch)
            {
                case "minimumAge":
                    selectedUsers = selectedUsers.Where(man => DateTime.Today.Year - man.BirthDate_gregorian.Year >= Convert.ToInt32(paramForSearch)).ToList();
                    break;
                case "maximumAge":
                    selectedUsers = selectedUsers.Where(man => DateTime.Today.Year - man.BirthDate_gregorian.Year <= Convert.ToInt32(paramForSearch)).ToList();
                    break;
                case "maximumChildren":
                    selectedUsers = selectedUsers.Where(man => man.Children <= Convert.ToInt32(paramForSearch)).ToList();
                    break;
                case "minimumChildren":
                    selectedUsers = selectedUsers.Where(man => man.Children >= Convert.ToInt32(paramForSearch)).ToList();
                    break;
                case "userCity":
                    selectedUsers = selectedUsers.Where(man => man.City1.CityName.ToString() == paramForSearch.ToString()).ToList();
                    break;
                //case "noLearnMusar":
                //    selectedUsers = selectedUsers.Where(man => man.LearnMusar == false).ToList();
                //    break;
                //case "learnMusar":
                //    selectedUsers = selectedUsers.Where(man => man.LearnMusar == true).ToList();
                //    break;
                case "learnFullDay":
                    selectedUsers = selectedUsers.Where(man => man.FullDay == true).ToList();
                    break;
                case "learnHalfDay":
                    selectedUsers = selectedUsers.Where(man => man.FullDay == false).ToList();
                    break;
                case "isManager":
                    selectedUsers = selectedUsers.Where(man => man.IsManager == true).ToList();
                    break;
            }
            return selectedUsers.OrderBy(man => man.LastName).ThenBy(man => man.FirstName).ToList();
        }

        //<summary> search users that their scholarship detailes is like the data
        public static List<DAL.Scholarships> SearchForSpesificUesrs_dataAboutScholarship(string data)
        {
            if (data.Length < 2)
                return new List<DAL.Scholarships>();
            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();
            string lastMonth = DateTime.Today.AddMonths(-1).ToString("MMM", ci);

            List<DAL.Scholarships> selectedScholarship = ProtectedDataMembers.db.Scholarships.Where(schlr => schlr.HebrewMonth == lastMonth).ToList();
            Dictionary<string, object> searchData = new Dictionary<string, object>();
            var dict = data.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            if (dict.Length < 2)
                return new List<DAL.Scholarships>();
            for (int i = 0; i < dict.Length; i += 2)
            {
                searchData.Add(dict[i].Trim(new Char[] { '"', '[', '\\', ']' }), dict[i + 1].Trim(new Char[] { '"', '[', '\\', ']' }));
                selectedScholarship = GetScholarshipList_switch(selectedScholarship, searchData.Keys.Last(), searchData.Values.Last());
                if (selectedScholarship.Count() == 0)
                    return new List<DAL.Scholarships>();
            }

            return selectedScholarship.OrderBy(schlrshp => schlrshp.Users.LastName).ThenBy(schlrshp => schlrshp.Users.FirstName).ThenBy(schlrshp => schlrshp.Date).ToList();
        }
        //<summary> inner function that search the data
        private static List<DAL.Scholarships> GetScholarshipList_switch(List<DAL.Scholarships> selectedScholarship,
                                                                        string nameOfParamForSearch, object paramForSearch)
        {
            try
            {
                switch (nameOfParamForSearch)
                {
                    case "minimumMilga":
                        selectedScholarship = selectedScholarship.Where(schlr => schlr.Scholarship >= Convert.ToInt32(paramForSearch)).ToList();
                        break;
                    case "maximumMilga":
                        selectedScholarship = selectedScholarship.Where(schlr => schlr.Scholarship <= Convert.ToInt32(paramForSearch)).ToList();
                        break;
                    case "maximumAbsance":
                        selectedScholarship = selectedScholarship.Where(schlr => schlr.Absence <= Convert.ToInt32(paramForSearch)).ToList();
                        break;
                    case "minimumAbsance":
                        selectedScholarship = selectedScholarship.Where(schlr => schlr.Absence >= Convert.ToInt32(paramForSearch)).ToList();
                        break;
                    case "maximumAtmada":
                        selectedScholarship = selectedScholarship.Where(schlr => schlr.Atmada <= Convert.ToInt32(paramForSearch)).ToList();
                        break;
                    case "minimumAtmada":
                        selectedScholarship = selectedScholarship.Where(schlr => schlr.Atmada >= Convert.ToInt32(paramForSearch)).ToList();
                        break;
                }
                return selectedScholarship;
            }
            catch (Exception ex)
            {
                return new List<Scholarships>();
            }
        }

        //<summary> search users that their loans detailes is like the data
        public static List<DAL.Scholarships> SearchForSpesificUesrs_dataAboutLoans(string data)
        {
            if (data.Length < 2)
                return new List<DAL.Scholarships>();
            List<DAL.Scholarships> selectedLoan = new List<DAL.Scholarships>();
            selectedLoan = ProtectedDataMembers.db.Scholarships.Where(schlr => schlr.RemainderDebt > 0).ToList();
            Dictionary<string, object> searchData = new Dictionary<string, object>();
            var dict = data.Split(new[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            if (dict.Length < 2)
                return null;
            for (int i = 0; i < dict.Length; i += 2)
            {
                searchData.Add(dict[i].Trim(new Char[] { '"', '[', '\\', ']' }), dict[i + 1].Trim(new Char[] { '"', '[', '\\', ']' }));
                selectedLoan = GetLoansList_switch(selectedLoan, searchData.Keys.Last(), searchData.Values.Last());
                if (selectedLoan.Count() == 0)
                    return null;
            }
            return selectedLoan.OrderBy(loan => loan.Users.LastName).ThenBy(loan => loan.Users.FirstName).ToList();
        }

        //<summary> inner function that search the data
        private static List<DAL.Scholarships> GetLoansList_switch(List<DAL.Scholarships> selectedLoans, string nameOfParamForSearch,
                                                                                                  object paramForSearch)
        {
            switch (nameOfParamForSearch)
            {
                case "lastDateLoan":
                    selectedLoans = selectedLoans.Where(scholarship => scholarship.Date <= Convert.ToDateTime(paramForSearch)).ToList();
                    break;
                case "firstDateLoan":
                    selectedLoans = selectedLoans.Where(scholarship => scholarship.Date >= Convert.ToDateTime(paramForSearch)).ToList();
                    break;
                case "minSumLoan":
                    selectedLoans = selectedLoans.Where(scholarship => scholarship.RemainderDebt >= Convert.ToInt32(paramForSearch)).ToList();
                    break;
                case "maxSumLoan":
                    selectedLoans = selectedLoans.Where(scholarship => scholarship.RemainderDebt <= Convert.ToInt32(paramForSearch)).ToList();
                    break;
            }
            return selectedLoans;
        }
    }
}
