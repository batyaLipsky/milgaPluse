using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace class_connectProjectToNet
{
    public class Class1
    {
        void func()
        {
            var csb = new MySqlConnectionStringBuilder
            {
                Server = "35.195.189.95",
                UserID = "root",
                Password = "milgaRoot",
                Database = "mysql",
                CertificateFile = @"C:\Path\To\client.pfx",//creat such file
                CACertificateFile = @"C:\Users\משתמש\Downloads\server-ca.pem",//correct rout?
                //SslMode = MySqlSslMode.VerifyCA,
                SslMode = MySqlSslMode.None,
            };
            using (var connection = new MySqlConnection(csb.ConnectionString))
            {
                connection.Open();
            }
        }
    }
}
