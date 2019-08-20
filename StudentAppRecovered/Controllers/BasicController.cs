using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudentAppRecovered.Helper;

namespace StudentAppRecovered.Controllers
{
    public class BasicController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return PartialView();
        }

        public ActionResult Reference()
        {
            return PartialView();
        }

        public ActionResult MoreReference(StudentId stud)
        {
            TempData["Id"] = stud;
            return PartialView();
        }
    }
}