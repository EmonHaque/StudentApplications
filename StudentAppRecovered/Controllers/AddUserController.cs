using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudentAppRecovered.Helper;
using System.Text.RegularExpressions;

namespace StudentAppRecovered.Controllers
{
    public class AddUserController : Controller
    {
        public ActionResult Index()
        {
            TempData["Unused"] = WhoIsWhereLists.Students4WhoIsWhere.Where(x=>x.SiteUser == 0);
            TempData["UsersTobeAdded"] = SiteUser.GetUsers();
            return View();
        }

        public JsonResult UserAdd(AddUser usertoadd)
        {
            string msg = string.Empty;
            if (!Regex.IsMatch(usertoadd.UserName, "^[0-9A-Za-z_]+$"))
            {
                msg = "Invalid character";
                return Json(msg, JsonRequestBehavior.AllowGet);
            }
            else
            {
                if (!Regex.IsMatch(usertoadd.Password, "^[0-9A-Za-z_]+$"))
                {
                    msg = "Invalid character";
                    return Json(msg, JsonRequestBehavior.AllowGet);
                }
            }
            var user = SiteUser.Users.Where(x => x.UserName == usertoadd.UserName).Count();
            if (user == 0)
            {
                Users newUser = new Users();
                newUser.Id = usertoadd.Id;
                newUser.UserName = usertoadd.UserName;
                newUser.Password = usertoadd.Password;
                newUser.Role = usertoadd.Role;
                newUser.Retry = 0;
                newUser.Status = string.Empty;

                SiteUser.AddUser(newUser);
                //SiteUser.AddUser(newUser.UserName, newUser.Password, newUser.Role);
                msg = "Added";
                return Json(msg, JsonRequestBehavior.AllowGet);
            }
            else
            {
                msg = "in use";
                return Json(msg, JsonRequestBehavior.AllowGet);
            }
        }
    }
}