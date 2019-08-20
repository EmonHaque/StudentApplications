using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudentAppRecovered.Helper;

namespace StudentAppRecovered.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            //StudentCV r = WhoIsWhereLists.GetStudentCV(1);
            //var x = Lists4CV.Education;
            //var y = WhoIsWhereLists.Students4WhoIsWhere;
            //var z = SiteUser.Users;

            return View();
        }
    }
}