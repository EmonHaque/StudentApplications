using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudentAppRecovered.Helper;

namespace StudentAppRecovered.Controllers
{
    public class PartnersBoardController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ReturnCharts()
        {
            var yourStaffs = (List<Student4WhoWhere>)TempData["Staffs"];
            var othersStaffs = (List<Student4WhoWhere>)TempData["OthersStaffs"];
            var appsToYou = (List<RegularApplication>)TempData["StudentAppRecovereds"];
            TempData.Keep();

            var currentstaff = appsToYou.Join(yourStaffs, x => x.Id, y => y.Id, (x, y) => x);
            List<PartnerChart2> pchart = new List<PartnerChart2>();
            PartnerChart2 pc1 = new PartnerChart2();
            pc1.Chart = new List<ChartObject2>();
            foreach (var item in WhoIsWhereLists.Applications)
            {
                ChartObject2 c2 = new ChartObject2();
                c2.DataFieild = item.Type;
                c2.ValueField1 = currentstaff.Where(x => x.AppTypeId == item.Id).Count();
                c2.ValueField2 = appsToYou.Where(x => x.AppTypeId == item.Id).Count();
                pc1.Chart.Add(c2);
            }
            pchart.Add(pc1);

            PartnerChart2 pc2 = new PartnerChart2();
            pc2.Chart = new List<ChartObject2>();
            ChartObject2 Accepted = new ChartObject2
            {
                DataFieild = "Accepted",
                ValueField1 = currentstaff.Where(x => x.Accepted == true).Count(),
                ValueField2 = appsToYou.Where(x => x.Accepted == true).Count()
            };
            ChartObject2 Rejected = new ChartObject2
            {
                DataFieild = "Rejected",
                ValueField1 = currentstaff.Where(x => x.Accepted == false).Count(),
                ValueField2 = appsToYou.Where(x => x.Accepted == false).Count()
            };
            ChartObject2 NotDecided = new ChartObject2
            {
                DataFieild = "Not Decided",
                ValueField1 = currentstaff.Where(x => x.Accepted == null).Count(),
                ValueField2 = appsToYou.Where(x => x.Accepted == null).Count()
            };
            pc2.Chart.Add(Accepted); pc2.Chart.Add(Rejected); pc2.Chart.Add(NotDecided);
            pchart.Add(pc2);
            #region Existing Staffs Chart
            var status1 = Lists4CV.Status.Where(x => x.Name == "Course Completed" ||
                                                       x.Name == "Articled" ||
                                                       x.Name == "Apprentice" ||
                                                       x.Name == "Applied for Registration");

            var status2 = Lists4CV.Status.Where(x => x.Name != "Course Completed" &&
                                                       x.Name != "Articled" &&
                                                       x.Name != "Apprentice" &&
                                                       x.Name != "Applied for Registration" && 
                                                       x.Name != "Partner");
            PartnerChart2 pc = new PartnerChart2();
            pc.Chart = new List<ChartObject2>();
            foreach (var item in status1)
            {
                ChartObject2 c2 = new ChartObject2();
                c2.DataFieild = item.Name;
                c2.ValueField1 = yourStaffs.Where(x => x.Status == item.Id.ToString()).Count();
                c2.ValueField2 = othersStaffs.Where(x => x.Status == item.Id.ToString()).Count();
                pc.Chart.Add(c2);
            }
            ChartObject2 c3 = new ChartObject2();
            c3.DataFieild = "Employee";
            foreach (var item in status2)
            {
                c3.ValueField1 += yourStaffs.Where(x => x.Status == item.Id.ToString()).Count();
                c3.ValueField2 += othersStaffs.Where(x => x.Status == item.Id.ToString()).Count();
            }
            pc.Chart.Add(c3);
            pchart.Add(pc);
            #endregion

            return Json(pchart, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult SeeApplications(ApplicationPaging app)
        {
            var apps = ((IEnumerable<RegularApplication>)TempData["StudentAppRecovereds"]).OrderByDescending(x => x.Sl);
            TempData.Keep("StudentAppRecovereds");
            app.TotalApps = apps.Count();
            ViewData["Apps"] = apps.Skip((app.PageNo - 1) * app.PageSize).Take(10);
            ViewData["AppsInfo"] = app;
            return PartialView("ReviewApplication");
        }

        public JsonResult CheckApplication(ApplicationReading stud)
        {
            var applications = (IEnumerable<RegularApplication>)TempData["StudentAppRecovereds"];
            TempData.Keep("StudentAppRecovereds");
            var app = applications.Where(x => x.Sl == stud.Sl).First();

            string msg = "";
            if (!app.PartnerReview)
            {
                Employee emp = new Employee();
                msg = emp.UpdateOnAppReview(app.PartnerId, app.Sl);
            }
            else
            {
                msg = "Updated";
            }
            TempData["ReviewingApp"] = app;
            TempData["AppReadingInfo"] = stud;

            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult ReturnNewApplicantList()
        {
            return PartialView("NewApplicants");
        }

        public PartialViewResult ReturnPartners()
        {
            return PartialView("Partners");
        }

        public PartialViewResult ReturnExStudentList()
        {
            return PartialView("ExStudentsList");
        }

        public JsonResult ReadyStudentAppRecovered(StudentId stud)
        {
            //ViewData["StudentId"] = stud;
            TempData["Id"] = stud;
            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult GetStudentApplication()
        {
            return PartialView("GetStudentApplication");
        }

        public JsonResult ReadyStudentCV(StudentId stud)
        {
            TempData["Id"] = stud;
            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult GetStudentCV()
        {
            return PartialView("StudentCV");
        }

        public JsonResult MakeNote(AppNote appnote)
        {
            var apps = (IEnumerable<RegularApplication>)TempData["StudentAppRecovereds"];
            var application = (RegularApplication)TempData["ReviewingApp"];
            bool accepted = appnote.Accepted == "Accepted" ? true : false;
            Employee emp = new Employee();
            string msg = emp.UpdateAppNote(application.PartnerId, appnote.Sl, appnote.Note, accepted);

            application.PartnerNote = appnote.Note;
            application.Accepted = accepted;
            apps.Where(x => x.Sl == appnote.Sl).First().PartnerNote = appnote.Note;
            apps.Where(x => x.Sl == appnote.Sl).First().Accepted = accepted;
            TempData["ReviewingApp"] = application;
            TempData["StudentAppRecovereds"] = apps;
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult SeeStaffDetail()
        {
            return PartialView("DetailofStaff");
        }

        public JsonResult ProcessStudentDetail(StudentId stud)
        {
            TempData["StudentId"] = stud;
            TempData["Student"] = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == stud.id).First();
            TempData["StudCV"] = WhoIsWhereLists.GetStudentCV(stud.id);
            TempData["AllApps"] = Employee.AllApplications(stud.id);
            TempData["SupHistory"] = Employee.SupervisingHistory(stud.id);
            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult SeeDetailOfExStudent()
        {
            return PartialView("DetailOfExStudent");
        }

        public JsonResult ProcessStaffDetail(StudentId stud)
        {
            var partnerId = Lists4CV.Status.Where(x => x.Name == "Partner").First().Id.ToString();
            var who = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == stud.id).First();
            if(who.Status == partnerId)
            {
                TempData["Student"] = who;
                TempData["StudCV"] = WhoIsWhereLists.GetStudentCV(who.Id);
                //TempData["AllApps"] = Employee.AllApplications(stud.id);
                //TempData["SupHistory"] = Employee.SupervisingHistory(stud.id);
            }
            else
            {
                var students = (IEnumerable<Student4WhoWhere>)TempData["Staffs"];
                TempData.Keep("Staffs");
                if (students.Where(x => x.Id == stud.id).Count() == 0)
                {
                    students = (IEnumerable<Student4WhoWhere>)TempData["OthersStaffs"];
                    TempData.Keep("OthersStaffs");
                }

                TempData["Student"] = students.Where(x => x.Id == stud.id).First();
                TempData["StudCV"] = WhoIsWhereLists.GetStudentCV(stud.id);
                TempData["AllApps"] = Employee.AllApplications(stud.id);
                TempData["SupHistory"] = Employee.SupervisingHistory(stud.id);
            }
            

            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public JsonResult ProcessAnApplication(AppInfo app)
        {
            TempData["AppInfo"] = app.Info;
            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult ReadAllApplication()
        {
            return PartialView();
        }

        public PartialViewResult ReadApplication()
        {
            return PartialView("ReadApplication");
        }

        public PartialViewResult SeeStaffs()
        {
            
            return PartialView("Staffs");
        }

        public PartialViewResult SendAllStaff(EmployeePaging ep)
        {
            int total = 0;
            List<Student4WhoWhere> courseCompleted, apperntice, articled, applied, employees, partners;
            List<NewApplication> jobApps, artApps;
            switch (ep.Who)
            {
                case "employee":
                    employees = (List<Student4WhoWhere>)TempData["partEmployee"];
                    total = employees.Count();
                    break;
                case "cc":
                    courseCompleted = (List<Student4WhoWhere>)TempData["partCC"];
                    total = courseCompleted.Count();
                    break;
                case "articled":
                    articled = (List<Student4WhoWhere>)TempData["partArticled"];
                    total = articled.Count();
                    break;
                case "applied":
                    applied = (List<Student4WhoWhere>)TempData["partAFR"];
                    total = applied.Count();
                    break;
                case "partner":
                    partners = (List<Student4WhoWhere>)TempData["partPartner"];
                    total = partners.Count();
                    break;
                case "job":
                    jobApps = (List<NewApplication>)TempData["JobApplicants"];
                    total = jobApps.Count();
                    break;
                case "student":
                    artApps = (List<NewApplication>)TempData["ArtApplicants"];
                    total = artApps.Count();
                    break;
                default:
                    apperntice = (List<Student4WhoWhere>)TempData["partApprentice"];
                    total = apperntice.Count();
                    break;
            }
            TempData.Keep();
            ep.TotalApps = total;
            TempData["PartStaffs"] = ep;
            return PartialView("RestOfStaffs");
        }

        public PartialViewResult SendPartOfStaff(EmployeePaging ep)
        {
            int total = 0;
            List<Student4WhoWhere> courseCompleted, apperntice, articled, applied, employees, partners;
            List<NewApplication> jobApps, artApps;
            switch (ep.Who)
            {
                case "employee":
                    employees = (List<Student4WhoWhere>)TempData["partEmployee"];
                    total = employees.Count();
                    break;
                case "cc":
                    courseCompleted = (List<Student4WhoWhere>)TempData["partCC"];
                    total = courseCompleted.Count();
                    break;
                case "articled":
                    articled = (List<Student4WhoWhere>)TempData["partArticled"];
                    total = articled.Count();
                    break;
                case "applied":
                    applied = (List<Student4WhoWhere>)TempData["partAFR"];
                    total = applied.Count();
                    break;
                case "partner":
                    partners = (List<Student4WhoWhere>)TempData["partPartner"];
                    total = partners.Count();
                    break;
                case "job":
                    jobApps = (List<NewApplication>)TempData["JobApplicants"];
                    total = jobApps.Count();
                    break;
                case "student":
                    artApps = (List<NewApplication>)TempData["ArtApplicants"];
                    total = artApps.Count();
                    break;
                default:
                    apperntice = (List<Student4WhoWhere>)TempData["partApprentice"];
                    total = apperntice.Count();
                    break;
            }
            TempData.Keep();
            ep.TotalApps = total;
            TempData["PartStaffs"] = ep;
            return PartialView("PartsOfStaffs");
        }

        public PartialViewResult SeeOthersStaffs()
        {
            return PartialView("OthersStaffs");
        }
    }
}