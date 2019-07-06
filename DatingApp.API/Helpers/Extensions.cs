using Microsoft.AspNetCore.Http;
using System;
namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error",message);
            response.Headers.Add("Access-control-Expose-Headers","Application-Error");
            response.Headers.Add("Access-control-Allow-Origin", "*");
        }

        public static int CalculateAge(this DateTime theDateTime)
        {
            var age =  DateTime.Now.Year - theDateTime.Year ;

            if(DateTime.Now.AddYears(age) > DateTime.Now)
                age--;

            return age; 
            

        }
    }
}