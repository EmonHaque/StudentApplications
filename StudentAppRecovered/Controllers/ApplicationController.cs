using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using StudentAppRecovered.Helper;

namespace StudentAppRecovered.Controllers
{
    public class ApplicationController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult UploadPhoto()
        {
            string fileName = "";
            var x = (StudentInfo)TempData["Application"];
            for (int i = 0; i < Request.Files.Count; i++)
            {                
                HttpPostedFileBase file = Request.Files[i]; //Uploaded file
                                                            //Use the following properties to get file's name, size and MIMEType
                fileName = x.Id + " " + x.Name + ".jpg";
                int fileSize = file.ContentLength;
                
                //fileName = file.FileName;
                string mimeType = file.ContentType;
                System.IO.Stream fileContent = file.InputStream;
                //To save file, use SaveAs method
                file.SaveAs(Server.MapPath("~/TempPhoto/") + fileName); //File will be saved in application root
            }
            TempData.Keep("Application");
            return Json(fileName, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SubmitApplication(StudentInfo student)
        {
            student.Id = DBOperation.StudentId;
            //if(TempData["Application"] == null)
                TempData["Application"] = student;
            return Json("Success", JsonRequestBehavior.AllowGet);
        }

        public JsonResult SubmitCV()
        {
            var x = (StudentInfo)TempData["Application"];

            DBOperation dbo = new DBOperation();
            string y = dbo.InsertStudentCV(x);

            return Json(y, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ApplyFor(StudentInfo student)
        {
            TempData["Name"] = student.Name;
            return Json("Success", JsonRequestBehavior.AllowGet);
            
        }

        public PartialViewResult Apply()
        {
            return PartialView("ApplyFor");
        }

       
    }
}