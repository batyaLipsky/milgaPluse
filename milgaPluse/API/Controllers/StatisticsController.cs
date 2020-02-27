using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class StatisticsController : ApiController
    {
        [HttpGet]
        public List<string> GetLastXMonthNames(int num)
        {
            return BL.Statistics.GetLastXMonthNames(num);
        }

        [HttpGet]
        public Dictionary<string, float> GetAtmadaForAllUsersInXMonthAgo(int num)
        {
            return BL.Statistics.GetAtmadaForAllUsersInXMonthAgo(num);
        }

        [HttpGet]
        public Dictionary<string, int> getAtmadaForUserInXMonthAgo(string id, int num)
        {
            return BL.Statistics.GetAtmadaForUserInXMonthAgo(id, num);
        }

        [HttpGet]
        public Dictionary<string, int> GetLoansForAllUsersInXMonthAgo(int num)
        {
            return BL.Statistics.GetLoansForAllUsersInXMonthAgo(num);
        }

        [HttpGet]
        public double AVGChildrenForUser()
        {
            return BL.Statistics.AVGChildrenForUser();
        }

        [HttpGet]
        public double AVGUsersAge()
        {
            return BL.Statistics.AVGUsersAge();
        }

        [HttpGet]
        public Dictionary<string, float> GetScholarshipForAllUsersInXMonthAgo(int num)
        {
            return BL.Statistics.GetScholarshipForAllUsersInXMonthAgo(num);
        }

        [HttpGet]
        public Dictionary<string, int> GetScholarshipForUserInXMonthAgo(string id, int num)
        {
            return BL.Statistics.GetScholarshipForUserInXMonthAgo(id, num);
        }

        [HttpGet]
        public Dictionary<string, float> GetShmiratSdarimForAllUsersInXMonthAgo(int num)
        {
            return BL.Statistics.GetShmiratSdarimForAllUsersInXMonthAgo(num);
        }

        [HttpGet]
        public Dictionary<string, int> GetShmiratSdarimForUserInXMonthAgo(string id, int num)
        {
            return BL.Statistics.GetShmiratSdarimForUserInXMonthAgo(id, num);
        }

        [HttpGet]
        public Dictionary<string, int> GetMarksForUserInXMonthAgo(string id, int num)
        {
            return BL.Statistics.GetMarksForUserInXMonthAgo(id, num);
        }

        [HttpGet]
        public List<DAL.Users> searchForSpesificUesrs_dataAboutUsers(string data)
        {
            return BL.Statistics.SearchForSpesificUesrs_dataAboutUsers(data);
        }

        [HttpGet]
        public List<DAL.Scholarships> searchForSpesificUesrs_dataAboutScholarship(string data)
        {
            return BL.Statistics.SearchForSpesificUesrs_dataAboutScholarship(data);
        }

        [HttpGet]
        public List<DAL.Scholarships> searchForSpesificUesrs_dataAboutLoans(string data)
        {
            return BL.Statistics.SearchForSpesificUesrs_dataAboutLoans(data);
        }
    }
}
