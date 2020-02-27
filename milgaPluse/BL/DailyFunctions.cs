using DAL;
using EASendMail;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public static class DailyFunctions
    {
        //<sumery> function that implemented every day (once a day)
        public static void DailyFunction()
        {
            //<sumery> every day call to function that chack if has
            //         birthday to one of the users.
            SendEmailAboutBirthdayEveryDay();
            //<sumery> every day call to function that chack if the 
            //         users can apply data for new scholaship.
            ProtectedDataMembers.WhenOpenNewScholarship();

            //<sumery> return to this function tomarrow
            Task.Delay(TimeSpan.FromDays(1));
        }

        //<sumery> function that called by DailyFunction.
        //<sumery> the function chack if one of the users has birthday today.
        private static void SendEmailAboutBirthdayEveryDay()
        {

            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();
            string hebrewDateToday = DateTime.Today.ToString("d MMM, yyyy", ci);
            string[] t = hebrewDateToday.Split(',');
            hebrewDateToday = t[0];
            List<Users> hasBirthdayToday = ProtectedDataMembers.db.Users.Where(x => x.BirthDate_hebrew.Contains(hebrewDateToday)).ToList();
            if (hasBirthdayToday.Count() > 0)
                Sendemail(hasBirthdayToday);
        }

        //<sumery> function that called by SendEmailAboutBirthdayEveryDay
        //         if found user that has birthday today
        private static void Sendemail(List<Users> hasBirthdaytoday)
        {
            string engeenerEmail = "milgaplus@gmail.com";
            string engeenerPassword = "milgaplus!+2";
            string adminEmail = ProtectedDataMembers.db.Users.Where(x => x.IsManager == true).FirstOrDefault().Email;

            if (adminEmail != null)
            {
                SmtpMail omail = new SmtpMail("TryIt");
                SmtpClient osmtp = new SmtpClient();
                // set sender email address, please change it to yours
                omail.From = engeenerEmail;
                // set recipient email address, please change it to yours
                omail.To.Add(adminEmail);
                // set email subject
                omail.Subject = "בעז\"ה יהיה היום יום הולדת לאברך מהכולל";
                // set email body
                foreach (var user in hasBirthdaytoday)
                {
                    var age = DateTime.Today.Year - user.BirthDate_gregorian.Year;
                    omail.TextBody += "הרב " + user.FirstName + " " + user.LastName + " יהיה בן " + age + ". ";
                }
                SmtpServer oserver = new SmtpServer("smtp.gmail.com");
                oserver.User = engeenerEmail;
                oserver.Password = engeenerPassword;
                oserver.Port = 465;
                oserver.ConnectType = SmtpConnectType.ConnectSSLAuto;

                try
                {
                    Console.WriteLine("start to send email ...");
                    osmtp.SendMail(oserver, omail);
                    Console.WriteLine("email was sent successfully!");
                }
                catch (Exception ep)
                {
                    Console.WriteLine("failed to send email with the following error:");
                    Console.WriteLine(ep.Message);
                }

            }


        }
    }
}
