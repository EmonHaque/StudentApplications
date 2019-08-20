using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudentAppRecovered.Helper;

namespace StudentAppRecovered.Controllers
{
    public class ModifyUserController : Controller
    {
        public ActionResult Index()
        {
            TempData["Used"] = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.SiteUser == 1);           
            return View();
        }

        public JsonResult GetUserInfo(StudentId stud)
        {
            int studid = stud.id;
            TempData["Users"] = SiteUser.Users.Where(x=>x.StudentId == studid).First();
            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult ReturnUser()
        {
            return PartialView("UserInformation");
        }

        public JsonResult UpdateUser(UpdateUser user)
        {
            string msg = string.Empty;
            var checkuser = SiteUser.Users.Where(x => x.UserName == user.UserName).FirstOrDefault();
            if (checkuser.Role != user.Role || checkuser.Status != user.Status)
            {
                SiteUser.UpdateUser(user.UserName, user.Role, user.Status);
                msg = "Updated";
            }
            else
            {
                msg = "Not udatated";
            }

            return Json(msg, JsonRequestBehavior.AllowGet);
        }
    }
}