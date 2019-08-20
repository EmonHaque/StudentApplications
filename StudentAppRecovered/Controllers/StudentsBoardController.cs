using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudentAppRecovered.Helper;

namespace StudentAppRecovered.Controllers
{
    public class StudentsBoardController : Controller
    {
        // GET: StudentsBoard
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ReturnCharts()
        {
            var myApps = (List<RegularApplication>)TempData["MyApplications1"];
            TempData.Keep();
            List<PartnerChart> pCharts = new List<PartnerChart>();
            
            PartnerChart pc1 = new PartnerChart();
            pc1.Chart = new List<ChartObject>();
            foreach (var item in WhoIsWhereLists.Applications)
            {
                ChartObject c2 = new ChartObject();
                c2.DataFieild = item.Type;
                c2.ValueField = myApps.Where(x => x.AppTypeId == item.Id).Count();
                pc1.Chart.Add(c2);
            }
            pCharts.Add(pc1);
            PartnerChart pc2 = new PartnerChart();
            pc2.Chart = new List<ChartObject>();
            ChartObject Accepted = new ChartObject()
            {
                DataFieild = "Accepted",
                ValueField = myApps.Where(x => x.Accepted == true).Count()
            };
            ChartObject Rejected = new ChartObject()
            {
                DataFieild = "Rejected",
                ValueField = myApps.Where(x => x.Accepted == false).Count()
            };
            ChartObject NotDecided = new ChartObject()
            {
                DataFieild = "Not Decided",
                ValueField = myApps.Where(x => x.Accepted == null).Count()
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

        public PartialViewResult Apply()
        {
            TempData["AppType"] = WhoIsWhereLists.Applications;
            var studentid = SiteUser.Users.Where(x => x.UserName == Session["User"].ToString()).Select(x => x.StudentId).First();
            var y = WhoIsWhereLists.HRSupervisor.Where(x => x.Id == studentid && x.To.Year == 1905).Select(x => x.PartnerId).First();          
            TempData["Addressees"] = WhoIsWhereLists.HRSupervisor.Where(x => x.Id == studentid && x.To.Year == 1905).Select(x => x.PartnerId).First();
            TempData["Student"] =  WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == studentid).First();

            return PartialView("Application");
        }

        public JsonResult OnApplyAction(JSONApplication application)
        {
            var supervisor = WhoIsWhereLists.HRSupervisor.Where(x => x.Id == application.Id && x.To.Year == 1905).First();
            RegularApplication app = new RegularApplication();
            app.Id = application.Id;
            app.ManagerId = supervisor.ManagerId;
            app.PartnerId = supervisor.PartnerId;
            app.AppTypeId = application.AppTypeId;
            app.AppBody = application.AppBody;
            app.Date = DateTime.Now.Date;
            app.StudentReview = app.ManagerReview = app.PartnerReview = false;
            app.Accepted = null;

            Employee emp = new Employee();
            var msg = emp.SubmitApplication(app);

            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult ViewCV()
        {
            var studentid = SiteUser.Users.Where(x => x.UserName == Session["User"].ToString()).Select(x => x.StudentId).First();
            StudentId s = new StudentId
            {
                id = studentid
            };
            TempData["Id"] = s;
            //TempData["CV"] = WhoIsWhereLists.GetStudentCV(studentid);
            return PartialView("StudentCV");
        }

        public PartialViewResult SeeApplications(ApplicationPaging app)
        {
            var apps = (IEnumerable<RegularApplication>)TempData["MyApplications1"];
            TempData.Keep("MyApplications1");
            app.TotalApps = apps.Count();
            ViewData["MyApps1"] = apps.Skip((app.PageNo - 1) * app.PageSize).Take(10);
            ViewData["MyAppsInfo1"] = app;

            return PartialView("ReviewApplication");
        }

        public JsonResult CheckApplication(ApplicationReading stud)
        {
            var apps = (IEnumerable<RegularApplication>)TempData["MyApplications1"];
            TempData.Keep("MyApplications1");
            TempData["MyApp"] = apps.Where(x => x.Sl == stud.Sl).First();
            TempData["MyAppInfo"] = stud;
            return Json("", JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult ReadApplication()
        {
            return PartialView();
        }
    }

    public class AddresseeId
    {
        public int Id { get; set; }
    }
}