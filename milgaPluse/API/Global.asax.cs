
// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Global.asax.cs" company="Centrica Plc">
//   Copyright (c) 2009-2013 Centrica Plc. All rights reserved. This computer program is the property of Centrica Plc of Windsor, Berkshire, England
// </copyright>
// <summary>
//   Defines the WebApiApplication type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Web;
using System.Web.Http;
using System.Data.Entity;
using System.Web.Routing;

//[assembly: CLSCompliant(true)]

namespace API
{
    public class WebApiApplication : HttpApplication
    {
        protected void Application_Start()
        {



            GlobalConfiguration.Configure(API.WebApiConfig.Register);
            BL.DailyFunctions.DailyFunction();
        }
        protected void Application_BeginRequest(object sender, EventArgs e)


        {


            if (Context.Request.Path.Contains("api/") && Context.Request.HttpMethod == "OPTIONS")

            {

                Context.Response.AddHeader("Access-Control-Allow-Origin", "*");

                Context.Response.AddHeader("Access-Control-Allow-Headers", "*");

                Context.Response.AddHeader("Access-Control-Allow-Methods", "*");

                Context.Response.AddHeader("Access-Control-Allow-Credentials", "true");

                Context.Response.End();

            }
            if (Context.Request.Path.Contains("api/") && Context.Request.HttpMethod == "POST")
            {
                Context.Response.AddHeader("Access-Control-Allow-Origin", "http://localhost:4200");
            }
            if (Context.Request.Path.Contains("api/") && Context.Request.HttpMethod == "GET")
            {
               Context.Response.AddHeader("Access-Control-Allow-Origin", "*");//, "http://localhost:4200");
            }
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings
    .ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
           GlobalConfiguration.Configuration.Formatters
               .Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);

        }

        //public void Application_BeginRequest(object sender, EventArgs e)
        //{
        //    string httpOrigin = Request.Params["HTTP_ORIGIN"];
        //    if (httpOrigin == null) httpOrigin = "*";
        //    HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", httpOrigin);
        //    HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        //    HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Token, Authorization");
        //    HttpContext.Current.Response.AddHeader("Access-Control-Allow-Credentials", "true");

        //    if (Request.HttpMethod == "OPTIONS")
        //    {
        //        HttpContext.Current.Response.StatusCode = 200;
        //        var httpApplication = sender as HttpApplication;
        //        httpApplication.CompleteRequest();
        //    }
        //}


    }
}


