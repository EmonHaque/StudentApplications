using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudentAppRecovered.Helper;

namespace StudentAppRecovered.Controllers
{
    public class ObjectiveController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public PartialViewResult WorkExperience()
        {
            return PartialView();
        }

        public PartialViewResult Experiences()
        {
            return PartialView();
        }

        public PartialViewResult CurrentJob()
        {
            return PartialView();
        }

        public PartialViewResult PartnerExperience()
        {   
            return PartialView();
        }

        public JsonResult AddMembersOrgName(UniversityName uniName)
        {
            int count = Lists4CV.MemberOf.Where(x => x.Organisation.ToLower() == uniName.Name.ToLower()).Count();
            if (count == 0)
            {
                MemberOf ebu = AddMembersOrganisation.Add(uniName);
                return Json(ebu, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("exists", JsonRequestBehavior.AllowGet);
            }
        }

        public PartialViewResult MoreMembership(StudentId stud)
        {
            TempData["Id"] = stud;
            return PartialView();
        }

        public PartialViewResult CurrentPosition()
        {
            return PartialView("MemberCurrentPosition");
        }

        public PartialViewResult PastPosition()
        {
            return PartialView("MemberPastPosition");
        }

        public PartialViewResult MemberMorePastPosition(StudentId stud)
        {
            TempData["Id"] = stud;
            return PartialView();
        }

        public PartialViewResult MemberMoreCurrentPosition(StudentId stud)
        {
            TempData["Id"] = stud;
            return PartialView();
        }

        public PartialViewResult MoreExperience(StudentId stud)
        {
            TempData["Id"] = stud;
            return PartialView();
        }
    }
}