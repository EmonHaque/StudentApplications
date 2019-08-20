using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudentAppRecovered.Helper;

namespace StudentAppRecovered.Controllers
{
    public class AdminsBoardController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ReturnCounts()
        {
            var students = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.JoinedOn.Year != 1905 && x.LeftOn.Year == 1905);
            var partnerId = Lists4CV.Status.Where(x => x.Name == "Partner").First().Id.ToString();
            var ccId = Lists4CV.Status.Where(x => x.Name == "Course Completed").First().Id.ToString();
            var articledId = Lists4CV.Status.Where(x => x.Name == "Articled").First().Id.ToString();
            var apprenticeId = Lists4CV.Status.Where(x => x.Name == "Apprentice").First().Id.ToString();
            var appliedId = Lists4CV.Status.Where(x => x.Name == "Applied for Registration").First().Id.ToString();

            var courseCompleted = students.Where(x => x.Status == ccId).Count();
            var apperntice = students.Where(x => x.Status == apprenticeId).Count();
            var articled = students.Where(x => x.Status == articledId).Count();
            var applied = students.Where(x => x.Status == appliedId).Count();
            var employees = students.Where(x => x.Status != appliedId &&
                                                x.Status != apprenticeId &&
                                                x.Status != articledId &&
                                                x.Status != ccId &&
                                                x.Status != partnerId).Count();
            PartnerChart pc = new PartnerChart();
            pc.Chart = new List<ChartObject>();

            ChartObject Employees = new ChartObject();
            ChartObject CourseCompleted = new ChartObject();
            ChartObject Articled = new ChartObject();
            ChartObject Applied = new ChartObject();
            ChartObject Apperntice = new ChartObject();

            Employees.DataFieild = "Employee";
            Employees.ValueField = employees;
            pc.Chart.Add(Employees);
            CourseCompleted.DataFieild = "Course Complete";
            CourseCompleted.ValueField = courseCompleted;
            pc.Chart.Add(CourseCompleted);
            Articled.DataFieild = "Articled";
            Articled.ValueField = articled;
            pc.Chart.Add(Articled);
            Applied.DataFieild = "AFR";
            Applied.ValueField = applied;
            pc.Chart.Add(Applied);
            Apperntice.DataFieild = "Apprentice";
            Apperntice.ValueField = apperntice;
            pc.Chart.Add(Apperntice);

            return Json(pc, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult ReturnPartners()
        {
            return PartialView("Partners");
        }

        public PartialViewResult SeeDetailOfStudent()
        {
            return PartialView("DetailOfStudent");
        }

        public PartialViewResult SeeDetailOfExStudent()
        {
            return PartialView("DetailOfExStudent");
        }

        public JsonResult ProcessStudentDetail(StudentId stud)
        {
            TempData["StudentId"] = stud;
            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult ReturnStudentList()
        {         
            return PartialView("StudentsList");
        }

        public PartialViewResult ReturnNewApplicantList()
        {
            return PartialView("NewApplicants");
        }

        public JsonResult RejectApplicant(StudentId stud)
        {
            string msg = WhoIsWhereLists.RejectApplicant(stud.id);
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        //Create a Separate view
        public PartialViewResult ReturnExStudentList()
        {
            return PartialView("ExStudentsList");
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

        public JsonResult ReadyStudentAppRecovered(StudentId stud)
        {
            ViewData["StudentId"] = stud;
            TempData["Id"] = stud;
            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public JsonResult Checkb4Promotion(StudentId stud)
        {
            string msg = "";
            var manager = Lists4CV.Status.Where(x => x.Name == "Manager").First().Id;
            var status = WhoIsWhereLists.HRSupervisor.Where(x => x.Id == stud.id && x.To.Year == 1905).First().StatusId;
            if(status == manager)
            {
                var students = WhoIsWhereLists.HRSupervisor.Where(x => x.ManagerId == stud.id && x.To.Year == 1905).Count();
                if(students > 0)
                {
                    LeftOrTerminated lot = new LeftOrTerminated
                    {
                        Id = stud.id
                    };
                    TempData["Student4Transfer"] = lot;
                    msg = "Transfer";
                }
                else
                {
                    msg = "Promote";
                }
            }
            else
            {
                msg = "Promote";
            }
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Promote(HRSupervisory sup)
        {
            string msg = Employee.Promote(sup);
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult Promotion()
        {
            return PartialView();
        }

        public JsonResult CourseComplete(StudentId stud)
        {
            string msg = Employee.CourseCompleted(stud.id);
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult GetStudentApplication()
        {
            return PartialView("GetStudentApplication");
        }

        public PartialViewResult Joining()
        {
            return PartialView("Join");
        }

        public JsonResult ReturnPositions(DepartmentId dept)
        {
            var statId = Lists4CV.DeptStatusMap.Where(x => x.DepartmentId == dept.Id).Select(x=>x.StatusId);
            var y = statId.Join(Lists4CV.Status, s => s, q => q.Id, (s,status) => new { status });
            return Json(y, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ReturnManagers(PartnerId part)
        {
            var mans = WhoIsWhereLists.Managers.Where(x => x.PartnerId == part.Id);
            return Json(mans, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EmployeeJoin(EmployeeJoining employee)
        {
            employee.Date = DateTime.Now.Date;
            employee.Role = "Joining";
            employee.Retry = 0;

            Employee emp = new Employee();
            string msg = emp.Join(employee);
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult StudentJoin(EmployeeJoining student)
        {
            string msg = string.Empty;
            var users = SiteUser.Users;
            if(users.Where(x=>x.UserName == student.UserName).Count() > 0)
            {
                msg = "Exists";
            }
            else
            {
                int deptId = Lists4CV.Department.Where(x => x.Name == "Administration").Select(x => x.Id).First();
                int statusId = Lists4CV.Status.Where(x => x.Name == "Apprentice").Select(x => x.Id).First();

                student.Date = DateTime.Now.Date;
                student.Role = "Joining";
                student.Retry = 0;
                student.DepartmentId = deptId;
                student.StatusId = statusId;

                Employee emp = new Employee();
                msg = emp.Join(student);
            }
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        //start reviewing from here
        public JsonResult GetRegistrationInfo(StudentId stud)
        {
            var msg = "";
            TempData["Id"] = stud;
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ConfirmAStudentTransfer(HRSupervisory sup)
        {
            var s = WhoIsWhereLists.HRSupervisor.Where(x => x.Id == sup.Id && x.To.Year == 1905).First();
            sup.StatusId = s.StatusId;
            sup.DepartmentId = s.DepartmentId;
            sup.From = DateTime.Now.Date;
            sup.To = Convert.ToDateTime("1/1/1905");
            Employee e = new Employee();
            string msg =  e.TransferAStudent(sup);
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult TransferAStudent()
        {
            return PartialView();
        }

        public JsonResult GetSupervisingHistory(StudentId stud)
        {
            var msg = "";
            TempData["Id"] = stud;
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult UpdateRegistrationNo()
        {
            return PartialView("UpdateRegistrationNo");
        }

        public JsonResult ReadyRegistrationNo(RegistrationNo registtration)
        {
            var latestposition = Employee.SupervisingHistory(registtration.Id).Where(x => x.To.Year == 1905).First();
            HRSupervisory sup = new HRSupervisory();
            sup.Id = registtration.Id;
            sup.PartnerId = latestposition.PartnerId;
            sup.ManagerId = latestposition.ManagerId;
            sup.From = latestposition.From;
            sup.DepartmentId = Lists4CV.Department.Where(x => x.Name == "Administration").Select(x => x.Id).First();

            Employee emp = new Employee();
            string msg = emp.UpdateRegistrationNo(sup, registtration.RegNo, registtration.PeriodOfCourse);
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult RegistrationInfo()
        {
            return PartialView("RegistrationInfo");
        }

        public JsonResult ReadyRegistration(HRSupervisory sup)
        {
            Employee emp = new Employee();
            sup.DepartmentId = Lists4CV.Department.Where(x => x.Name == "Administration").Select(x => x.Id).First();
            string msg = emp.RegisterStudent(sup, sup.From);
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ProcessAnApplication(AppInfo app)
        {
            TempData["AppInfo"] = app;
            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult ReadAllApplication()
        {
            return PartialView();
        }

        public JsonResult Transfer(TransferInfo info)
        {
            Employee e = new Employee();
            string msg = e.Transfer(info);
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdatePartnerInfo(JoinedPartnerUpdateInfo stud)
        {
            string msg = string.Empty;
            var users = SiteUser.Users;
            if (users.Where(x => x.UserName == stud.UserName).Count() > 0)
            {
                msg = "Exists";
            }
            else
            {
                Users u = new Users();
                u.StudentId = stud.PartnerId;
                u.Password = stud.Password;
                u.UserName = stud.UserName;
                u.Role = "Partner";
                u.Retry = 0;
                

                Employee emp = new Employee();
                msg = emp.UpdatePartnerInfo(u,stud);
            }
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult GetJoiningDate(StudentId stud)
        {
            TempData["Id"] = stud;
            return PartialView("UpdateJoiningDate");
        }

        public JsonResult TransferAllEmployees(TransferInfo info)
        {
            string msg = "";
            var students = WhoIsWhereLists.HRSupervisor.Where(x => x.PartnerId == info.OldSup && x.To.Year == 1905 && x.ManagerId != 0);
            var managers = WhoIsWhereLists.Managers.Where(x => x.PartnerId == info.OldSup);
            foreach (var item in managers)
            {
                if(students.Where(x=>x.ManagerId == item.Id).Count() > 0)
                {
                    msg = "HasStudent";
                    break;
                }
            }
            if(msg != "HasStudent")
            {
                Employee e = new Employee();
                msg = e.TransferAllEmployees(info);
            }
            
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult TransferAllStudents(AllStudentTransferInfo info)
        {
            Employee e = new Employee();
            string msg = e.TransferAllStudents(info);
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult TransferStudent()
        {
            return PartialView();
        }

        public PartialViewResult TransferEmployeeFrompartner()
        {
            return PartialView();
        }

        public PartialViewResult TransferStudentFromPartner()
        {
            return PartialView();
        }

        public JsonResult GoodBye(LeftOrTerminated lot)
        {
            string msg = "";
            int students = WhoIsWhereLists.HRSupervisor.Where(x => x.ManagerId == lot.Id && x.To.Year == 1905).Count();
            if(students > 0)
            {
                msg = "HasStudent";
                TempData["Student4Transfer"] = lot;
            }
            else
            {
                lot.Date = DateTime.Now.Date;
                msg = Employee.LeftOrTerminated(lot);
            }          
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GoodByePartner(LeftOrTerminated lot)
        {
            string msg = "";
            int students = WhoIsWhereLists.HRSupervisor.Where(x => x.PartnerId == lot.Id && x.To.Year == 1905 && x.ManagerId != 0).Count();
            int employees = WhoIsWhereLists.HRSupervisor.Where(x => x.PartnerId == lot.Id && x.To.Year == 1905 && x.ManagerId == 0).Count();
            if (students > 0 && employees > 0)
            {
                msg = "HasBoth";
                TempData["Student4Transfer"] = lot;
            }
            else if(students > 0 && employees == 0)
            {
                msg = "HasStudent";
                TempData["Student4Transfer"] = lot;
            }
            else if (students == 0 && employees > 0)
            {
                msg = "HasEmployee";
                TempData["Student4Transfer"] = lot;
            }
            else
            {
                lot.Date = DateTime.Now.Date;
                msg = Employee.PartnerLeft(lot);
            }
            return Json(msg, JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult GetJoiningLetters()
        {
            return PartialView("GetJoiningLetters");
        }

        public JsonResult ReadyJoiningLetter(StudentId stud)
        {
            TempData["Id"] = stud;
            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public PartialViewResult GeJoiningLetter()
        {
            return PartialView();
        }

        public JsonResult UpdateEmployee(StudentId stud)
        {
            var msg = Employee.UpdateEmployeeJoined(stud.id);
            return Json(msg, JsonRequestBehavior.AllowGet);
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

        public PartialViewResult Seeletters(ApplicationPaging app)
        {
            var letters = (List<JoiningLetter>)TempData["AllLetters"];
            TempData.Keep("AllLetters");
            //var apps = ((IEnumerable<RegularApplication>)TempData["StudentAppRecovereds"]).OrderByDescending(x => x.Sl);
            TempData.Keep("StudentAppRecovereds");
            app.TotalApps = letters.Count();
            ViewData["Apps"] = letters.Skip((app.PageNo - 1) * app.PageSize).Take(10).ToList();
            ViewData["AppsInfo"] = app;
            return PartialView("PartsOfJoiningLetters");
        }
    }
}