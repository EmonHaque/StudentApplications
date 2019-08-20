using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudentAppRecovered.Helper;

namespace StudentAppRecovered.Controllers
{
    public class EducationController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult PartialO()
        {
            return PartialView();
        }

        public PartialViewResult PartialSSC()
        {
            return PartialView();
        }

        public PartialViewResult PartialHSC()
        {
            return PartialView();
        }

        public PartialViewResult PartialA()
        {
            return PartialView();
        }

        public PartialViewResult PartialBachelor()
        {
            return PartialView();
        }

        public PartialViewResult PartialMaster()
        {
            return PartialView();
        }

        public PartialViewResult PartialACCA()
        {
            return PartialView();
        }

        public PartialViewResult PartialCMA()
        {
            return PartialView();
        }

        public JsonResult AddUni(UniversityName uniName)
        {
            int count = Lists4CV.BoardUniversity.Where(x => x.Name.ToLower() == uniName.Name.ToLower()).Count();
            if(count == 0)
            {
                EducationBoardUniversity ebu = AddUniversity.Add(uniName);
                return Json(ebu, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("exists", JsonRequestBehavior.AllowGet);
            }
        }
    }
}