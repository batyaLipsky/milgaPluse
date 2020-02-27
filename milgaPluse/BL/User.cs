//System.Data.Linq;

using System;
using DAL;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity.Migrations;
using System.Globalization;
using System.Data.Entity;

//using System.Data.Objects;
//using Microsoft.EntityFrameworkCore;
//using System.Linq;

//using System.Data.Entity.Migrations;
namespace BL
{
    public static class User
    {
        //<sumery> function that idenfy the user by userName and id
        public static DAL.Users Login(string id, string userName)
        {
            CurrentUserIsAdmin.IsAdmin = false;
            //try
            //{
            DAL.Users user = ProtectedDataMembers.db.Users.Find(id);
            if (user != null && user.UserName == userName)
            {
                if (user != null && user.IsManager == true)
                    CurrentUserIsAdmin.IsAdmin = true;
            }
            else
                return null;
            return user;
        }

        //<sumery> return all the cities list of the users 
        public static List<DAL.Users> GetAllUsers()
        {
            try
            {
                var u = from users in ProtectedDataMembers.db.Users
                        where users.LearnNowadays == true
                        orderby users.LastName
                        select users;
                return u.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("GetListOfUsers err: " + ex);
                return null;
            }
        }

        //<sumery> return all the users that learn in the "kollel"
        //         in the past, but not nowaday.
        public static List<DAL.Users> GetAllUsersFromHistory()
        {
            try
            {
                var u = from users in ProtectedDataMembers.db.Users
                        where users.LearnNowadays == false
                        orderby users.LastName, users.FirstName, users.Identity
                        select users;
                return u.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("GetListOfUsers err: " + ex);
                return null;
            }
        }

        //<sumery> return list of all the cities that the users lives there
        public static List<City> GetListOfUsersCities()
        {
            try
            {
                var CitiesName = from cityName in ProtectedDataMembers.db.City
                                 join users in ProtectedDataMembers.db.Users
                                 on cityName.Id equals users.City
                                 select cityName;
                return CitiesName.Distinct().ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("GetListOfCities err: " + ex);
                return null;
            }
        }

        //<sumery> return all the cities 
        public static List<City> GetListAllCities()
        {
            try
            {
                var Cities = from city in ProtectedDataMembers.db.City
                             orderby city.CityName
                             select city;
                return Cities.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("GetListOfCities err: " + ex);
                return null;
            }
        }

        //<sumery> save user detailes and return success or error
        public static string SaveUserDetailes(DAL.Users newUser)
        {
            Users isUserExist = new Users();
            try
            {
                isUserExist = ProtectedDataMembers.db.Users.Find(newUser.Identity);
                if (isUserExist == null)
                {
                    if (newUser.UserName == null)
                        newUser.UserName = newUser.Identity;
                    ProtectedDataMembers.db.Users.Add(newUser);
                    ProtectedDataMembers.db.SaveChanges();
                }
                else
                    if (newUser.Identity == isUserExist.Identity)// != isUserExist)
                {
                    if (newUser.UserName == null)
                        newUser.UserName = isUserExist.UserName;
                    newUser.LearnNowadays = true;
                    ProtectedDataMembers.db.Users.AddOrUpdate(newUser);
                    ProtectedDataMembers.db.SaveChanges();
                }
                else
                    return "the user exist";

            }
            catch (Exception ex)
            {

                ProtectedDataMembers.db.Users.Remove(isUserExist);
                return ex.ToString();
                return "err";
            }
            return "succeed";
        }

        //<sumery> save new city in th db
        public static City AddNewCity(string cityName)
        {
            try
            {
                City findThisCity = ProtectedDataMembers.db.City.Where(x => x.CityName == cityName).FirstOrDefault();
                if (findThisCity == null || findThisCity.Id == 0)
                {
                    ProtectedDataMembers.db.City.Add(new City { CityName = cityName });
                    ProtectedDataMembers.db.SaveChanges();
                    City newCity = ProtectedDataMembers.db.City.FirstOrDefault(x => x.CityName == cityName);
                    return newCity;
                }
                return new City();
            }
            catch (Exception ex)
            {

                return new City();
            }
        }

        //<sumery> convert the Gregorian date of the user birthdate to hebrew date
        public static string[] ConvertGregoriandateToHebrewDate(DateTime date)
        {
            if (date != null)
            {
                string[] hebrewDates = new string[2];
                var ci = CultureInfo.CreateSpecificCulture("he-IL");
                ci.DateTimeFormat.Calendar = new HebrewCalendar();
                hebrewDates[0] = date.ToString("d MMM, yyyy", ci);
                hebrewDates[1] = date.AddDays(1).ToString("d MMM, yyyy", ci);
                return hebrewDates;
            }
            return null;
        }

        //<sumery> delet user
        public static string DeleteUser(string userIdentity)
        {
            try
            {
                var user = ProtectedDataMembers.db.Users.Find(userIdentity);
                if (user != null)
                {
                    if (user.IsManager==true)
                    {
                        var otherManager = ProtectedDataMembers.db.Users.Where(usr => usr.IsManager == true&&usr.Identity!=user.Identity).FirstOrDefault();
                        if (otherManager == null)
                            return "אינך יכול להסיר מהמערכת את הרב"+user.LastName+" היות והוא ראש כולל יחיד.";//"you cant remove because there isn't any other managers";
                    }
                    user.LearnNowadays = false;
                    user.DateOfLeave = DateTime.Today;
                    ProtectedDataMembers.db.Users.AddOrUpdate(user);
                    ProtectedDataMembers.db.SaveChanges();
                    return "succeed";
                }
                return "שגיאה במשתמש או בנתונים";
            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch (Exception ex)
#pragma warning restore CS0168 // The variable 'ex' is declared but never used
            {
                return "fail";
            }
        }

        //<sumery> find user by identity
        public static DAL.Users GetUserById(string id)
        {
            DAL.Users user = new DAL.Users();
            try
            {
                user = ProtectedDataMembers.db.Users.Where(x => x.Identity == id).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                user = null;
            }
            return user;
        }

        //<sumery> find users by list of identities
        public static List<DAL.Users> GetListOfUsersById(string usersIdentities)
        {
            List<DAL.Users> selectedUsers = new List<DAL.Users>();
            if (usersIdentities != null)
            {
                selectedUsers = ProtectedDataMembers.db.Users.Where(user => usersIdentities.Contains(user.Identity)).OrderBy(user => user.LastName).ThenBy(user => user.FirstName).ToList();
                return selectedUsers;
            }
            else
                return new List<DAL.Users>();
        }

        public static Dictionary<string, string> ConvertListOfGeorgianDatesToHebrewDates(string usersIdentity)
        {
            var ci = CultureInfo.CreateSpecificCulture("he-IL");
            ci.DateTimeFormat.Calendar = new HebrewCalendar();
            string[] identitiesArray = usersIdentity.Split(',');
            DateTime[] dates = ProtectedDataMembers.db.Users.Where(x => identitiesArray.Contains(x.Identity)).OrderBy(x => x.LastName).ThenBy(x => x.FirstName).ThenBy(x => x.Identity).Select(x => (DateTime)x.DateOfLeave).ToArray();//(y => y == x.Identity) != null).ToArray();//.Select(x => x.LastName ).ToArray();
            Dictionary<string, string> idAndDate = new Dictionary<string, string>();
            for (var i = 0; i < identitiesArray.Length; i++)
            {
                idAndDate.Add(identitiesArray[i], dates[i].ToString("d MMM, yyyy", ci));
            }
            return idAndDate;
        }

        public static int SaveWayToOpenManager(int num)
        {
            if (CurrentUserIsAdmin.IsAdmin)
            {
                if (num == 3 || num == 5)
                {
                    CurrentUserIsAdmin.WayToOpenManager = num;
                    CurrentUserIsAdmin.DuringChangeWayToOpenManager = null;
                    return CurrentUserIsAdmin.WayToOpenManager;
                }
                else
                {
                    CurrentUserIsAdmin.DuringChangeWayToOpenManager = num;
                    return (int) CurrentUserIsAdmin.DuringChangeWayToOpenManager;
                }
            }
            return 0;
        }

        public static int ReturnWayToOpenManager()
        {
            if (CurrentUserIsAdmin.IsAdmin)
            {
                if (CurrentUserIsAdmin.DuringChangeWayToOpenManager < 3&&CurrentUserIsAdmin.DuringChangeWayToOpenManager!=null)
                {
                    int num = (int)CurrentUserIsAdmin.DuringChangeWayToOpenManager;
                    CurrentUserIsAdmin.DuringChangeWayToOpenManager = null;
                    return num;
                }
                return CurrentUserIsAdmin.WayToOpenManager;
            }
            return 0;
        }
    }

}




//public static string AddNewMilga(DAL.Scholarship scolarship)
//{
//    try
//    {
//        DAL.Scholarship isMilgaExist = ProtectedDataMembers.db.Scholarships.Find(scolarship.Identity, scolarship.HebrewMonth, scolarship.HebrewYear, scolarship.Date);
//        if (isMilgaExist == null)
//        {
//            scolarship.Date = DateTime.Today;
//            ProtectedDataMembers.db.Scholarships.Add(scolarship);
//            ProtectedDataMembers.db.SaveChanges();
//        }
//        else
//            if (scolarship != (DAL.Scholarship)isMilgaExist)
//        {
//            ProtectedDataMembers.db.Scholarships.AddOrUpdate(scolarship);
//            var a = ProtectedDataMembers.db.SaveChanges();
//        }
//        return "true";
//    }
//    catch (Exception ex)
//    {
//        ProtectedDataMembers.db.Scholarships.Remove(scolarship);
//        return ex.ToString();
//    }


//}

//public static List<DAL.Scholarship> GetAllScholarshipAccordingId(string identity)
//{
//    try
//    {
//        if (identity == null)
//            return ProtectedDataMembers.db.Scholarships.Where(sclr => sclr.Confirm).OrderBy(x => x.Identity).ThenBy(x => x.Date).ToList();
//        else
//            return ProtectedDataMembers.db.Scholarships.Where(x => x.Identity == identity).ToList();

//    }
//    catch (Exception ex)
//    {
//        //turn ex.ToString()
//        throw;
//    }
//}

