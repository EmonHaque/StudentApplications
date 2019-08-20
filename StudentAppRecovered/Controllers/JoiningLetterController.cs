using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudentAppRecovered.Helper;

namespace StudentAppRecovered.Controllers
{
    public class JoiningLetterController : Controller
    {
        public ActionResult Index()
        {
            var userName = Session["User"].ToString();
            int userId = SiteUser.Users.Where(x => x.UserName == userName).Select(x => x.StudentId).First();
            TempData["Join"] = WhoIsWhereLists.HRSupervisor.Where(x => x.Id == userId).First();
            var count = Employee.JoiningLetters().Where(x => x.Id == userId).Count();
            if(count == 0)
            {
                return View();
            }
            else
            {
                return View("Wait");
            }
        }

        public JsonResult SubmitLetter(JoiningLetter letter)
        {
            letter.Date = DateTime.Now;
            DBOperation.InsertJoiningLetter(letter);
            return Json("Success", JsonRequestBehavior.AllowGet);
        }
    }
}