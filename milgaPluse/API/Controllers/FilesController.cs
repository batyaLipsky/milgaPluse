using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace API.Controllers
{
    public class FilesController : ApiController
    {
        //<summary> the function save files in folder that in the solution.
        [HttpPost]
        public string SaveFiles()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var filePath = HttpContext.Current.Server.MapPath("~/UploadFiles/" + postedFile.FileName);
                    postedFile.SaveAs(filePath);
                }
            }
            return "";
        }

        //<summary> the function return all the files' names that saved in the solution
        [HttpGet]
        public string[] GetAllFilesNames()
        {
            string[] fileArray = Directory.GetFiles(@"E:\\milgaPluse\\milgaPluse\\API\\UploadFiles\\", "*.*", SearchOption.AllDirectories);
            for (int i = 0; i < fileArray.Length; i++)
            {
                var split = fileArray[i].Split('\\');
                fileArray[i] = split[split.Length - 1];
            }
            return fileArray;
        }

        //<summary> download a file to the pc.
        [HttpGet]
        public HttpResponseMessage DownLoadFile(string fileName)
        {
            using (var webClient = new System.Net.WebClient())
            {
                byte[] data = webClient.DownloadData(@"E:\\milgaPluse\\milgaPluse\\API\\UploadFiles\\" + fileName);
                var ms = new System.IO.MemoryStream(data);

                var result = new HttpResponseMessage(HttpStatusCode.OK)
                {
                    Content = new ByteArrayContent(ms.ToArray())
                };
                result.Content.Headers.ContentDisposition =
                    new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                    {
                        FileName = "test.exe"
                    };
                result.Content.Headers.ContentType =
                    new MediaTypeHeaderValue("application/octet-stream");

                return result;
            }
        }

        //<summary> delete file from the files' folder.
        [HttpGet]
        public bool DeletFile(string fileName)
        {
            if ((System.IO.File.Exists(@"E:\\milgaPluse\\milgaPluse\\API\\UploadFiles\\" + fileName)))
            {
                try
                {
                    File.Delete(@"E:\\milgaPluse\\milgaPluse\\API\\UploadFiles\\" + fileName);
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    return false;
                }

            }
            return false;

        }
    }
}
