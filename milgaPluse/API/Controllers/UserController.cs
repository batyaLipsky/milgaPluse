using System.Data;
using System.Linq;
using System.Web.Http;
using DAL;

using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class UserController : ApiController
    {
        [HttpGet]
        public DAL.Users Login(string id, string userName)
        {
            return BL.User.Login(id, userName);
        }

        [HttpGet]
        public List<DAL.Users> GetAllUsers()
        {
            return BL.User.GetAllUsers();
        }

        [HttpGet]
        public List<DAL.Users> GetAllUsersFromHistory()
        {
            return BL.User.GetAllUsersFromHistory();
        }
        [HttpGet]
        public List<DAL.City> GetListOfUsersCities()
        {
            return BL.User.GetListOfUsersCities();
        }

        [HttpGet]
        public List<DAL.City> GetListAllCities()
        {
            return BL.User.GetListAllCities();
        }

        [HttpPost]
        public string saveUserDetailes(DAL.Users newUser)
        {
            return BL.User.SaveUserDetailes(newUser);
        }

        [HttpGet]
        public City AddNewCity(string cityName)
        {
            return BL.User.AddNewCity(cityName);
        }

        [HttpGet]
        public string[] ConvertGregoriandateToHebrewDate(string date)
        {
            DateTime ddate = Convert.ToDateTime(date);
            return BL.User.ConvertGregoriandateToHebrewDate(ddate);
        }

        [HttpGet]
        public string ContraryUserToDisable(string userIdentity)
        {
            return BL.User.DeleteUser(userIdentity);
        }

        [HttpGet]
        public DAL.Users GetUserById(string id)
        {
            return BL.User.GetUserById(id);
        }

        [HttpGet]
        public List<DAL.Users> GetListOfUsersById(string usersIdentities)
        {
            return BL.User.GetListOfUsersById(usersIdentities);
        }

        [HttpGet]
        public int SaveWayToOpenManager(int num)
        {
            return BL.User.SaveWayToOpenManager(num);
        }

        [HttpGet]
        public int ReturnWayToOpenManager()
        {
            return BL.User.ReturnWayToOpenManager();
        }




        [HttpGet]
        public Dictionary<string, string> ConvertListOfGeorgianDatesToHebrewDates(string usersIdentity)
        {
            return BL.User.ConvertListOfGeorgianDatesToHebrewDates(usersIdentity);
        }
    }
    public interface IFormFile
    {
    }
}