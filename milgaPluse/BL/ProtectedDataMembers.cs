using DAL;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BL
{
    internal static class ProtectedDataMembers
    {
        internal static MilgaPluseDBEntities db = new MilgaPluseDBEntities();

        internal static bool openNewScholarshipForFullDay { get; set; }
        internal static bool openNewScholarshipForHalfDay { get; set; }
        private static string nextMonth { get; set; }

        //function that run every day (from the IndependentFunctions.DailyFunction())
        //and check if today open new scholarship if it should open->this.OpenscholarshipInSpecificHour() 
        internal static void WhenOpenNewScholarship()
        {
            // get the next hebrew month name
            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();
            nextMonth = DateTime.Today.AddMonths(1).ToString("MMM", ci);

            //in this month the scholarship is calculate automatic according the privious scholarship.
            //so the new scholarship remain close
            if (nextMonth == "אלול" || nextMonth == "אייר" || nextMonth == "חשון")
            {
                openNewScholarshipForFullDay = false;                            
                openNewScholarshipForHalfDay = false;
                return;
            }
            //get the hebrew date of today and check if it could be optional date to open ne scholarship.
            var today = DateTime.Today.ToString("dd", ci);
            if (today == "כ\"ו" || today == "כ\"ז" || today == "כ\"ח" || today == "כ\"ט" || today == "ל'")
            {
                //the last learning date in Tishrei is "כ\"ט"
                if (nextMonth == "תשרי")
                {
                    if (DateTime.Today.AddDays(1).ToString("dd", ci) == "כ\"ט")
                    {
                        //function that open the scholarship in the morning for users who learn half a day,
                        //and in afternoon for users who learn fuul day.
                        OpenscholarshipInSpecificHour();
                        return;
                    }
                    //if "כ\"ט" is in Shabat, and today is Thursday
                    if (DateTime.Today.AddDays(2).ToString("dd", ci) == "כ\"ט" && DateTime.Today.ToString("ddd", ci) == "ה")
                    {
                        OpenscholarshipInSpecificHour();
                        return;
                    }
                    //if "כ\"ט" is in Sunday, and today is Thursday
                    if (DateTime.Today.AddDays(3).ToString("dd", ci) == "כ\"ט" && DateTime.Today.ToString("ddd", ci) == "ה")
                    {
                        OpenscholarshipInSpecificHour();
                        return;
                    }
                    //if next month is Tishrei And no one of the Above date is correct - new scholarship is close
                    openNewScholarshipForFullDay = false;
                    openNewScholarshipForHalfDay = false;
                }
                //any other month-if tomarrow is "א'"
                if (DateTime.Today.AddDays(1).ToString("dd", ci) == "א'")
                {
                    OpenscholarshipInSpecificHour();
                    return;
                }
                //if "א'" is in Shabat, and today is Thursday
                if (DateTime.Today.AddDays(2).ToString("dd", ci) == "א'" && DateTime.Today.ToString("ddd", ci) == "ה")
                {
                    OpenscholarshipInSpecificHour();
                    return;
                }
                //if "א'" is in Sunday, and today is Thursday
                if (DateTime.Today.AddDays(3).ToString("dd", ci) == "א'" && DateTime.Today.ToString("ddd", ci) == "ה")
                {
                    OpenscholarshipInSpecificHour();
                    return;
                }
                openNewScholarshipForFullDay = false;
                openNewScholarshipForHalfDay = false;
            }
            else
            {
                openNewScholarshipForFullDay = false;
                openNewScholarshipForHalfDay = false;
                return;
            }
            
        }

        private static Timer timer_fullDay;
        private static Timer timer_halfDay;

        //<summary> begin timer in order to open scholarship in the correct hour.
        private static void OpenscholarshipInSpecificHour()
        {
            TimeSpan halfDay = new TimeSpan(9, 00, 00);
            TimeSpan fullDay = new TimeSpan(16, 00, 00);

            DateTime current = DateTime.Now;
            TimeSpan timeToGo_halfDay = halfDay - current.TimeOfDay;
            TimeSpan timeToGo_fullDay = fullDay - current.TimeOfDay;

            if (timeToGo_halfDay < TimeSpan.Zero && timeToGo_fullDay < TimeSpan.Zero)
            {
                return;          //time already passed
            }
            if (timeToGo_fullDay >= TimeSpan.Zero)
                timer_fullDay = new Timer(x =>
                {
                    FunctionRunsAtAfternoon();
                }, null, timeToGo_fullDay, Timeout.InfiniteTimeSpan);
            // if(timeToGo_halfDay>0)
            if (timeToGo_halfDay>=  TimeSpan.Zero)
                timer_halfDay = new Timer(x =>
                  {
                      FunctionRunsInMorning();
                  }, null, timeToGo_halfDay, Timeout.InfiniteTimeSpan);

        }

        //<summary> open the scholarship in afternoon
        private static void FunctionRunsAtAfternoon()
        {
            openNewScholarshipForFullDay = true;
        }

        //<summary> open the scholarship in morning
        private static void FunctionRunsInMorning()
        {
            openNewScholarshipForHalfDay = true;
        }
    }
}
