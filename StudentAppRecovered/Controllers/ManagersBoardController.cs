using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudentAppRecovered.Helper;

namespace StudentAppRecovered.Controllers
{
    public class ManagersBoardController : Controller
    {
        public ActionResult Index()
        {
            var userName = Session["User"].ToString();
            var managerId = SiteUser.Users.Where(x => x.UserName == userName).Select(x => x.StudentId).First();
            var studentsId = WhoIsWhereLists.HRSupervisor.Where(x => x.ManagerId == managerId && x.To.Year == 1905).Select(x=>x.Id).Distinct();
            List<Student4WhoWhere> myStudents = new List<Student4WhoWhere>();
            foreach (var item in studentsId)
            {
                myStudents.Add(WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == item).First());
            }
            TempData["ManagableStudents"] = myStudents;
            TempData["StudentAppRecovereds1"] = Employee.Applications(managerId);
            TempData["MyAppications"] = Employee.MyApplications(managerId).OrderByDescending(x => x.Sl).ToList();
            return View();
        }

        public JsonResult ReturnCharts()
        {
            var students = (List<Student4WhoWhere>)TempData["ManagableStudents"];
            var studentApps = (List<RegularApplication>)TempData["StudentAppRecovereds1"];
            var myApps = (List<RegularApplication>)TempData["MyAppications"];
            TempData.Keep();
            List<PartnerChart2> pCharts = new List<PartnerChart2>();
            var status1 = Lists4CV.Status.Where(x => x.Name == "Articled" ||
                                                       x.Name == "Apprentice" ||
                                                       x.Name == "Applied for Registration");

            PartnerChart2 pc = new PartnerChart2();
            pc.Chart = new List<ChartObject2>();
            foreach (var item in status1)
            {
                ChartObject2 c2 = new ChartObject2();
                c2.DataFieild = item.Name;
                c2.ValueField1 = students.Where(x => x.Status == item.Id.ToString()).Count();
                pc.Chart.Add(c2);
            }
            pCharts.Add(pc);
            PartnerChart2 pc1 = new PartnerChart2();
            pc1.Chart = new List<ChartObject2>();
            foreach (var item in WhoIsWhereLists.Applications)
            {
                ChartObject2 c2 = new ChartObject2();
                c2.DataFieild = item.Type;
                c2.ValueField1 = studentApps.Where(x => x.AppTypeId == item.Id).Count();
                c2.ValueField2 = myApps.Where(x => x.AppTypeId == item.Id).Count();
                pc1.Chart.Add(c2);
            }
            pCharts.Add(pc1);
            PartnerChart2 pc2 = new PartnerChart2();
            pc2.Chart = new List<ChartObject2>();
            ChartObject2 Accepted = new ChartObject2
            {
                DataFieild = "Accepted",
                ValueField1 = studentApps.Where(x => x.Accepted == true).Count(),
                ValueField2 = myApps.Where(x => x.Accepted == true).Count()
            };
            ChartObject2 Rejected = new ChartObject2
            {
                DataFieild = "Rejected",
                ValueField1 = studentApps.Where(x => x.Accepted == false).Count(),
                ValueField2 = myApps.Where(x => x.Accepted == false).Count()
            };
            ChartObject2 NotDecided = new ChartObject2
            {
                DataFieild = "Not Decided",
                ValueField1 = studentApps.Where(x => x.Accepted == null).Count(),
                ValueField2 = myApps.Where(x => x.Accepted == null).Count()
            };
            pc2.Chart.Add(Accepted); pc2.Chart.Add(Rejected); pc2.Chart.Add(NotDecided);
            pCharts.Add(pc2);
            return Json(pCharts, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddApplicationSubject(UniversityName appSub)
        {
            int count = WhoIsWhereLists.Applications.Where(x => x.Type.ToLower() == appSub.Name.ToLower()).Count();
            if (count == 0)
            {
                ApplicationType ebu = Employee.AddApplicationSubject(appSub);
                return Json(ebu, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("exists", JsonRequestBehavior.AllowGet);
            }
        }

        public PartialViewResult MyApplications(ApplicationPaging app)
        {
            var apps = (IEnumerable<RegularApplication>)TempData["MyAppications"];
            TempData.Keep("MyAppications");
            app.TotalApps = apps.Count();
            ViewData["MyApps"] = apps.Skip((app.PageNo - 1) * app.PageSize).Take(10);
            ViewData["MyAppsInfo"] = app;
            return PartialView();
        }

        public PartialViewResult Apply()
        {
            TempData["AppType"] = WhoIsWhereLists.Applications;
            var studentid = SiteUser.Users.Where(x => x.UserName == Session["User"].ToString()).Select(x => x.StudentId).First();
            var y = WhoIsWhereLists.HRSupervisor.Where(x => x.Id == studentid && x.To.Year == 1905).Select(x => x.PartnerId).First();
            TempData["Addressees"] = WhoIsWhereLists.HRSupervisor.Where(x => x.Id == studentid && x.To.Year == 1905).Select(x => x.PartnerId).First();
            TempData["Student"] = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == studentid).First();

            return PartialView("Application");
        }

        public JsonResult OnApplyAction(JSONApplication application)
        {
            var supervisor = WhoIsWhereLists.HRSupervisor.Where(x => x.Id == application.Id && x.To.Year == 1905).First();
            RegularApplication app = new RegularApplication();
            app.Id = application.Id;
            app.ManagerId = 0;
            app.PartnerId = supervisor.PartnerId;
            app.AppTypeId = application.AppTypeId;
            app.AppBody = application.AppBody;
            app.Date = DateTime.Now.Date;
            app.StudentReview = app.ManagerReview = app.PartnerReview = false;

            Employee emp = new Employee();
            var msg = emp.SubmitApplication(app);

            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult SeeStudents()
        {
            return PartialView("Students");
        }

        public PartialViewResult SeeApplications(ApplicationPaging app)
        {
            var apps = ((IEnumerable<RegularApplication>)TempData["StudentAppRecovereds1"]).OrderByDescending(x => x.Sl);
            TempData.Keep("StudentAppRecovereds1");
            app.TotalApps = apps.Count();
            ViewData["Apps"] = apps.Skip((app.PageNo - 1) * app.PageSize).Take(10);
            ViewData["AppsInfo"] = app;
            return PartialView("ReviewApplication");
        }

        public JsonResult CheckApplication(ApplicationReading stud)
        {
            var applications = (IEnumerable<RegularApplication>)TempData["StudentAppRecovereds1"];
            TempData.Keep("StudentAppRecovereds1");
            var app = applications.Where(x => x.Sl == stud.Sl).First();

            string msg = "";
            if (!app.ManagerReview)
            {
                Employee emp = new Employee();
                //false is for nothing
                msg = emp.UpdateOnAppReview(app.ManagerId, app.Sl);
            }
            else
            {
                msg = "Updated";
            }
            TempData["ReviewingApp1"] = app;
            TempData["AppReadingInfo"] = stud;
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult MakeNote(AppNote appnote)
        {
            var apps = (IEnumerable<RegularApplication>)TempData["StudentAppRecovereds1"];
            var application = (RegularApplication)TempData["ReviewingApp1"];
            Employee emp = new Employee();
            //false for nothing
            string msg = emp.UpdateAppNote(application.ManagerId, appnote.Sl, appnote.Note, false);

            application.ManagerNote = appnote.Note;
            apps.Where(x => x.Sl == appnote.Sl).First().ManagerNote = appnote.Note;
            TempData["ReviewingApp1"] = application;
            TempData["StudentAppRecovereds1"] = apps;
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult ReadApplication()
        {
            return PartialView();
        }

        public JsonResult CheckMyApplication(ApplicationReading stud)
        {
            var apps = (IEnumerable<RegularApplication>)TempData["MyAppications"];
            TempData.Keep("MyAppications");
            TempData["MyApp"] = apps.Where(x => x.Sl == stud.Sl).First();
            TempData["MyAppReadingInfo"] = stud;
            return Json("", JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult ReadMyApplication()
        {
            return PartialView();
        }

        public JsonResult ProcessStudentDetail(StudentId stud)
        {
            var students = (IEnumerable<Student4WhoWhere>)TempData["ManagableStudents"];
            TempData.Keep("ManagableStudents");
            TempData["Student"] = students.Where(x => x.Id == stud.id).First();
            TempData["StudCV"] = WhoIsWhereLists.GetStudentCV(stud.id);
            TempData["AllApps"] = Employee.AllApplications(stud.id);
            TempData["SupHistory"] = Employee.SupervisingHistory(stud.id);

            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult SeeDetailOfStudent()
        {
            return PartialView("DetailofStudent");
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

        public PartialViewResult SendPartOfStaff(EmployeePaging ep)
        {
            int total = 0;
            List<Student4WhoWhere> apperntice, articled, applied;
            switch (ep.Who)
            {
                case "articled":
                    articled = (List<Student4WhoWhere>)TempData["partArticled"];
                    total = articled.Count();
                    break;
                case "applied":
                    applied = (List<Student4WhoWhere>)TempData["partAFR"];
                    total = applied.Count();
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

        public PartialViewResult SendAllStaff(EmployeePaging ep)
        {
            int total = 0;
            List<Student4WhoWhere> apperntice, articled, applied;
            switch (ep.Who)
            {
                case "articled":
                    articled = (List<Student4WhoWhere>)TempData["partArticled"];
                    total = articled.Count();
                    break;
                case "applied":
                    applied = (List<Student4WhoWhere>)TempData["partAFR"];
                    total = applied.Count();
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
    }
}