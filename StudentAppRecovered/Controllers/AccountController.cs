using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using StudentAppRecovered.Helper;
using System.Text.RegularExpressions;

namespace StudentAppRecovered.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Login()
        {
            return View();
        }

        public JsonResult Authenticate(Authenticate user)
        {
            string pattern = "^[0-9a-zA-Z_]+$";
            string msg = string.Empty;
            if (!Regex.IsMatch(user.UserName, pattern))
            {
                msg = "Invalid";
                if (!Regex.IsMatch(user.Password, pattern))
                {
                    msg = "Invalid";
                }
            }

            var libusers = SiteUser.Users;
            int count = libusers.Where(x => x.UserName == user.UserName &&
                                                   x.Password == user.Password &&
                                                   x.Status != "locked").Count();
            if (count > 0)
            {
                var role = libusers.Where(x => x.UserName == user.UserName).First().Role;
                if(role == "Administrator") { msg = "Administrator"; }
                else if(role == "Student") { msg = "Student"; }
                else if (role == "Manager") { msg = "Manager"; }
                else if (role == "Joining") { msg = "Joining"; }
                else if (role == "Partner") { msg = "Partner"; }
                FormsAuthentication.SetAuthCookie(user.UserName, false);
                Session["User"] = user.UserName;
            }

            else
            {
                if (libusers.Select(x => x.UserName).Contains(user.UserName))
                {
                    var status = libusers.Where(x => x.UserName == user.UserName).FirstOrDefault().Status;
                    if (status == "locked")
                    {
                        msg = "locked";
                    }
                    else
                    {
                        var tries = libusers.Where(x => x.UserName == user.UserName).FirstOrDefault().Retry;
                        if (tries > 2)
                        {
                            SiteUser.LockUser(user.UserName);
                            libusers.Where(x => x.UserName == user.UserName).FirstOrDefault().Status = "locked";
                            msg = "locked";
                        }
                        else
                        {
                            tries += 1;
                            libusers.Where(x => x.UserName == user.UserName).FirstOrDefault().Retry = tries;
                            msg = "Invalid";
                        }
                    }
                }
                else
                {
                    msg = "Invalid";
                }
            }
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("ThankYou", "Home");
        }
    }
}