﻿using System.Web.Http;
using AstroGearsV2Api.Helpers;

namespace AstroGearsV2Api
{
    public static class WebApiConfig
    {
        ////public static void Register(HttpConfiguration config)
        ////{
        ////    // Web API configuration and services
        ////    // Configure Web API to use only bearer token authentication.
        ////    config.SuppressDefaultHostAuthentication();
        ////    config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

        ////    // Web API routes
        ////    config.MapHttpAttributeRoutes();

        ////    config.Routes.MapHttpRoute(
        ////        name: "DefaultApi",
        ////        routeTemplate: "api/{controller}/{id}",
        ////        defaults: new { id = RouteParameter.Optional }
        ////    );
        ////}

        public static void Register(HttpConfiguration config)
        {
            config.Formatters.Add(new BinaryMediaTypeFormatter());
        }
    }
}
