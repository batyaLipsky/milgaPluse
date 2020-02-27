using System;
using System.Collections.Generic;
using System.Web.Http;
using DAL;
using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Web;
using System.Net.Http;
using System.Net;
using System.Net.Http.Headers;

namespace API.Controllers
{
    public class ScholarshipsController : ApiController
    {

        [HttpGet]
        public List<DAL.Scholarships> GetAllScholarshipAccordingParams(string identity, string year, string month)
        {
            return BL.Scholarship.GetAllScholarshipAccordingParams(identity, year, month);
        }

        [HttpGet]
        public List<DAL.Scholarships> GetAllScholarshipAccordingParams(string identity, string month_or_year)
        {
            return BL.Scholarship.GetAllScholarshipAccordingParams(identity, month_or_year);
        }

        [HttpPost]
        public string SaveBasicDataScholarship(BL.ValueOfStaticScholarshipMembers getValue)
        {
            return BL.Scholarship.SaveBasicDataScholarship(getValue);
        }

        [HttpGet]
        public List<KeyValuePair<string, BL.ValueOfStaticScholarshipMembers>> GetOldDtaOfBasicDataForScholarship()
        {
            return BL.Scholarship.GetOldDtaOfBasicDataForScholarship();
        }

        [HttpGet]
        public BL.ValueOfStaticScholarshipMembers GetBasicScholarData()
        {
            //deserilize
            IFormatter formatter = new BinaryFormatter();
            Stream stream = new FileStream("E:/milgaPluse/milgaPluse/getValues", FileMode.Open, FileAccess.Read);
            try
            {
                BL.ValueOfStaticScholarshipMembers basicValues =
                    (BL.ValueOfStaticScholarshipMembers)formatter.Deserialize(stream);
                return basicValues;
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex);
                return new BL.ValueOfStaticScholarshipMembers();
            }
            finally
            {
                stream.Close();
            }
        }

        [HttpGet]
        public List<string> FindIfApplyNewScholarship(string identity)
        {
            return BL.Scholarship.FindIfApplyNewScholarship(identity);
        }

        [HttpPost]
        public Scholarships CalculateScholarship(DAL.Scholarships scholarship)
        {
            return BL.Scholarship.CalculateScholarship(scholarship);

        }

        [HttpPost]
        public string SaveConfirmScholarship(DAL.Scholarships scholarship)
        {
            return BL.Scholarship.SaveConfirmScholarship(scholarship);
        }

        [HttpGet]
        public List<DAL.Scholarships> GetScholarshipForConfirm()
        {
            return BL.Scholarship.GetScholarshipForConfirm();
        }

        [HttpGet]
        public Dictionary<string, string> GetNamesOfUsersOfScholarshipForConfirm(string usersIdentity)
        {

            return BL.Scholarship.GetNamesOfUsersOfScholarshipForConfirm(usersIdentity);
        }

        [HttpPost]
        public string AddNewScholarship(DAL.Scholarships scolarship)
        {
            return BL.Scholarship.AddNewScholarship(scolarship);
        }

        [HttpGet]
        public List<DAL.Scholarships> GetAllScholarshipAccordingId(string identity)
        {
            return BL.Scholarship.GetAllScholarshipAccordingId(identity);
        }
        [HttpGet]
        public Dictionary<string, DAL.Scholarships> GetTheLastScholarshipForAllUser()
        {
            return BL.Scholarship.GetTheLastScholarshipForAllUser();
        }
    }
}


//function that return the basic data that the scholarships calculates according to them.


//[HttpPost]
//public string SaveFiles()
//{
//    var httpRequest = HttpContext.Current.Request;
//    if (httpRequest.Files.Count > 0)
//    {
//        foreach (string file in httpRequest.Files)
//        {
//            var postedFile = httpRequest.Files[file];
//            var filePath = HttpContext.Current.Server.MapPath("~/UploadFiles/" + postedFile.FileName);
//            postedFile.SaveAs(filePath);
//        }
//    }
//    return "";
//}
