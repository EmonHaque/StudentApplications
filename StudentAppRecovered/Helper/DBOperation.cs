using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;

namespace StudentAppRecovered.Helper
{
    public class DBOperation
    {
        private static int maxStudentId;
        public static int StudentId
        {
            get
            {
                if (maxStudentId == 0)
                {
                    maxStudentId = GetStudentId();
                    return maxStudentId;

                }
                else
                {
                    maxStudentId++;
                    return maxStudentId;
                }

            }
        }

        public static int GetStudentId()
        {
            int maxStudentId = 0;
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = "SELECT MAX(Id) FROM Student";
            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    var z = cmd.ExecuteScalar().ToString();
                    if (z != string.Empty)
                    {
                        maxStudentId = Convert.ToInt32(z) + 1;
                    }
                    else
                    {
                        maxStudentId = 1;
                    }
                }
            }
            return maxStudentId;
        }

        public static void InsertJoiningLetter(JoiningLetter letter)
        {
            string query = "INSERT INTO JoiningLetter VALUES(@Id, @PartnerId, @AppSubject, @AppBody, @Date, @Reviewed)";
            string CS = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Id", letter.Id);
                    cmd.Parameters.AddWithValue("@PartnerId", letter.PartnerId);
                    cmd.Parameters.AddWithValue("@AppSubject", letter.AppSubject);
                    cmd.Parameters.AddWithValue("@AppBody", letter.AppBody);
                    cmd.Parameters.AddWithValue("@Date", letter.Date);
                    cmd.Parameters.AddWithValue("@Reviewed", false);
                    con.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public string InsertStudentCV(StudentInfo student)
        {
            WhoIsWhereLists.Students4WhoIsWhere.Count();

            string msg = "";
            string q4Student = "INSERT INTO Student VALUES(@Id, @Name, @RegistrationNo, @Status, @Department, @AppliedOn, @JoinedOn, @LeftOn, @DoB, @SiteUser, @LastStat)";
            string q4StudentDetail = @"INSERT INTO StudentDetail VALUES(@Id, @FatherName, @MotherName, @Religion, @Gender, 
                                                        @MaritalStatus, @Nationality, @Blood, @ContactNo, @Email, @PresentAddress, 
                                                        @PermanentAddress, @EmergencyContactNo, 
                                                        @RelationWithEmergencyContact, @Objective)";
            string q4StudentEducation = @"INSERT INTO StudentEducation VALUES(@Id, @Type, @Title, @BoardUniversity, @Institute, 
                                                        @YearOfPass, @CGPA, @Major)";
            string q4StudentOAEducation = "INSERT INTO StudentOAEducation VALUES(@Id, @Level, @Subject, @Grade)";
            string q4Reference = "INSERT INTO Reference VALUES(@Id, @Name, @Designation, @Organisation, @ContactNo, @Relation)";
            string q4CurrentJob = "INSERT INTO CurrentPosition VALUES(@Id, @Position, @Organisation, @From, @Responsibilities)";
            string q4PastJobs = "INSERT INTO PastPosition VALUES(@Id, @Position, @Organisation, @From, @To, @Responsibilities)";
            string q4PartMembership = "INSERT INTO PartnerMembership VALUES(@Id, @MemberId, @OrgId)";
            string q4PartCurrentPos = "INSERT INTO PartnerCurrentPosition VALUES(@Id, @Position, @Organisation, @From)";
            string q4PartPastPos = "INSERT INTO PartnerPastPosition VALUES(@Id, @Position, @Organisation, @From, @To)";
            string q4Application = "INSERT INTO NewApplication VALUES(@Id, @AppSubject, @AppBody, @StatusId, @Accepted)";

            string CS = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            using (SqlConnection con = new SqlConnection(CS))
            {
                con.Open();
                SqlTransaction Trans = con.BeginTransaction();
                try
                {
                    ExecuteTransaction(q4Student, Para4Student(student), con, Trans).ExecuteNonQuery();
                    ExecuteTransaction(q4StudentDetail, Para4StudentDetail(student), con, Trans).ExecuteNonQuery();
                    if (student.SSC.Board != null)
                    {
                        ExecuteTransaction(q4StudentEducation, Para4LowEduB("SSC", student.SSC, student.Id), con, Trans).ExecuteNonQuery();
                    }
                    else
                    {
                        ExecuteTransaction(q4StudentEducation, Para4LowEduE("O Level", student.OLevel, student.Id), con, Trans).ExecuteNonQuery();
                        foreach (var item in student.OLevel.Subjects)
                        {
                            ExecuteTransaction(q4StudentOAEducation, para4OASubject(0, item, student.Id), con, Trans).ExecuteNonQuery();
                        }
                    }
                    if (student.HSC.Board != null)
                    {
                        ExecuteTransaction(q4StudentEducation, Para4LowEduB("HSC", student.HSC, student.Id), con, Trans).ExecuteNonQuery();
                    }
                    else
                    {
                        ExecuteTransaction(q4StudentEducation, Para4LowEduE("A Level", student.ALevel, student.Id), con, Trans).ExecuteNonQuery();
                        foreach (var item in student.ALevel.Subjects)
                        {
                            ExecuteTransaction(q4StudentOAEducation, para4OASubject(1, item, student.Id), con, Trans).ExecuteNonQuery();
                        }
                    }

                    if (student.Bachelor.Title != null)
                    {
                        ExecuteTransaction(q4StudentEducation, Para4UniEdu(student.Bachelor.Title, student.Bachelor, student.Id), con, Trans).ExecuteNonQuery();
                    }

                    if (student.Master.Title != null)
                    {
                        ExecuteTransaction(q4StudentEducation, Para4UniEdu(student.Master.Title, student.Master, student.Id), con, Trans).ExecuteNonQuery();
                    }

                    if (student.ACCA.Institute != null)
                    {
                        ExecuteTransaction(q4StudentEducation, Para4ProEdu("ACCA", student.ACCA, student.Id), con, Trans).ExecuteNonQuery();
                    }

                    if (student.CMA.Institute != null)
                    {
                        ExecuteTransaction(q4StudentEducation, Para4ProEdu("CMA", student.CMA, student.Id), con, Trans).ExecuteNonQuery();
                    }

                    if (student.CurrentJob != null)
                    {
                        if (student.CurrentJob.Position != null)
                            ExecuteTransaction(q4CurrentJob, Para4CurrentPosition(student.Id, student.CurrentJob), con, Trans).ExecuteNonQuery();
                    }

                    if (student.Experiences != null)
                    {
                        foreach (var item in student.Experiences)
                        {
                            ExecuteTransaction(q4PastJobs, Para4PastPosition(student.Id, item), con, Trans).ExecuteNonQuery();
                        }
                    }

                    if (student.PartnerMembership != null)
                    {
                        foreach (var item in student.PartnerMembership)
                        {
                            ExecuteTransaction(q4PartMembership, Para4PartMembership(student.Id, item), con, Trans).ExecuteNonQuery();
                        }
                    }

                    if (student.PartnerCurrentPosition != null)
                    {
                        foreach (var item in student.PartnerCurrentPosition)
                        {
                            ExecuteTransaction(q4PartCurrentPos, Para4PartCurrentPosition(student.Id, item), con, Trans).ExecuteNonQuery();
                        }
                    }

                    if (student.PartnerPastPosition != null)
                    {
                        foreach (var item in student.PartnerPastPosition)
                        {
                            ExecuteTransaction(q4PartPastPos, Para4PartPastPosition(student.Id, item), con, Trans).ExecuteNonQuery();
                        }
                    }

                    foreach (var item in student.Reference)
                    {
                        ExecuteTransaction(q4Reference, Para4Reference(student.Id, item), con, Trans).ExecuteNonQuery();
                    }

                    if (student.ApplicationFor != "Partner")
                    {
                        ExecuteTransaction(q4Application, Para4Application(student), con, Trans).ExecuteNonQuery();
                    }

                    var from = @"D:\StudentAppRecovered\StudentAppRecovered\TempPhoto\" + student.Id + " " + student.Name + ".jpg";
                    var to = @"D:\StudentAppRecovered\StudentAppRecovered\Photo\" + student.Id + " " + student.Name + ".jpg";
                    File.Move(from, to);

                    var jobStat = Lists4CV.Status.Where(x => x.Name == "Applicant for Job").Select(x => x.Id).First().ToString();
                    var stuStat = Lists4CV.Status.Where(x => x.Name == "Applicant for Articleship").Select(x => x.Id).First().ToString();
                    var parStat = Lists4CV.Status.Where(x => x.Name == "Partner").Select(x => x.Id).First().ToString();

                    var status = "";
                    if (student.ApplicationFor == "Job")
                    {
                        status = jobStat;
                    }
                    else if (student.ApplicationFor == "Partner")
                    {
                        status = parStat;
                        Partner p = new Partner();
                        p.Id = student.Id;
                        p.Name = student.Name;
                        WhoIsWhereLists.Partners.Add(p);
                    }
                    else
                    {
                        status = stuStat;
                    }

                    Student4WhoWhere st = new Student4WhoWhere();
                    st.AppliedOn = DateTime.Now.Date;
                    st.DoB = Convert.ToDateTime(student.DateOfBirth);
                    st.Id = student.Id;
                    st.JoinedOn = Convert.ToDateTime("1/1/1905");
                    st.LeftOn = Convert.ToDateTime("1/1/1905");
                    st.Name = student.Name;
                    st.RegistrationNo = string.Empty;
                    st.SiteUser = Convert.ToByte(0);
                    st.Status = status;
                    WhoIsWhereLists.AAddStudent(st);
                    msg = "Inserted";
                    Trans.Commit();
                }
                catch (Exception ex)
                {
                    Trans.Rollback();
                    msg = ex.Message;
                }
                return msg;
            }
        }

        public SqlParameter[] Para4PartCurrentPosition(int id, PartnerCurrentPosition cp)
        {
            SqlParameter[] para = {
                new SqlParameter("@Id", id),
                new SqlParameter("@Position", cp.Position),
                new SqlParameter("@Organisation", cp.Organisation),
                new SqlParameter("@From", cp.From)
            };
            return para;
        }

        public SqlParameter[] Para4PartPastPosition(int id, PartnerPastPosition ep)
        {
            SqlParameter[] para = {
                new SqlParameter("@Id", id),
                new SqlParameter("@Position", ep.Position),
                new SqlParameter("@Organisation", ep.Organisation),
                new SqlParameter("@From", ep.From),
                new SqlParameter("@To", ep.To)
            };
            return para;
        }

        public SqlParameter[] Para4PartMembership(int id, PartnerMembership ep)
        {
            SqlParameter[] para = {
                new SqlParameter("@Id", id),
                new SqlParameter("@MemberId", ep.Id),
                new SqlParameter("@OrgId", ep.Organisation)
            };
            return para;
        }

        public SqlParameter[] Para4CurrentPosition(int id, CurrentPosition cp)
        {
            SqlParameter[] para = {
                new SqlParameter("@Id", id),
                new SqlParameter("@Position", cp.Position),
                new SqlParameter("@Organisation", cp.Organisation),
                new SqlParameter("@From", cp.From),
                new SqlParameter("@Responsibilities", cp.Responsibilities)
            };
            return para;
        }

        public SqlParameter[] Para4PastPosition(int id, Experience ep)
        {
            SqlParameter[] para = {
                new SqlParameter("@Id", id),
                new SqlParameter("@Position", ep.Position),
                new SqlParameter("@Organisation", ep.Organisation),
                new SqlParameter("@From", ep.From),
                new SqlParameter("@To", ep.To),
                new SqlParameter("@Responsibilities", ep.Responsibilities)
            };
            return para;
        }

        public SqlParameter[] Para4Reference(int id, ReferenceInfo reference)
        {
            SqlParameter[] para = {
                new SqlParameter("@Id", id),
                new SqlParameter("@Name", reference.Name),
                new SqlParameter("@Designation", reference.Designation),
                new SqlParameter("@Organisation", reference.Organisation),
                new SqlParameter("@ContactNo", reference.ContactNo),
                new SqlParameter("@Relation", reference.Relation)
            };
            return para;
        }

        public SqlParameter[] Para4LowEduB(string level, SchoolCollegeInfo sci, int studid)
        {
            int title = Lists4CV.EducationTitle.Where(x => x.Title == level).Select(x => x.TitleId).FirstOrDefault();
            SqlParameter[] para = {
                new SqlParameter("@Id", studid),
                new SqlParameter("@Type", DBNull.Value),
                new SqlParameter("@Title", title),
                new SqlParameter("@BoardUniversity", sci.Board),
                new SqlParameter("@Institute", sci.Institute),
                new SqlParameter("@YearOfPass", sci.YearOfPass),
                new SqlParameter("@CGPA", sci.CGPA),
                new SqlParameter("@Major", DBNull.Value)
            };
            return para;
        }

        public SqlParameter[] Para4LowEduE(string level, OAInfo sci, int studid)
        {
            int title = Lists4CV.EducationTitle.Where(x => x.Title == level).Select(x => x.TitleId).FirstOrDefault();
            SqlParameter[] para = {
                new SqlParameter("@Id", studid),
                new SqlParameter("@Type", DBNull.Value),
                new SqlParameter("@Title", title),
                new SqlParameter("@BoardUniversity", sci.Board),
                new SqlParameter("@Institute", sci.Institute),
                new SqlParameter("@YearOfPass", sci.YearOfPass),
                new SqlParameter("@CGPA", DBNull.Value),
                new SqlParameter("@Major", DBNull.Value)
            };
            return para;
        }

        public SqlParameter[] para4OASubject(int level, OASubjects sub, int studid)
        {
            SqlParameter[] para = {
                new SqlParameter("@Id", studid),
                new SqlParameter("@Level", level),
                new SqlParameter("@Subject", sub.Name),
                new SqlParameter("@Grade", sub.Grade),
            };
            return para;
        }

        public SqlParameter[] Para4UniEdu(string level, UniversityInfo ui, int studid)
        {
            SqlParameter[] para = {
                new SqlParameter("@Id", studid),
                new SqlParameter("@Type", ui.Type),
                new SqlParameter("@Title", level),
                new SqlParameter("@BoardUniversity", ui.University),
                new SqlParameter("@Institute", ui.Institute),
                new SqlParameter("@YearOfPass", ui.YearOfPass),
                new SqlParameter("@CGPA", ui.CGPA),
                new SqlParameter("@Major", ui.Major)
            };
            return para;
        }

        public SqlParameter[] Para4Application(StudentInfo student)
        {
            int stat = 0;
            if (student.ApplicationFor == "Job")
            {
                stat = Lists4CV.Status.Where(x => x.Name == "Applicant for Job").Select(x => x.Id).First();
            }

            else
            {
                stat = Lists4CV.Status.Where(x => x.Name == "Applicant for Articleship").Select(x => x.Id).First();
            }

            SqlParameter[] para = {
                new SqlParameter("@Id", student.Id),
                new SqlParameter("@AppSubject", student.AppSubject),
                new SqlParameter("@AppBody", student.AppBody),
                new SqlParameter("@StatusId", stat),
                new SqlParameter("@Accepted", DBNull.Value)
            };
            return para;
        }

        public SqlParameter[] Para4ProEdu(string level, ProfessionalInfo pi, int studid)
        {

            int title = Lists4CV.EducationTitle.Where(x => x.Title == level).Select(x => x.TitleId).FirstOrDefault();
            SqlParameter[] para = {
                new SqlParameter("@Id", studid),
                new SqlParameter("@Type", DBNull.Value),
                new SqlParameter("@Title", title),
                new SqlParameter("@BoardUniversity", DBNull.Value),
                new SqlParameter("@Institute", pi.Institute),
                new SqlParameter("@YearOfPass", pi.YearOfPass),
                new SqlParameter("@CGPA", DBNull.Value),
                new SqlParameter("@Major", DBNull.Value)
            };
            return para;
        }

        public SqlParameter[] Para4StudentDetail(StudentInfo student)
        {
            SqlParameter Gender = student.Gender == "Male" ? new SqlParameter("@Gender", true) : new SqlParameter("@Gender", false);
            SqlParameter Email = student.Email == null ? new SqlParameter("@Email", DBNull.Value) : new SqlParameter("@Email", student.Email);
            SqlParameter[] para = {
                new SqlParameter("@Id", student.Id),
                new SqlParameter("@FatherName", student.FatherName),
                new SqlParameter("@MotherName", student.MotherName),
                new SqlParameter("@Religion", student.Religion),
                Gender,
                new SqlParameter("@MaritalStatus", student.MaritalStatus),
                new SqlParameter("@Nationality", student.Nationality),
                new SqlParameter("@Blood", student.Blood),
                new SqlParameter("@ContactNo", student.ContactNo),
                Email,
                new SqlParameter("@PresentAddress", student.PresentAddress),
                new SqlParameter("@PermanentAddress", student.PermanentAddress),
                new SqlParameter("@EmergencyContactNo", student.EmergencyContactNo),
                new SqlParameter("@RelationWithEmergencyContact", student.RelationWithEmergencyContact),
                new SqlParameter("@Objective", student.Objective)
            };
            return para;
        }

        public SqlParameter[] Para4Student(StudentInfo student)
        {
            int stat = 0;
            if (student.ApplicationFor == "Job")
            {
                stat = Lists4CV.Status.Where(x => x.Name == "Applicant for Job").Select(x => x.Id).First();
            }
            else if (student.ApplicationFor == "Partner")
            {
                stat = Lists4CV.Status.Where(x => x.Name == "Partner").Select(x => x.Id).First();
            }
            else
            {
                stat = Lists4CV.Status.Where(x => x.Name == "Applicant for Articleship").Select(x => x.Id).First();
            }

            SqlParameter[] para = {
                new SqlParameter("@Id", student.Id),
                new SqlParameter("@Name", student.Name),
                new SqlParameter("@RegistrationNo", DBNull.Value),
                new SqlParameter("@Status", stat),
                new SqlParameter("@Department", DBNull.Value),
                new SqlParameter("@AppliedOn", DateTime.Now.Date),
                new SqlParameter("@JoinedOn", DBNull.Value),
                new SqlParameter("@LeftOn", DBNull.Value),
                new SqlParameter("@DoB", Convert.ToDateTime(student.DateOfBirth)),
                new SqlParameter("@SiteUser", false),
                new SqlParameter("@LastStat", DBNull.Value),
            };
            return para;
        }

        public static SqlCommand ExecuteTransaction(string Query, SqlParameter[] param,
                                   SqlConnection con, SqlTransaction Tran)
        {
            string Q = Query;
            SqlCommand cmd = new SqlCommand(Query, con, Tran);
            if (param != null)
            {
                foreach (SqlParameter p in param)
                {
                    cmd.Parameters.Add(p);
                }
            }
            return cmd;
        }
    }

    public class WhoIsWhereLists
    {
        static HashSet<Student4WhoWhere> stud;
        static HashSet<ApplicationType> applications;
        static HashSet<Partner> partners;
        static HashSet<Manager> managers;
        static HashSet<HRSupervisory> hrsupervisor;
        static List<PeriodOfCourse> periodofcourse;
        static HashSet<RegistrationInfo> registrationdetail;

        public static void AAddStudent(Student4WhoWhere stu)
        {
            if (stud == null)
            {
                GetClient();
            }
            stud.Add(stu);
        }

        public static void UpdateStudent(Student4WhoWhere stu)
        {
            if (stud == null)
            {
                GetClient();
            }
            var update = stud.Where(x => x.Id == stu.Id).First();
            update.JoinedOn = stu.JoinedOn;
            update.SiteUser = stu.SiteUser;
            update.Status = stu.Status;
            update.DepartmentId = stu.DepartmentId;
            if (stu.RegistrationNo != null)
            {
                update.RegistrationNo = stu.RegistrationNo;
            }
        }

        public static void AddToHrSupervisor(HRSupervisory sup)
        {
            if (stud == null)
            {
                GetClient();
            }
            hrsupervisor.Add(sup);
        }

        public static void UpdateHrSupervisory(HRSupervisory sup)
        {
            var emp = hrsupervisor.Where(x => x.Id == sup.Id).First();
            emp.DepartmentId = sup.DepartmentId;
            emp.From = sup.From;
            emp.ManagerId = sup.ManagerId;
            emp.PartnerId = sup.PartnerId;
            emp.StatusId = sup.StatusId;
            emp.To = sup.To;
        }

        public static void AddManager(Manager man)
        {
            if (managers == null)
            {
                GetClient();
            }
            managers.Add(man);
        }

        public static HashSet<HRSupervisory> HRSupervisor
        {
            get
            {
                if (stud == null)
                {
                    GetClient();
                    return hrsupervisor;
                }
                else
                {
                    return hrsupervisor;
                }
            }
        }

        public static HashSet<Manager> Managers
        {
            get
            {
                if (stud == null)
                {
                    GetClient();
                    return managers;
                }
                else
                {
                    return managers;
                }
            }
        }

        public static HashSet<Partner> Partners
        {
            get
            {
                if (stud == null)
                {
                    GetClient();
                    return partners;
                }
                else
                {
                    return partners;
                }
            }
        }

        public static HashSet<RegistrationInfo> RegistrationDetail
        {
            get
            {
                if (stud == null)
                {
                    GetClient();
                    return registrationdetail;
                }
                else
                {
                    return registrationdetail;
                }
            }
        }

        public static List<PeriodOfCourse> PeriodOfCourse
        {
            get
            {
                if (stud == null)
                {
                    GetClient();
                    return periodofcourse;
                }
                else
                {
                    return periodofcourse;
                }
            }
        }

        public static HashSet<ApplicationType> Applications
        {
            get
            {
                if (stud == null)
                {
                    GetClient();
                }
                return applications;
            }
        }

        public static HashSet<Student4WhoWhere> Students4WhoIsWhere
        {
            get
            {
                if (stud == null)
                {
                    GetClient();
                }
                return stud;
            }
        }

        

        private static void GetClient()
        {
            stud = new HashSet<Student4WhoWhere>();
            applications = new HashSet<ApplicationType>();
            partners = new HashSet<Partner>();
            managers = new HashSet<Manager>();
            hrsupervisor = new HashSet<HRSupervisory>();
            periodofcourse = new List<PeriodOfCourse>();
            registrationdetail = new HashSet<RegistrationInfo>();

            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = @"SELECT * FROM Student;
                             SELECT * FROM ApplicationType;
                             SELECT Id, PartnerId FROM HRSupervisory WHERE StatusId = @Id AND [To] IS Null;
                             SELECT * FROM HRSupervisory;
                             SELECT * FROM PeriodOfCourse;
                             SELECT * FROM StudentRegistration";

            int managerId = Lists4CV.Status.Where(x => x.Name == "Manager").Select(x => x.Id).First();

            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Id", managerId);
                    con.Open();
                    SqlDataReader rd = cmd.ExecuteReader();
                 
                    while (rd.Read())
                    {
                        Student4WhoWhere stu = new Student4WhoWhere();
                        stu.Id = Convert.ToInt32(rd["Id"]);
                        stu.Name = rd["Name"].ToString();
                        stu.RegistrationNo = rd["RegistrationNo"] == DBNull.Value ? string.Empty : rd["RegistrationNo"].ToString();
                        stu.Status = rd["Status"] == DBNull.Value ? string.Empty : rd["Status"].ToString();
                        stu.DepartmentId = rd["Department"] == DBNull.Value ? string.Empty : rd["Department"].ToString();
                        stu.AppliedOn = Convert.ToDateTime(rd["AppliedOn"]);
                        stu.JoinedOn = rd["JoinedOn"] == DBNull.Value ? Convert.ToDateTime("1/1/1905") : Convert.ToDateTime(rd["JoinedOn"]);
                        stu.LeftOn = rd["LeftOn"] == DBNull.Value ? Convert.ToDateTime("1/1/1905") : Convert.ToDateTime(rd["LeftOn"]);
                        stu.DoB = Convert.ToDateTime(rd["DoB"]);
                        stu.SiteUser = Convert.ToByte(rd["SiteUser"]);
                        stu.LastStatus = rd["LastStat"] == DBNull.Value ? 0 : Convert.ToInt32(rd["LastStat"]);
                        stud.Add(stu);
                    }
                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            ApplicationType at = new ApplicationType();
                            at.Id = Convert.ToInt32(rd["Id"]);
                            at.Type = rd["Type"].ToString();
                            applications.Add(at);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            Manager at = new Manager();
                            at.Id = Convert.ToInt32(rd["Id"]);
                            at.PartnerId = Convert.ToInt32(rd["PartnerId"]);
                            managers.Add(at);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            HRSupervisory at = new HRSupervisory();
                            at.Id = Convert.ToInt32(rd["Id"]);
                            at.PartnerId = Convert.ToInt32(rd["PartnerId"]);
                            at.ManagerId = rd["ManagerId"] == DBNull.Value ? 0 : Convert.ToInt32(rd["ManagerId"]);
                            at.DepartmentId = Convert.ToInt32(rd["DepartmentId"]);
                            at.StatusId = Convert.ToInt32(rd["StatusId"]);
                            at.From = Convert.ToDateTime(rd["From"]);
                            at.To = rd["To"] == DBNull.Value ? Convert.ToDateTime("1/1/1905") : Convert.ToDateTime(rd["To"]);
                            hrsupervisor.Add(at);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            PeriodOfCourse p = new PeriodOfCourse();
                            p.Id = Convert.ToInt32(rd["Id"]);
                            p.Years = Convert.ToDouble(rd["Years"]);
                            periodofcourse.Add(p);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            RegistrationInfo p = new RegistrationInfo();
                            p.Id = Convert.ToInt32(rd["Id"]);
                            p.Date = Convert.ToDateTime(rd["Date"]);
                            p.Period = rd["Period"] == DBNull.Value ? 0 : Convert.ToInt32(rd["Period"]);
                            registrationdetail.Add(p);
                        }
                    }
                }
            }

            foreach (var item in managers)
            {
                item.Name = stud.Where(x => x.Id == item.Id).Select(x => x.Name).First();
            }

            string partnerstat = Lists4CV.Status.Where(x => x.Name == "Partner").Select(x => x.Id).First().ToString();
            var parts = stud.Where(x => x.Status == partnerstat && x.LeftOn.Year == 1905);
            foreach (var item in parts)
            {
                Partner p = new Partner();
                p.Id = item.Id;
                p.Name = item.Name;
                partners.Add(p);
            }
        }

        public static string RejectApplicant(int id)
        {
            int statusCode = Lists4CV.Status.Where(x => x.Name == "Rejected").First().Id;
            string msg = "";
            string q4NewApplication = "UPDATE NewApplication SET Accepted = @Accepted WHERE Id = @Id";
            string q4Student = "UPDATE Student SET Status = @Status WHERE Id = @Id";
            SqlParameter[] para4NewApplication =
            {
                new SqlParameter("@Accepted", false),
                new SqlParameter("@Id", id)
            };
            SqlParameter[] para4Student =
            {
                new SqlParameter("@Status", statusCode),
                new SqlParameter("@Id", id)
            };

            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlTransaction Trans = con.BeginTransaction();
                try
                {
                    DBOperation.ExecuteTransaction(q4NewApplication, para4NewApplication, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4Student, para4Student, con, Trans).ExecuteNonQuery();
                    Students4WhoIsWhere.Where(x => x.Id == id).First().Status = statusCode.ToString();
                    Trans.Commit();
                    msg = "Updated";
                }
                catch (Exception ex)
                {
                    Trans.Rollback();
                    msg = ex.Message;
                }
            }
            return msg;
        }

        public static List<NewApplication> GetNewApplicants()
        {
            List<NewApplication> applications = new List<NewApplication>();
            List<NewApplicants> applicants = new List<NewApplicants>();

            int job = Lists4CV.Status.Where(x => x.Name == "Applicant for Job").Select(x => x.Id).First();
            int articleship = Lists4CV.Status.Where(x => x.Name == "Applicant for Articleship").Select(x => x.Id).First();

            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = @"SELECT * FROM NewApplication WHERE Accepted IS Null;
                             SELECT Id, Name, AppliedOn From Student WHERE Status IN (@Job, @Articleship)";

            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.Parameters.AddWithValue("@Job", job);
                    cmd.Parameters.AddWithValue("@Articleship", articleship);
                    SqlDataReader rd = cmd.ExecuteReader();

                    while (rd.Read())
                    {
                        NewApplication app = new NewApplication();
                        app.Id = Convert.ToInt32(rd["Id"]);
                        app.StatusId = Convert.ToInt32(rd["StatusId"]);
                        app.AppSubject = rd["AppSubject"].ToString();
                        app.AppBody = rd["AppBody"].ToString();
                        applications.Add(app);
                    }
                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            NewApplicants app = new NewApplicants();
                            app.Id = Convert.ToInt32(rd["Id"]);
                            app.Name = rd["Name"].ToString();
                            app.Date = Convert.ToDateTime(rd["AppliedOn"]);
                            applicants.Add(app);
                        }
                    }
                }
            }

            foreach (var item in applications)
            {
                item.Name = applicants.Where(x => x.Id == item.Id).Select(x => x.Name).First();
                item.Date = applicants.Where(x => x.Id == item.Id).Select(x => x.Date).First();
            }
            return applications;
        }

        public static StudentCV GetStudentCV(int studentId)
        {
            StudentCV scv = new StudentCV();
            scv.Education = new List<UniversityInfo>();
            scv.SubjectsOA = new List<SubjectsOfOA>();
            scv.CurrentJob = new CurrentPosition();
            scv.Experiences = new List<Experience>();
            scv.Reference = new List<ReferenceInfo>();
            scv.PartnerMembership = new List<PartnerMembership>();
            scv.PartnerCurrentPosition = new List<PartnerCurrentPosition>();
            scv.PartnerPastPosition = new List<PartnerPastPosition>();

            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = @"SELECT * FROM Student WHERE Id = @Id;
                             SELECT * FROM StudentDetail WHERE Id = @Id;
                             SELECT * From StudentEducation WHERE Id = @Id;
                             SELECT * FROM StudentOAEducation WHERE Id = @Id;
                             SELECT * FROM Reference WHERE Id = @Id;
                             SELECT * FROM CurrentPosition WHERE Id = @Id; 
                             SELECT * FROM PastPosition WHERE Id = @Id;
                             SELECT * FROM PartnerMembership WHERE Id = @Id;
                             SELECT * FROM PartnerCurrentPosition WHERE Id = @Id;
                             SELECT * FROM PartnerPastPosition WHERE Id = @Id;
                             SELECT * FROM StudentRegistration WHERE Id = @Id";
            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.Parameters.AddWithValue("@Id", studentId);
                    SqlDataReader rd = cmd.ExecuteReader();

                    while (rd.Read())
                    {
                        scv.Id = Convert.ToInt32(rd["Id"]);
                        scv.Name = rd["Name"].ToString();
                        scv.RegistrationNo = rd["RegistrationNo"] == DBNull.Value ? null : rd["RegistrationNo"].ToString();
                        scv.Status = rd["Status"] == DBNull.Value ? null : rd["Status"].ToString();
                        scv.AppliedOn = rd["AppliedOn"] == DBNull.Value ? Convert.ToDateTime("01/01/1905") : Convert.ToDateTime(rd["AppliedOn"]);
                        scv.JoinedOn = rd["JoinedOn"] == DBNull.Value ? Convert.ToDateTime("01/01/1905") : Convert.ToDateTime(rd["JoinedOn"]);
                        scv.LeftOn = rd["LeftOn"] == DBNull.Value ? Convert.ToDateTime("01/01/1905") : Convert.ToDateTime(rd["LeftOn"]);
                        scv.DateOfBirth = Convert.ToDateTime(rd["DoB"]);
                        scv.LastStatus = rd["LastStat"] == DBNull.Value ? 0 : Convert.ToInt32(rd["LastStat"]);
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            scv.FatherName = rd["FatherName"].ToString();
                            scv.MotherName = rd["MotherName"].ToString();
                            scv.Religion = rd["Religion"].ToString();
                            scv.Gender = Convert.ToBoolean(rd["Gender"]) == true ? "Male" : "Female";
                            scv.MaritalStatus = rd["MaritalStatus"].ToString();
                            scv.Nationality = rd["Nationality"].ToString();
                            scv.Blood = rd["Blood"].ToString();
                            scv.ContactNo = rd["ContactNo"].ToString();
                            scv.Email = rd["Email"] == DBNull.Value ? null : rd["Email"].ToString();
                            scv.PresentAddress = rd["PresentAddress"].ToString();
                            scv.PermanentAddress = rd["PermanentAddress"].ToString();
                            scv.EmergencyContactNo = rd["EmergencyContactNo"].ToString();
                            scv.RelationWithEmergencyContact = rd["RelationWithEmergencyContact"].ToString();
                            scv.Objective = rd["Objective"].ToString();
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            UniversityInfo ui = new UniversityInfo();
                            ui.Title = rd["Title"].ToString();
                            ui.Type = rd["Type"] == DBNull.Value ? null : rd["Type"].ToString();
                            ui.University = rd["BoardUniversity"].ToString();
                            ui.Institute = rd["Institute"].ToString();
                            ui.YearOfPass = rd["YearOfPass"].ToString();
                            ui.CGPA = rd["CGPA"].ToString();
                            ui.Major = rd["Major"] == DBNull.Value ? null : rd["Major"].ToString();
                            scv.Education.Add(ui);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            SubjectsOfOA soa = new SubjectsOfOA();
                            soa.Level = rd["Level"].ToString();
                            soa.Name = rd["Subject"].ToString();
                            soa.Grade = rd["Grade"].ToString();
                            scv.SubjectsOA.Add(soa);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            ReferenceInfo reference = new ReferenceInfo();
                            reference.Name = rd["Name"].ToString();
                            reference.Designation = rd["Designation"].ToString();
                            reference.Organisation = rd["Organisation"].ToString();
                            reference.ContactNo = rd["ContactNo"].ToString();
                            reference.Relation = rd["Relation"].ToString();
                            scv.Reference.Add(reference);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            scv.CurrentJob.Position = rd["Position"].ToString();
                            scv.CurrentJob.Organisation = rd["Organisation"].ToString();
                            scv.CurrentJob.From = Convert.ToDateTime(rd["From"]);
                            scv.CurrentJob.Responsibilities = rd["Responsibilities"].ToString();
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            Experience ep = new Experience();
                            ep.Position = rd["Position"].ToString();
                            ep.Organisation = rd["Organisation"].ToString();
                            ep.From = Convert.ToDateTime(rd["From"]);
                            ep.To = Convert.ToDateTime(rd["To"]);
                            ep.Responsibilities = rd["Responsibilities"].ToString();
                            scv.Experiences.Add(ep);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            PartnerMembership ep = new PartnerMembership();
                            ep.Id = rd["MemberId"].ToString();
                            ep.Organisation = rd["OrgId"].ToString();
                            scv.PartnerMembership.Add(ep);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            PartnerCurrentPosition ep = new PartnerCurrentPosition();
                            ep.Position = rd["Position"].ToString();
                            ep.Organisation = rd["Organisation"].ToString();
                            ep.From = Convert.ToDateTime(rd["From"]);
                            scv.PartnerCurrentPosition.Add(ep);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            PartnerPastPosition ep = new PartnerPastPosition();
                            ep.Position = rd["Position"].ToString();
                            ep.Organisation = rd["Organisation"].ToString();
                            ep.From = Convert.ToDateTime(rd["From"]);
                            ep.To = Convert.ToDateTime(rd["To"]);
                            scv.PartnerPastPosition.Add(ep);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            RegistrationInfo ep = new RegistrationInfo();
                            ep.Id = Convert.ToInt32(rd["Id"]);
                            ep.Date = Convert.ToDateTime(rd["Date"]);
                            ep.Period = rd["Period"] == DBNull.Value ? 0 : Convert.ToInt32(rd["Period"]);
                            scv.Registration = ep;
                        }
                    }
                }
            }

            return scv;
        }

    }

    public class Employee
    {
        public string UpdatePartnerInfo(Users u, JoinedPartnerUpdateInfo j)
        {
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string q4UserTable = "INSERT INTO UserTable VALUES(@StudentId, @Name, @Password, @Role, @Retry, @Status)";
            string q4Student = "UPDATE Student SET JoinedOn = @Date, SiteUser = 1 WHERE Id = @Id";
            string msg = "";
            SiteUser.Users.Count();

            SqlParameter[] para4UserTable = 
            {
                new SqlParameter("@StudentId", u.StudentId),
                new SqlParameter("@Name", u.UserName),
                new SqlParameter("@Password", u.Password),
                new SqlParameter("@Role", u.Role),
                new SqlParameter("@Retry", u.Retry),
                new SqlParameter("@Status", DBNull.Value)
            };

            SqlParameter[] para4Student =
            {
                new SqlParameter("@Date", j.JoiningDate),
                new SqlParameter("@Id", j.PartnerId)
            };

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlTransaction Trans = con.BeginTransaction();
                try
                {
                    DBOperation.ExecuteTransaction(q4UserTable, para4UserTable, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4Student, para4Student, con, Trans).ExecuteNonQuery();

                    var part = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == j.PartnerId).First();
                    part.JoinedOn = j.JoiningDate;
                    part.SiteUser = Convert.ToByte(1);
                    
                    Users user = new Users();
                    user.StudentId = u.StudentId;
                    user.UserName = u.UserName;
                    user.Password = u.Password;
                    user.Retry = (short)u.Retry;
                    user.Role = u.Role;
                    user.Status = string.Empty;
                    SiteUser.AddUserOnJoin(user);

                    //WhoIsWhereLists.Students4WhoIsWhere.Where(x=>x.Id == part.)
                    //Partner p = new Partner();
                    //p.Id = part.Id;
                    //p.Name = part.Name;
                    //WhoIsWhereLists.Partners.Add(p);
                    msg = "Updated";
                    Trans.Commit();
                }
                catch (Exception ex)
                {
                    Trans.Rollback();
                    msg = ex.Message;
                }
            }
            return msg;
        }

        public static ApplicationType AddApplicationSubject(UniversityName appSub)
        {
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = "INSERT INTO ApplicationType VALUES(@Id, @Type)";
            int appId = WhoIsWhereLists.Applications.Max(x => x.Id) + 1;
            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.Parameters.AddWithValue("@Id", appId);
                    cmd.Parameters.AddWithValue("@Type", appSub.Name);
                    cmd.ExecuteNonQuery();
                }
            }
            ApplicationType at = new ApplicationType();
            at.Id = appId;
            at.Type = appSub.Name;
            WhoIsWhereLists.Applications.Add(at);
            return at;
        }

        public static StudentAppRecovereds AllApplications(int id)
        {
            StudentAppRecovereds apps = new StudentAppRecovereds();
            apps.Applications = new List<RegularApplication>();

            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = @"SELECT * FROM NewApplication WHERE ID = @Id;
                             SELECT * FROM JoiningLetter WHERE Id = @Id;
                             SELECT * FROM StudentApplication WHERE StudentId = @Id";

            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Id", id);
                    con.Open();
                    SqlDataReader rd = cmd.ExecuteReader();
                    while (rd.Read())
                    {
                        NewApplication newApp = new NewApplication();
                        newApp.AppSubject = rd["AppSubject"].ToString();
                        newApp.AppBody = rd["AppBody"].ToString();
                        newApp.StatusId = Convert.ToInt32(rd["StatusId"]);
                        newApp.Date = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == id).Select(x => x.AppliedOn).First();
                        apps.FirstApplication = newApp;
                    }
                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            JoiningLetter let = new JoiningLetter();
                            let.PartnerId = Convert.ToInt32(rd["PartnerId"]);
                            let.AppSubject = rd["AppSubject"].ToString();
                            let.AppBody = rd["AppBody"].ToString();
                            let.Date = Convert.ToDateTime(rd["Date"]);
                            apps.Joining = let;
                        }
                    }
                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            RegularApplication regApp = new RegularApplication();
                            
                            regApp.Sl = Convert.ToInt32(rd["Sl"]);
                            regApp.PartnerId = Convert.ToInt32(rd["PartnerId"]);
                            regApp.Date = Convert.ToDateTime(rd["Date"]);
                            regApp.AppTypeId = Convert.ToInt32(rd["ApplicationTypeId"]);
                            regApp.AppBody = rd["ApplicationBody"].ToString();
                            if(rd["Accepted"] == DBNull.Value)
                            {
                                regApp.Accepted = null;
                            }
                            else
                            {
                                regApp.Accepted = Convert.ToBoolean(rd["Accepted"]);
                            }
                            apps.Applications.Add(regApp);
                        }
                    }
                }
            }
            return apps;
        }

        public string UpdateAppNote(int reviewersId, int serialOfApp, string note, bool accepted)
        {
            string msg, query; msg = query = "";
            string status = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == reviewersId).Select(x => x.Status).First();
            var who = Lists4CV.Status.Where(x => x.Id.ToString() == status).Select(x => x.Name).First();

            if (who == "Partner")
            {
                query = "UPDATE StudentApplication SET PartnerNote = @Note, Accepted = @Accepted WHERE Sl = @Sl";
            }
            else if (who == "Manager")
            {
                query = "UPDATE StudentApplication SET ManagerNote = @Note WHERE Sl = @Sl";
            }
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@Sl", serialOfApp);
                        cmd.Parameters.AddWithValue("@Note", note);
                        if(who == "Partner")
                        {
                            cmd.Parameters.AddWithValue("@Accepted", accepted);
                        }
                        con.Open();
                        cmd.ExecuteNonQuery();
                    }
                }
                msg = "Updated";
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }

        public string UpdateOnAppReview(int reviewersId, int serialOfApp)
        {
            string msg, query; msg = query = "";
            string status = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == reviewersId).Select(x => x.Status).First();
            var who = Lists4CV.Status.Where(x => x.Id.ToString() == status).Select(x => x.Name).First();

            if (who == "Partner")
            {
                query = "UPDATE StudentApplication SET PartnerReview = 1 WHERE Sl = @Sl";
            }
            else if (who == "Manager")
            {
                query = "UPDATE StudentApplication SET ManagerReview = 1 WHERE Sl = @Sl";
            }
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            try
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@Sl", serialOfApp);
                        con.Open();
                        cmd.ExecuteNonQuery();
                    }
                }
                msg = "Updated";
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }

        public static List<RegularApplication> MyApplications(int reviewersId)
        {
            string query = "";
            string status = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == reviewersId).Select(x => x.Status).First();
            var who = Lists4CV.Status.Where(x => x.Id.ToString() == status).Select(x => x.Name).First();
            List<RegularApplication> apps = new List<RegularApplication>();
            query = "SELECT * FROM StudentApplication WHERE StudentId = @Id";
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;

            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Id", reviewersId);
                    con.Open();
                    SqlDataReader rd = cmd.ExecuteReader();
                    while (rd.Read())
                    {
                        RegularApplication app = new RegularApplication();
                        app.Sl = Convert.ToInt32(rd["Sl"]);
                        app.Id = Convert.ToInt32(rd["StudentId"]);
                        app.ManagerId = rd["ManagerId"] == DBNull.Value ? 0 : Convert.ToInt32(rd["ManagerId"]);
                        app.PartnerId = Convert.ToInt32(rd["PartnerId"]);
                        app.AppTypeId = Convert.ToInt32(rd["ApplicationTypeId"]);
                        app.AppBody = rd["ApplicationBody"].ToString();
                        app.Date = Convert.ToDateTime(rd["Date"]);
                        app.ManagerNote = rd["ManagerNote"] == DBNull.Value ? string.Empty : rd["ManagerNote"].ToString();
                        app.PartnerNote = rd["PartnerNote"] == DBNull.Value ? string.Empty : rd["PartnerNote"].ToString();
                        app.StudentReview = Convert.ToBoolean(rd["StudentReview"]);
                        app.ManagerReview = Convert.ToBoolean(rd["ManagerReview"]);
                        app.PartnerReview = Convert.ToBoolean(rd["PartnerReview"]);
                        if (rd["Accepted"] == DBNull.Value)
                        {
                            app.Accepted = null;
                        }
                        else
                        {
                            app.Accepted = Convert.ToBoolean(rd["Accepted"]);
                        }
                        apps.Add(app);
                    }
                }
            }
            return apps;
        }

        public static List<RegularApplication> Applications(int reviewersId)
        {
            string query = "";
            string status = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == reviewersId).Select(x => x.Status).First();
            var who = Lists4CV.Status.Where(x => x.Id.ToString() == status).Select(x => x.Name).First();
            List<RegularApplication> apps = new List<RegularApplication>();

            if (who == "Partner")
            {
                query = "SELECT * FROM StudentApplication WHERE PartnerId = @Id";
            }
            else if (who == "Manager")
            {
                query = "SELECT * FROM StudentApplication WHERE ManagerId = @Id";
            }
            else
            {
                query = "SELECT * FROM StudentApplication WHERE StudentId = @Id";
            }

            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;

            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Id", reviewersId);
                    con.Open();
                    try
                    {
                        SqlDataReader rd = cmd.ExecuteReader();
                        while (rd.Read())
                        {
                            RegularApplication app = new RegularApplication();
                            app.Sl = Convert.ToInt32(rd["Sl"]);
                            app.Id = Convert.ToInt32(rd["StudentId"]);
                            app.ManagerId = rd["ManagerId"] == DBNull.Value ? 0 : Convert.ToInt32(rd["ManagerId"]);
                            app.PartnerId = Convert.ToInt32(rd["PartnerId"]);
                            app.AppTypeId = Convert.ToInt32(rd["ApplicationTypeId"]);
                            app.AppBody = rd["ApplicationBody"].ToString();
                            app.Date = Convert.ToDateTime(rd["Date"]);
                            app.ManagerNote = rd["ManagerNote"] == DBNull.Value ? string.Empty : rd["ManagerNote"].ToString();
                            app.PartnerNote = rd["PartnerNote"] == DBNull.Value ? string.Empty : rd["PartnerNote"].ToString();
                            app.StudentReview = Convert.ToBoolean(rd["StudentReview"]);
                            app.ManagerReview = Convert.ToBoolean(rd["ManagerReview"]);
                            app.PartnerReview = Convert.ToBoolean(rd["PartnerReview"]);
                            if (rd["Accepted"] == DBNull.Value)
                            {
                                app.Accepted = null;
                            }
                            else
                            {
                                app.Accepted = Convert.ToBoolean(rd["Accepted"]);
                            }
                            apps.Add(app);
                        }
                    }
                    catch(Exception ex)
                    {
                        var msg = ex.Message;
                    }
                    
                    
                }
            }
            return apps;
        }

        public static List<RegularApplication> OthersApplications(int reviewersId)
        {
            string query = "";
            string status = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == reviewersId).Select(x => x.Status).First();
            var who = Lists4CV.Status.Where(x => x.Id.ToString() == status).Select(x => x.Name).First();
            List<RegularApplication> apps = new List<RegularApplication>();

            if (who == "Partner")
            {
                query = "SELECT * FROM StudentApplication WHERE PartnerId != @Id";
            }
            else if (who == "Manager")
            {
                query = "SELECT * FROM StudentApplication WHERE ManagerId != @Id";
            }
            else
            {
                query = "SELECT * FROM StudentApplication WHERE StudentId != @Id";
            }

            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;

            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Id", reviewersId);
                    con.Open();
                    SqlDataReader rd = cmd.ExecuteReader();
                    while (rd.Read())
                    {
                        RegularApplication app = new RegularApplication();
                        app.Sl = Convert.ToInt32(rd["Sl"]);
                        app.Id = Convert.ToInt32(rd["StudentId"]);
                        app.ManagerId = rd["ManagerId"] == DBNull.Value ? 0 : Convert.ToInt32(rd["ManagerId"]);
                        app.PartnerId = Convert.ToInt32(rd["PartnerId"]);
                        app.AppTypeId = Convert.ToInt32(rd["ApplicationTypeId"]);
                        app.AppBody = rd["ApplicationBody"].ToString();
                        app.Date = Convert.ToDateTime(rd["Date"]);
                        app.ManagerNote = rd["ManagerNote"] == DBNull.Value ? string.Empty : rd["ManagerNote"].ToString();
                        app.PartnerNote = rd["PartnerNote"] == DBNull.Value ? string.Empty : rd["PartnerNote"].ToString();
                        app.StudentReview = Convert.ToBoolean(rd["StudentReview"]);
                        app.ManagerReview = Convert.ToBoolean(rd["ManagerReview"]);
                        app.PartnerReview = Convert.ToBoolean(rd["PartnerReview"]);
                        if (rd["Accepted"] == DBNull.Value)
                        {
                            app.Accepted = null;
                        }
                        else
                        {
                            app.Accepted = Convert.ToBoolean(rd["Accepted"]);
                        }
                        apps.Add(app);
                    }
                }
            }
            return apps;
        }

        public static List<Student4WhoWhere> GetYourStaffs(int id)
        {
            List<Student4WhoWhere> list = new List<Student4WhoWhere>();
            var whoRequest = Convert.ToInt32(WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == id).First().Status);

            var partner = Lists4CV.Status.Where(x => x.Name == "Partner").First().Id;
            var manager = Lists4CV.Status.Where(x => x.Name == "Manager").First().Id;
            IEnumerable<int> manpower = null;
            if(whoRequest == partner)
            {
                manpower = WhoIsWhereLists.HRSupervisor.Where(x => x.PartnerId == id && x.To.Year == 1905)
                                                       .Select(x => x.Id).Distinct();
            }
            else if(whoRequest == manager)
            {
                manpower = WhoIsWhereLists.HRSupervisor.Where(x => x.ManagerId == id && x.To.Year == 1905)
                                                       .Select(x => x.Id).Distinct();
            }
         
            foreach (var item in manpower)
            {
                list.Add(WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == item).First());
            }
            return list;
        }

        public static List<Student4WhoWhere> GetOthersStaffs(int id)
        {
            List<Student4WhoWhere> list = new List<Student4WhoWhere>();
            var whoRequest = Convert.ToInt32(WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == id).First().Status);

            var partner = Lists4CV.Status.Where(x => x.Name == "Partner").First().Id;
            var manager = Lists4CV.Status.Where(x => x.Name == "Manager").First().Id;
            IEnumerable<int> manpower = null;
            if (whoRequest == partner)
            {
                manpower = WhoIsWhereLists.HRSupervisor.Where(x => x.PartnerId != id && x.To.Year == 1905)
                                                       .Select(x => x.Id).Distinct();
            }
            else if (whoRequest == manager)
            {
                manpower = WhoIsWhereLists.HRSupervisor.Where(x => x.ManagerId != id && x.To.Year == 1905)
                                                       .Select(x => x.Id).Distinct();
            }

            foreach (var item in manpower)
            {
                list.Add(WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == item).First());
            }
            return list;
        }

        public string SubmitApplication(RegularApplication regApp)
        {
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = @"INSERT INTO StudentApplication VALUES(@StudentId, @ManagerId, @PartnerId, 
                             @ApplicationTypeId, @ApplicationBody, @Date, @ManagerNote, @PartnerNote, 
                             @StudentReview, @ManagerReview, @PartnerReview, @Accepted)";
            string msg = "";

            try
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        cmd.Parameters.AddWithValue("@StudentId", regApp.Id);
                        if (regApp.ManagerId == 0)
                        {
                            cmd.Parameters.AddWithValue("@ManagerId", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@ManagerId", regApp.ManagerId);
                        }                   
                        cmd.Parameters.AddWithValue("@PartnerId", regApp.PartnerId);
                        cmd.Parameters.AddWithValue("@ApplicationTypeId", regApp.AppTypeId);
                        cmd.Parameters.AddWithValue("@ApplicationBody", regApp.AppBody);
                        cmd.Parameters.AddWithValue("@Date", regApp.Date);
                        cmd.Parameters.AddWithValue("@ManagerNote", DBNull.Value);
                        cmd.Parameters.AddWithValue("@PartnerNote", DBNull.Value);
                        cmd.Parameters.AddWithValue("@StudentReview", regApp.StudentReview);
                        cmd.Parameters.AddWithValue("@ManagerReview", regApp.ManagerReview);
                        cmd.Parameters.AddWithValue("@PartnerReview", regApp.PartnerReview);
                        if(regApp.Accepted == null)
                        {
                            cmd.Parameters.AddWithValue("@Accepted", DBNull.Value);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@Accepted", regApp.Accepted);
                        }

                        con.Open();
                        cmd.ExecuteNonQuery();
                    }
                }
                msg = "Inserted";
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }

        public string Join(EmployeeJoining employee)
        {
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string q4HRSupervisory = "INSERT INTO HRSupervisory VALUES(@Id, @PartnerId, @ManagerId, @DepartmentId, @StatusId, @From, @To)";
            string q4UserTable = "INSERT INTO UserTable VALUES(@StudentId, @Name, @Password, @Role, @Retry, @Status)";
            string q4Student = "UPDATE Student SET [Status] = @StatId, Department = @DeptId, JoinedOn = @Date, SiteUser = 1 WHERE Id = @Id";
            string q4NewApplication = "UPDATE NewApplication SET Accepted = @Accepted  WHERE Id = @Id";
            string msg = "";

            SiteUser.Users.Count();

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlTransaction Trans = con.BeginTransaction();
                try
                {
                    DBOperation.ExecuteTransaction(q4HRSupervisory, Para4HRSupervisory(employee), con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4UserTable, Para4UserTable(employee), con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4Student, Para4Student(employee), con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4NewApplication, Para4NewApplication(employee), con, Trans).ExecuteNonQuery();

                    Student4WhoWhere stu = new Student4WhoWhere();
                    stu.Id = employee.EmployeeId;
                    stu.JoinedOn = employee.Date;
                    stu.SiteUser = Convert.ToByte(1);
                    stu.Status = employee.StatusId.ToString();
                    stu.DepartmentId = employee.DepartmentId.ToString();
                    WhoIsWhereLists.UpdateStudent(stu);

                    HRSupervisory sup = new HRSupervisory();
                    sup.Id = employee.EmployeeId;
                    sup.PartnerId = employee.PartnerId;
                    sup.ManagerId = employee.ManagerId;
                    sup.StatusId = employee.StatusId;
                    sup.From = employee.Date;
                    sup.To = Convert.ToDateTime("1/1/1905");
                    WhoIsWhereLists.AddToHrSupervisor(sup);

                    Users user = new Users();
                    user.StudentId = employee.EmployeeId;
                    user.UserName = employee.UserName;
                    user.Password = employee.Password;
                    user.Retry = (short)employee.Retry;
                    user.Role = employee.Role;
                    user.Status = string.Empty;
                    SiteUser.AddUserOnJoin(user);

                    msg = "Inserted";
                    Trans.Commit();
                }
                catch (Exception ex)
                {
                    Trans.Rollback();
                    msg = ex.Message;
                }
            }
            return msg;
        }

        public SqlParameter[] Para4Transfer4mOldManager(HRSupervisory sup)
        {
            SqlParameter[] para =
            {
                new SqlParameter("@To", DateTime.Now.Date),
                new SqlParameter("@Id", sup.Id)
            };
            return para;
        }

        public SqlParameter[] Para4Transfer2NewManager(HRSupervisory sup, TransferInfo info)
        {
            SqlParameter[] para =
            {
                new SqlParameter("@Id", sup.Id),
                new SqlParameter("@PartnerId", sup.PartnerId),
                new SqlParameter("@ManagerId", info.NewSup),
                new SqlParameter("@DepartmentId", sup.DepartmentId),
                new SqlParameter("@StatusId", sup.StatusId),
                new SqlParameter("@From", DateTime.Now.Date),
                new SqlParameter("@To", DBNull.Value),
            };
            return para;
        }

        public SqlParameter[] Para4OldPartner(HRSupervisory sup)
        {
            SqlParameter[] para =
           {
                new SqlParameter("@To", DateTime.Now.Date),
                new SqlParameter("@Id", sup.Id)
            };
            return para;
        }

        public SqlParameter[] Para4NewPartner(HRSupervisory sup, AllStudentTransferInfo info)
        {
            SqlParameter[] para =
            {
                new SqlParameter("@Id", sup.Id),
                new SqlParameter("@PartnerId", info.NewPartner),
                new SqlParameter("@ManagerId", info.NewManager),
                new SqlParameter("@DepartmentId", sup.DepartmentId),
                new SqlParameter("@StatusId", sup.StatusId),
                new SqlParameter("@From", DateTime.Now.Date),
                new SqlParameter("@To", DBNull.Value),
            };
            return para;
        }

        public SqlParameter[] Para4NewPartner2(HRSupervisory sup, TransferInfo info)
        {
            SqlParameter[] para =
            {
                new SqlParameter("@Id", sup.Id),
                new SqlParameter("@PartnerId", info.NewSup),
                new SqlParameter("@ManagerId", DBNull.Value),
                new SqlParameter("@DepartmentId", sup.DepartmentId),
                new SqlParameter("@StatusId", sup.StatusId),
                new SqlParameter("@From", DateTime.Now.Date),
                new SqlParameter("@To", DBNull.Value),
            };
            return para;
        }

        public string TransferAllStudents(AllStudentTransferInfo info)
        {
            var students = WhoIsWhereLists.HRSupervisor.Where(x => x.PartnerId == info.OldPartner && 
                                                                   x.ManagerId != 0 && x.To.Year == 1905);
            string cs, q4HrSupervisory1, q4HrSupervisory2, msg;
            cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            q4HrSupervisory1 = "UPDATE HRSupervisory SET [To] = @To WHERE Id = @Id AND [To] IS NULL";
            q4HrSupervisory2 = "INSERT INTO HRSupervisory VALUES(@Id, @PartnerId, @ManagerId, @DepartmentId, @StatusId, @From, @To)";
            
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlTransaction Trans = con.BeginTransaction();
                try
                {
                    foreach (var item in students)
                    {
                        DBOperation.ExecuteTransaction(q4HrSupervisory1, Para4OldPartner(item), con, Trans).ExecuteNonQuery();
                        DBOperation.ExecuteTransaction(q4HrSupervisory2, Para4NewPartner(item, info), con, Trans).ExecuteNonQuery();
                        item.To = DateTime.Now.Date;
                        HRSupervisory newSup = new HRSupervisory
                        {
                            Id = item.Id,
                            PartnerId = info.NewPartner,
                            ManagerId = info.NewManager,
                            DepartmentId = item.DepartmentId,
                            StatusId = item.StatusId,
                            From = DateTime.Now.Date,
                            To = Convert.ToDateTime("1/1/1905")
                        };
                        WhoIsWhereLists.UpdateHrSupervisory(newSup);
                    }
                    msg = "Updated";
                    Trans.Commit();
                }
                catch (Exception ex)
                {
                    Trans.Rollback();
                    msg = ex.Message;
                }
            }
            return msg;
        }

        public string TransferAllEmployees(TransferInfo info)
        {
            var students = WhoIsWhereLists.HRSupervisor.Where(x => x.PartnerId == info.OldSup &&
                                                                   x.ManagerId == 0 && x.To.Year == 1905);
            string cs, q4HrSupervisory1, q4HrSupervisory2, msg;
            cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            q4HrSupervisory1 = "UPDATE HRSupervisory SET [To] = @To WHERE Id = @Id AND [To] IS NULL";
            q4HrSupervisory2 = "INSERT INTO HRSupervisory VALUES(@Id, @PartnerId, @ManagerId, @DepartmentId, @StatusId, @From, @To)";

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlTransaction Trans = con.BeginTransaction();
                try
                {
                    foreach (var item in students)
                    {
                        DBOperation.ExecuteTransaction(q4HrSupervisory1, Para4OldPartner(item), con, Trans).ExecuteNonQuery();
                        DBOperation.ExecuteTransaction(q4HrSupervisory2, Para4NewPartner2(item, info), con, Trans).ExecuteNonQuery();
                        item.To = DateTime.Now.Date;
                        HRSupervisory newSup = new HRSupervisory
                        {
                            Id = item.Id,
                            PartnerId = info.NewSup,
                            ManagerId = 0,
                            DepartmentId = item.DepartmentId,
                            StatusId = item.StatusId,
                            From = DateTime.Now.Date,
                            To = Convert.ToDateTime("1/1/1905")
                        };
                        WhoIsWhereLists.UpdateHrSupervisory(newSup);
                    }
                    msg = "Updated";
                    Trans.Commit();
                }
                catch (Exception ex)
                {
                    Trans.Rollback();
                    msg = ex.Message;
                }
            }
            return msg;
        }

        public string Transfer(TransferInfo info)
        {
            var students = WhoIsWhereLists.HRSupervisor.Where(x => x.ManagerId == info.OldSup && x.To.Year == 1905);
            string cs, q4HrSupervisory1, q4HrSupervisory2, msg;
            cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            q4HrSupervisory1 = "UPDATE HRSupervisory SET [To] = @To WHERE Id = @Id AND [To] IS NULL";
            q4HrSupervisory2 = "INSERT INTO HRSupervisory VALUES(@Id, @PartnerId, @ManagerId, @DepartmentId, @StatusId, @From, @To)";

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlTransaction Trans = con.BeginTransaction();
                try
                {
                    foreach (var item in students)
                    {
                        DBOperation.ExecuteTransaction(q4HrSupervisory1, Para4Transfer4mOldManager(item), con, Trans).ExecuteNonQuery();
                        DBOperation.ExecuteTransaction(q4HrSupervisory2, Para4Transfer2NewManager(item, info), con, Trans).ExecuteNonQuery();
                        item.To = DateTime.Now.Date;
                        HRSupervisory newSup = new HRSupervisory
                        {
                            Id = item.Id,
                            PartnerId = item.PartnerId,
                            ManagerId = info.NewSup,
                            DepartmentId = item.DepartmentId,
                            StatusId = item.StatusId,
                            From = DateTime.Now.Date,
                            To = Convert.ToDateTime("1/1/1905")
                        };
                        WhoIsWhereLists.UpdateHrSupervisory(newSup);
                    }
                    msg = "Updated";
                    Trans.Commit();
                }
                catch (Exception ex)
                {
                    Trans.Rollback();
                    msg = ex.Message;
                }
            }
            return msg;
        }

        public string TransferAStudent(HRSupervisory sup)
        {
            string cs, q4HrSupervisory1, q4HrSupervisory2, msg;
            cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            q4HrSupervisory1 = "UPDATE HRSupervisory SET [To] = @To WHERE Id = @Id AND [To] IS NULL";
            q4HrSupervisory2 = "INSERT INTO HRSupervisory VALUES(@Id, @PartnerId, @ManagerId, @DepartmentId, @StatusId, @From, @To)";

            var oldHistory = WhoIsWhereLists.HRSupervisor.Where(x => x.Id == sup.Id && x.To.Year == 1905).First();

            SqlParameter[] para4HrSupervisory1 =
            {
                new SqlParameter("@To", DateTime.Now.Date),
                new SqlParameter("@Id", sup.Id)
            };
            SqlParameter[] para4HrSupervisory2 =
            {
                new SqlParameter("@Id", sup.Id),
                new SqlParameter("@PartnerId", sup.PartnerId),
                new SqlParameter("@ManagerId", sup.ManagerId),
                new SqlParameter("@DepartmentId", sup.DepartmentId),
                new SqlParameter("@StatusId", sup.StatusId),
                new SqlParameter("@From", DateTime.Now.Date),
                new SqlParameter("@To", DBNull.Value),
            };

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlTransaction Trans = con.BeginTransaction();
                try
                {
                    DBOperation.ExecuteTransaction(q4HrSupervisory1, para4HrSupervisory1, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4HrSupervisory2, para4HrSupervisory2, con, Trans).ExecuteNonQuery();
                    WhoIsWhereLists.AddToHrSupervisor(sup);
                    oldHistory.To = DateTime.Now.Date;
                    msg = "Updated";
                    Trans.Commit();
                }
                catch (Exception ex)
                {
                    msg = ex.Message;
                    Trans.Rollback();
                }
            }
            return msg;
        }

        //CourseCompleted and Promote are almost same
        public static string Promote(HRSupervisory sup)
        {
            string cs, q4HrSupervisory1, q4HrSupervisory2, q4Student, q4Usertable, msg;

            q4HrSupervisory1 = "UPDATE HRSupervisory SET [To] = @To WHERE Id = @Id AND [To] IS NULL";
            q4HrSupervisory2 = "INSERT INTO HRSupervisory VALUES(@Id, @PartnerId, @ManagerId, @DepartmentId, @StatusId, @From, @To)";
            q4Student = "UPDATE Student SET Status = @StatusId WHERE Id = @Id";
            q4Usertable = "UPDATE UserTable SET [Role] = @Role WHERE StudentId = @Id";

            HRSupervisory currentSup = WhoIsWhereLists.HRSupervisor.Where(x => x.Id == sup.Id && x.To.Year == 1905).First();
            int managerId = Lists4CV.Status.Where(x => x.Name == "Manager").First().Id;

            HRSupervisory newSup = new HRSupervisory
            {
                Id = sup.Id,
                ManagerId = 0,
                PartnerId = sup.PartnerId,
                StatusId = sup.StatusId,
                DepartmentId = sup.DepartmentId,
                From = DateTime.Now.Date,
                To = Convert.ToDateTime("1/1/1905"),
            };
            SqlParameter[] para4HrSupervisory1 =
            {
                new SqlParameter("@To", DateTime.Now.Date),
                new SqlParameter("@Id", sup.Id)
            };
            SqlParameter[] para4HrSupervisory2 =
            {
                new SqlParameter("@Id", sup.Id),
                new SqlParameter("@PartnerId", sup.PartnerId),
                new SqlParameter("@ManagerId", DBNull.Value),
                new SqlParameter("@DepartmentId", sup.DepartmentId),
                new SqlParameter("@StatusId", sup.StatusId),
                new SqlParameter("@From", DateTime.Now.Date),
                new SqlParameter("@To", DBNull.Value),
            };
            SqlParameter[] para4Student =
            {
                new SqlParameter("@StatusId", sup.StatusId),
                new SqlParameter("@Id", sup.Id)
            };
            SqlParameter[] para4UserTable =
            {
                new SqlParameter("@Role", "Manager"),
                new SqlParameter("@Id", sup.Id)
            };

            cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlTransaction Trans = con.BeginTransaction();
                try
                {
                    DBOperation.ExecuteTransaction(q4HrSupervisory1, para4HrSupervisory1, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4HrSupervisory2, para4HrSupervisory2, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4Student, para4Student, con, Trans).ExecuteNonQuery();

                    WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == sup.Id).First().Status = sup.StatusId.ToString();
                    currentSup.To = DateTime.Now.Date;
                    WhoIsWhereLists.AddToHrSupervisor(newSup);
                    if (sup.StatusId == managerId)
                    {
                        DBOperation.ExecuteTransaction(q4Usertable, para4UserTable, con, Trans).ExecuteNonQuery();
                        Manager m = new Manager();
                        m.Id = sup.Id;
                        m.Name = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == sup.Id).First().Name;
                        m.PartnerId = sup.PartnerId;
                        WhoIsWhereLists.AddManager(m);
                        SiteUser.Users.Where(x => x.StudentId == sup.Id).First().Role = "Manager";
                    }
                    msg = "Updated";
                    Trans.Commit();
                }
                catch (Exception ex)
                {
                    msg = ex.Message;
                    Trans.Rollback();
                }
            }
            return msg;
        }

        public static string CourseCompleted(int id)
        {
            string cs, q4HrSupervisory1, q4HrSupervisory2, q4Student, msg;

            q4HrSupervisory1 = "UPDATE HRSupervisory SET [To] = @To WHERE Id = @Id AND [To] IS NULL";
            q4HrSupervisory2 = "INSERT INTO HRSupervisory VALUES(@Id, @PartnerId, @ManagerId, @DepartmentId, @StatusId, @From, @To)";
            q4Student = "UPDATE Student SET Status = @StatusId WHERE Id = @Id";

            int statusId = Lists4CV.Status.Where(x => x.Name == "Course Completed").Select(x => x.Id).First();
            HRSupervisory currentSup = WhoIsWhereLists.HRSupervisor.Where(x => x.Id == id && x.To.Year == 1905).First();

            //Think what the status will be after completion of Articleship
            HRSupervisory newSup = new HRSupervisory
            {
                Id = id,
                ManagerId = 0,
                PartnerId = currentSup.PartnerId,
                StatusId = statusId,
                DepartmentId = currentSup.DepartmentId,
                From = DateTime.Now.Date,
                To = Convert.ToDateTime("1/1/1905"),
            };

            SqlParameter[] para4HrSupervisory1 =
            {
                new SqlParameter("@To", DateTime.Now.Date),
                new SqlParameter("@Id", id)
            };
            SqlParameter[] para4HrSupervisory2 =
            {
                new SqlParameter("@Id", id),
                new SqlParameter("@PartnerId", currentSup.PartnerId),
                new SqlParameter("@ManagerId", DBNull.Value),
                new SqlParameter("@DepartmentId", currentSup.DepartmentId),
                new SqlParameter("@StatusId", statusId),
                new SqlParameter("@From", DateTime.Now.Date),
                new SqlParameter("@To", DBNull.Value),
            };
            SqlParameter[] para4Student =
            {
                new SqlParameter("@StatusId", statusId),
                new SqlParameter("@Id", id)
            };

            cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlTransaction Trans = con.BeginTransaction();
                try
                {
                    DBOperation.ExecuteTransaction(q4HrSupervisory1, para4HrSupervisory1, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4HrSupervisory2, para4HrSupervisory2, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4Student, para4Student, con, Trans).ExecuteNonQuery();

                    WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == id).First().Status = statusId.ToString();
                    currentSup.To = DateTime.Now.Date;
                    WhoIsWhereLists.AddToHrSupervisor(newSup);
                    msg = "Updated";
                    Trans.Commit();
                }
                catch (Exception ex)
                {
                    msg = ex.Message;
                    Trans.Rollback();
                }
            }
            return msg;
        }

        public static string PartnerLeft(LeftOrTerminated lot)
        {
            var toAvoidDeadLock = SiteUser.Users;

            string cs, q4Student, q4UserTable, msg;
            int statusId = Lists4CV.Status.Where(x => x.Name == lot.Status).First().Id;
            q4Student = "UPDATE Student SET LeftOn = @LeftOn, SiteUser = @SiteUser WHERE Id = @Id";
            q4UserTable = "DELETE FROM UserTable WHERE StudentId = @Id";
            
            SqlParameter[] para4Student =
            {
                new SqlParameter("@LeftOn", lot.Date),
                new SqlParameter("@SiteUser", false),
                new SqlParameter("@Id", lot.Id)
            };
            SqlParameter[] para4UserTable =
            {
                new SqlParameter("@Id", lot.Id)
            };

            cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlTransaction Trans = con.BeginTransaction();
                try
                {
                    DBOperation.ExecuteTransaction(q4UserTable, para4UserTable, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4Student, para4Student, con, Trans).ExecuteNonQuery();

                    var leftEmp = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == lot.Id).First();
                    leftEmp.LeftOn = lot.Date;
                    leftEmp.SiteUser = 0;
                    WhoIsWhereLists.Partners.RemoveWhere(x => x.Id == lot.Id);
                    SiteUser.Users.RemoveWhere(x => x.StudentId == lot.Id);

                    Trans.Commit();
                    msg = "Updated";
                }
                catch (Exception ex)
                {
                    Trans.Rollback();
                    msg = ex.Message;
                }
            }
            return msg;
        }

        public static string LeftOrTerminated(LeftOrTerminated lot)
        {
            var toAvoidDeadLock = SiteUser.Users;

            string cs, q4HrSupervisory, q4Student, q4UserTable, msg;
            int statusId = Lists4CV.Status.Where(x => x.Name == lot.Status).First().Id;
            int lastStat = WhoIsWhereLists.HRSupervisor.Where(x => x.Id == lot.Id && x.To.Year == 1905).First().StatusId;
            q4HrSupervisory = "UPDATE HRSupervisory SET [To] = @To WHERE Id = @Id AND [To] IS NULL";
            q4Student = "UPDATE Student SET [Status] = @Status, LeftOn = @LeftOn, SiteUser = @SiteUser, LastStat = @LastStat  WHERE Id = @Id";
            q4UserTable = "DELETE FROM UserTable WHERE StudentId = @Id";
            
            SqlParameter[] para4HrSupervisory =
            {
                new SqlParameter("@To", lot.Date),
                new SqlParameter("@Id", lot.Id)
            };
            SqlParameter[] para4Student =
            {
                new SqlParameter("@Status", statusId),
                new SqlParameter("@LeftOn", lot.Date),
                new SqlParameter("@SiteUser", false),
                new SqlParameter("@LastStat", lastStat),
                new SqlParameter("@Id", lot.Id),
            };
            SqlParameter[] para4UserTable =
            {
                new SqlParameter("@Id", lot.Id)
            };

            cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlTransaction Trans = con.BeginTransaction();
                try
                {
                    DBOperation.ExecuteTransaction(q4HrSupervisory, para4HrSupervisory, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4UserTable, para4UserTable, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4Student, para4Student, con, Trans).ExecuteNonQuery();

                    var leftEmp = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == lot.Id).First();
                    leftEmp.Status = statusId.ToString();
                    leftEmp.LeftOn = lot.Date;
                    leftEmp.SiteUser = 0;
                    leftEmp.LastStatus = lastStat;

                    WhoIsWhereLists.HRSupervisor.Where(x => x.Id == lot.Id && x.To.Year == 1905).First().To = lot.Date;
                    SiteUser.Users.RemoveWhere(x=>x.StudentId == lot.Id);

                    Trans.Commit();
                    msg = "Updated";
                }
                catch (Exception ex)
                {
                    Trans.Rollback();
                    msg = ex.Message;
                }
            }
            return msg;
        }

        public string UpdateRegistrationNo(HRSupervisory hrs, string regNo, int period)
        {
            string cs, q4HrSupervisory1, q4HrSupervisory2, q4Student, q4StudentRegistration, msg;
            cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            q4HrSupervisory1 = "UPDATE HRSupervisory SET [To] = @To WHERE Id = @Id AND [To] IS NULL";
            q4Student = "UPDATE Student SET Status = @StatusId, RegistrationNo = @RegNo WHERE Id = @Id";
            q4HrSupervisory2 = "INSERT INTO HRSupervisory VALUES(@Id, @PartnerId, @ManagerId, @DepartmentId, @StatusId, @From, @To)";
            q4StudentRegistration = "UPDATE StudentRegistration SET Period = @Period where Id = @Id";

            int statusId = Lists4CV.Status.Where(x => x.Name == "Articled").Select(x => x.Id).First();
            var h = WhoIsWhereLists.HRSupervisor.Where(z => z.Id == hrs.Id && z.To.Year == 1905).First();

            SqlParameter[] para4Student =
            {
                new SqlParameter("@StatusId", statusId),
                new SqlParameter("@RegNo", regNo),
                new SqlParameter("@Id", hrs.Id)
            };

            SqlParameter[] para4HrSupervisory2 =
            {
                new SqlParameter("@Id", hrs.Id),
                new SqlParameter("@PartnerId", hrs.PartnerId),
                new SqlParameter("@ManagerId", hrs.ManagerId),
                new SqlParameter("@DepartmentId", hrs.DepartmentId),
                new SqlParameter("@StatusId", statusId),
                new SqlParameter("@From", DateTime.Now.Date),
                new SqlParameter("@To", DBNull.Value),
            };
            SqlParameter[] para4HrSupervisory1 =
            {
                new SqlParameter("@To", DateTime.Now.Date),
                new SqlParameter("@Id", hrs.Id)
            };

            SqlParameter[] para4StudentRegistration =
            {
                new SqlParameter("@Period", hrs.Id),
                new SqlParameter("@Id", period)
            };

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlTransaction Trans = con.BeginTransaction();
                try
                {
                    DBOperation.ExecuteTransaction(q4HrSupervisory1, para4HrSupervisory1, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4Student, para4Student, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4HrSupervisory2, para4HrSupervisory2, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4StudentRegistration, para4StudentRegistration, con, Trans).ExecuteNonQuery();
                    var x = WhoIsWhereLists.Students4WhoIsWhere.Where(y => y.Id == hrs.Id).First();

                    Student4WhoWhere stu = new Student4WhoWhere();
                    stu.Id = x.Id;
                    stu.JoinedOn = x.JoinedOn;
                    stu.SiteUser = x.SiteUser;
                    stu.Status = statusId.ToString();
                    stu.DepartmentId = x.DepartmentId;
                    stu.RegistrationNo = regNo;
                    WhoIsWhereLists.UpdateStudent(stu);

                    h.To = DateTime.Now.Date;

                    HRSupervisory sup2 = new HRSupervisory();
                    sup2.Id = hrs.Id;
                    sup2.DepartmentId = hrs.DepartmentId;
                    sup2.From = hrs.From;
                    sup2.ManagerId = hrs.ManagerId;
                    sup2.PartnerId = hrs.PartnerId;
                    sup2.StatusId = statusId;
                    sup2.To = Convert.ToDateTime("1/1/1905");
                    WhoIsWhereLists.AddToHrSupervisor(sup2);

                    msg = "Updated";
                    Trans.Commit();
                }
                catch (Exception ex)
                {
                    Trans.Rollback();
                    msg = ex.Message;
                }
            }

            return msg;
        }

        public string RegisterStudent(HRSupervisory hrs, DateTime regDate)
        {
            string cs, q4HrSupervisory1, q4HrSupervisory2, q4Student, q4StudentRegistration, msg;
            cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            q4HrSupervisory1 = "UPDATE HRSupervisory SET [To] = @To WHERE Id = @Id AND [To] IS NULL";
            q4Student = "UPDATE Student SET Status = @StatusId WHERE Id = @Id";
            q4HrSupervisory2 = "INSERT INTO HRSupervisory VALUES(@Id, @PartnerId, @ManagerId, @DepartmentId, @StatusId, @From, @To)";
            q4StudentRegistration = "INSERT INTO StudentRegistration Values(@Id, @Date, @Period)";

            int statusId = Lists4CV.Status.Where(x => x.Name == "Applied for Registration").Select(x => x.Id).First();

            var h = WhoIsWhereLists.HRSupervisor.Where(z => z.Id == hrs.Id && z.To.Year == 1905).First();

            SqlParameter[] para4Student =
            {
                new SqlParameter("@StatusId", statusId),
                new SqlParameter("@Id", hrs.Id)
            };

            SqlParameter[] para4HrSupervisory2 =
            {
                new SqlParameter("@Id", hrs.Id),
                new SqlParameter("@PartnerId", hrs.PartnerId),
                new SqlParameter("@ManagerId", hrs.ManagerId),
                new SqlParameter("@DepartmentId", hrs.DepartmentId),
                new SqlParameter("@StatusId", statusId),
                new SqlParameter("@From", DateTime.Now.Date),
                new SqlParameter("@To", DBNull.Value),
            };
            SqlParameter[] para4HrSupervisory1 =
            {
                new SqlParameter("@To", DateTime.Now.Date),
                new SqlParameter("@Id", hrs.Id)
            };

            SqlParameter[] para4StudentRegistration =
            {
                new SqlParameter("@Id", hrs.Id),
                new SqlParameter("@Date", regDate),
                new SqlParameter("@Period", DBNull.Value)
            };

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();
                SqlTransaction Trans = con.BeginTransaction();
                try
                {
                    DBOperation.ExecuteTransaction(q4HrSupervisory1, para4HrSupervisory1, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4Student, para4Student, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4HrSupervisory2, para4HrSupervisory2, con, Trans).ExecuteNonQuery();
                    DBOperation.ExecuteTransaction(q4StudentRegistration, para4StudentRegistration, con, Trans).ExecuteNonQuery();

                    var x = WhoIsWhereLists.Students4WhoIsWhere.Where(y => y.Id == hrs.Id).First();

                    Student4WhoWhere stu = new Student4WhoWhere();
                    stu.Id = x.Id;
                    stu.JoinedOn = x.JoinedOn;
                    stu.SiteUser = x.SiteUser;
                    stu.Status = statusId.ToString();
                    stu.DepartmentId = x.DepartmentId;
                    WhoIsWhereLists.UpdateStudent(stu);
                    
                    h.To = DateTime.Now.Date;

                    HRSupervisory sup2 = new HRSupervisory();
                    sup2.Id = hrs.Id;
                    sup2.DepartmentId = hrs.DepartmentId;
                    sup2.From = hrs.From;
                    sup2.ManagerId = hrs.ManagerId;
                    sup2.PartnerId = hrs.PartnerId;
                    sup2.StatusId = statusId;
                    sup2.To = Convert.ToDateTime("1/1/1905");
                    WhoIsWhereLists.AddToHrSupervisor(sup2);

                    msg = "Updated";
                    Trans.Commit();
                }
                catch (Exception ex)
                {
                    Trans.Rollback();
                    msg = ex.Message;
                }
            }

            return msg;
        }

        public static List<JoiningLetter> JoiningLetters()
        {
            List<JoiningLetter> jls = new List<JoiningLetter>();
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = @"SELECT * FROM JoiningLetter WHERE Reviewed = 0";
            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader rd = cmd.ExecuteReader();
                    while (rd.Read())
                    {
                        JoiningLetter jl = new JoiningLetter();
                        jl.Id = Convert.ToInt32(rd["Id"]);
                        jl.PartnerId = Convert.ToInt32(rd["PartnerId"]);
                        jl.AppSubject = rd["AppSubject"].ToString();
                        jl.AppBody = rd["AppBody"].ToString();
                        jl.Date = Convert.ToDateTime(rd["Date"]);
                        jls.Add(jl);
                    }
                }
            }
            return jls;
        }

        public static List<HRSupervisory> SupervisingHistory(int Id)
        {
            List<HRSupervisory> jls = new List<HRSupervisory>();
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = @"SELECT * FROM HRSupervisory WHERE Id = @Id";
            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Id", Id);
                    con.Open();
                    SqlDataReader rd = cmd.ExecuteReader();
                    while (rd.Read())
                    {
                        HRSupervisory jl = new HRSupervisory();
                        jl.Id = Convert.ToInt32(rd["Id"]);
                        jl.PartnerId = Convert.ToInt32(rd["PartnerId"]);
                        jl.ManagerId = rd["ManagerId"] == DBNull.Value ? 0 : Convert.ToInt32(rd["ManagerId"]);
                        jl.DepartmentId = Convert.ToInt32(rd["DepartmentId"]);
                        jl.StatusId = Convert.ToInt32(rd["StatusId"]);
                        jl.From = Convert.ToDateTime(rd["From"]);
                        jl.To = rd["To"] == DBNull.Value ? Convert.ToDateTime("1/1/1905") : Convert.ToDateTime(rd["To"]);
                        jls.Add(jl);
                    }
                }
            }
            return jls;
        }

        public static string UpdateEmployeeJoined(int empId)
        {
            string msg = "";
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = @"UPDATE UserTable SET Role = @Role WHERE StudentId = @Id;
                             UPDATE JoiningLetter SET Reviewed = @Reviewed WHERE Id = @Id";

            Student4WhoWhere emp = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == empId).First();
            int manId = Lists4CV.Status.Where(x => x.Name == "Manager").Select(x => x.Id).First();

            try
            {
                using (SqlConnection con = new SqlConnection(cs))
                {
                    using (SqlCommand cmd = new SqlCommand(query, con))
                    {
                        if (emp.Status == manId.ToString())
                        {
                            cmd.Parameters.AddWithValue("@Role", "Manager");
                            SiteUser.UpdateUserOnJoin(empId, "Manager");

                            Manager m = new Manager();
                            m.Id = empId;
                            m.PartnerId = WhoIsWhereLists.HRSupervisor.Where(x => x.Id == empId && x.To.Year == 1905).Select(x => x.PartnerId).First();
                            m.Name = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == empId).Select(x => x.Name).First();
                            WhoIsWhereLists.AddManager(m);
                        }
                        else
                        {
                            cmd.Parameters.AddWithValue("@Role", "Student");
                            var avoidNullException = SiteUser.Users;
                            SiteUser.UpdateUserOnJoin(empId, "Student");
                        }
                        cmd.Parameters.AddWithValue("@Id", empId);
                        cmd.Parameters.AddWithValue("@Reviewed", true);
                        con.Open();
                        cmd.ExecuteNonQuery();
                    }
                }
                msg = "Updated";
            }
            catch (Exception ex)
            {
                msg = ex.Message;
            }
            return msg;
        }

        public SqlParameter[] Para4NewApplication(EmployeeJoining employee)
        {
            SqlParameter[] para = {
                new SqlParameter("@Accepted", true),
                new SqlParameter("@Id", employee.EmployeeId)
            };
            return para;
        }

        public SqlParameter[] Para4Student(EmployeeJoining employee)
        {
            SqlParameter[] para = {
                new SqlParameter("@StatId", employee.StatusId),
                new SqlParameter("@DeptId", employee.DepartmentId),
                new SqlParameter("@Date", employee.Date),
                new SqlParameter("@Id", employee.EmployeeId)
            };
            return para;
        }

        public SqlParameter[] Para4UserTable(EmployeeJoining employee)
        {
            SqlParameter[] para = {
                new SqlParameter("@StudentId", employee.EmployeeId),
                new SqlParameter("@Name", employee.UserName),
                new SqlParameter("@Password", employee.Password),
                new SqlParameter("@Role", employee.Role),
                new SqlParameter("@Retry", employee.Retry),
                new SqlParameter("@Status", DBNull.Value)
            };
            return para;
        }

        public SqlParameter[] Para4HRSupervisory(EmployeeJoining employee)
        {
            SqlParameter managerId = employee.ManagerId == 0 ?
                new SqlParameter("@ManagerId", DBNull.Value) : new SqlParameter("@ManagerId", employee.ManagerId);

            SqlParameter[] para = {
                new SqlParameter("@Id", employee.EmployeeId),
                new SqlParameter("@PartnerId", employee.PartnerId),
                managerId,
                new SqlParameter("@DepartmentId", employee.DepartmentId),
                new SqlParameter("@StatusId", employee.StatusId),
                new SqlParameter("@From", employee.Date),
                new SqlParameter("@To", DBNull.Value)
            };
            return para;
        }

    }

    public class Lists4CV
    {
        static HashSet<Blood> bloodgroups;
        static HashSet<Religion> religions;
        static HashSet<MaritalStatus> maritalstatus;
        static HashSet<Education> education;
        static HashSet<EducationBoardUniversity> boarduniversity;
        static HashSet<EducationTitle> educationtitle;
        static HashSet<Status> status;
        static HashSet<Department> department;
        static HashSet<DeptStatusMap> deptstatusmap;
        static HashSet<MemberOf> memberof;

        public static HashSet<Education> Education
        {
            get
            {
                if (education == null)
                {
                    GetEducation();
                    return education;
                }
                else
                {
                    return education;
                }
            }
        }
        public static HashSet<EducationBoardUniversity> BoardUniversity
        {
            get
            {
                if (education == null)
                {
                    GetEducation();
                    return boarduniversity;
                }
                else
                {
                    return boarduniversity;
                }

            }
        }
        public static HashSet<EducationTitle> EducationTitle
        {
            get
            {
                if (education == null)
                {
                    GetEducation();
                    return educationtitle;
                }
                else
                {
                    return educationtitle;
                }

            }
        }
        public static HashSet<Religion> Religions
        {
            get
            {
                if (education == null)
                {
                    GetEducation();
                    return religions;
                }
                else
                {
                    return religions;
                }
            }
        }
        public static HashSet<Blood> BloodGroups
        {
            get
            {
                if (education == null)
                {
                    GetEducation();
                    return bloodgroups;
                }
                else
                {
                    return bloodgroups;
                }
            }
        }
        public static HashSet<MaritalStatus> MaritalStatus
        {
            get
            {
                if (education == null)
                {
                    GetEducation();
                    return maritalstatus;
                }
                else
                {
                    return maritalstatus;
                }
            }
        }
        public static HashSet<Status> Status
        {
            get
            {
                if (education == null)
                {
                    GetEducation();
                    return status;
                }
                else
                {
                    return status;
                }
            }
        }
        public static HashSet<Department> Department
        {
            get
            {
                if (education == null)
                {
                    GetEducation();
                    return department;
                }
                else
                {
                    return department;
                }
            }
        }
        public static HashSet<DeptStatusMap> DeptStatusMap
        {
            get
            {
                if (education == null)
                {
                    GetEducation();
                    return deptstatusmap;
                }
                else
                {
                    return deptstatusmap;
                }
            }
        }
        public static HashSet<MemberOf> MemberOf
        {
            get
            {
                if (education == null)
                {
                    GetEducation();
                    return memberof;
                }
                else
                {
                    return memberof;
                }
            }
        }

        public static void GetEducation()
        {
            education = new HashSet<Education>();
            boarduniversity = new HashSet<EducationBoardUniversity>();
            educationtitle = new HashSet<EducationTitle>();
            bloodgroups = new HashSet<Blood>();
            religions = new HashSet<Religion>();
            maritalstatus = new HashSet<MaritalStatus>();
            status = new HashSet<Status>();
            department = new HashSet<Department>();
            deptstatusmap = new HashSet<DeptStatusMap>();
            memberof = new HashSet<MemberOf>();

            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = @"SELECT * FROM Education;
                             SELECT * FROM EducationBoardUniversity;
                             SELECT * FROM EducationTitles;
                             SELECT * FROM BloodGroup;
                             SELECT * From Religion;
                             SELECT * From MaritalStatus;
                             SELECT * From StatusTable;
                             SELECT * From Department;
                             SELECT * From DepartmentStatusMap;
                             SELECT * From MemberOf";

            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader rd = cmd.ExecuteReader();
                    while (rd.Read())
                    {
                        Education edu = new Education();
                        edu.Id = Convert.ToInt32(rd["Id"]);
                        edu.Level = rd["Level"].ToString();
                        education.Add(edu);
                    }
                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            EducationBoardUniversity edubu = new EducationBoardUniversity();
                            edubu.Id = Convert.ToInt32(rd["Id"]);
                            edubu.Name = rd["Name"].ToString();
                            edubu.Level = rd["Level"].ToString();
                            boarduniversity.Add(edubu);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            EducationTitle edutit = new EducationTitle();
                            edutit.Id = Convert.ToInt32(rd["Id"]);
                            edutit.Title = rd["Title"].ToString();
                            edutit.TitleId = Convert.ToInt32(rd["TitleId"]);
                            educationtitle.Add(edutit);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            Blood blood = new Blood();
                            blood.Id = Convert.ToInt32(rd["Id"]);
                            blood.GroupName = rd["GroupName"].ToString();
                            bloodgroups.Add(blood);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            Religion religion = new Religion();
                            religion.Id = Convert.ToInt32(rd["Id"]);
                            religion.Name = rd["ReligionName"].ToString();
                            religions.Add(religion);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            MaritalStatus marry = new MaritalStatus();
                            marry.Id = Convert.ToInt32(rd["Id"]);
                            marry.Status = rd["Status"].ToString();
                            maritalstatus.Add(marry);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            Helper.Status stat = new Helper.Status();
                            stat.Id = Convert.ToInt32(rd["Id"]);
                            stat.Name = rd["Status"].ToString();
                            status.Add(stat);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            Helper.Department dept = new Helper.Department();
                            dept.Id = Convert.ToInt32(rd["Id"]);
                            dept.Name = rd["Name"].ToString();
                            department.Add(dept);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            Helper.DeptStatusMap deptstat = new Helper.DeptStatusMap();
                            deptstat.DepartmentId = Convert.ToInt32(rd["DepartmentId"]);
                            deptstat.StatusId = Convert.ToInt32(rd["StatusId"]);
                            deptstatusmap.Add(deptstat);
                        }
                    }

                    if (rd.NextResult())
                    {
                        while (rd.Read())
                        {
                            Helper.MemberOf memof = new Helper.MemberOf();
                            memof.Id = Convert.ToInt32(rd["Id"]);
                            memof.Organisation = rd["OrganisationName"].ToString();
                            memberof.Add(memof);
                        }
                    }
                }
            }
        }
    }

    public static class SiteUser
    {
        static HashSet<Users> users;
        public static HashSet<Users> Users
        {
            get
            {
                if (users == null)
                {
                    GetUsers();
                    return users;
                }
                else
                {
                    return users;
                }

            }
        }
        public static HashSet<Users> GetUsers()
        {
            users = new HashSet<Users>();
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = @"SELECT * FROM UserTable";
            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    SqlDataReader rd = cmd.ExecuteReader();
                    while (rd.Read())
                    {
                        Users user = new Users();
                        user.Id = Convert.ToInt32(rd["Id"]);
                        user.StudentId = rd["StudentId"] == DBNull.Value ? 0 : Convert.ToInt32(rd["StudentId"]);
                        user.UserName = rd["Name"].ToString();
                        user.Password = rd["Password"].ToString();
                        user.Role = rd["Role"].ToString();
                        user.Retry = Convert.ToInt16(rd["Retry"]);
                        user.Status = rd["Status"] == DBNull.Value ? string.Empty : rd["Status"].ToString();
                        users.Add(user);
                    }
                }
            }
            return users;
        }
        public static void AddUserOnJoin(Users user)
        {
            users.Add(user);
        }

        public static void UpdateUserOnJoin(int studId, string role)
        {
            users.Where(x => x.StudentId == studId).First().Role = role;
        }

        public static void LockUser(string userName)
        {
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = "UPDATE UserTable SET [Status] = 'locked' WHERE Name = '" + userName + "'";
            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.ExecuteNonQuery();
                }
            }

            users.Where(x => x.UserName == userName).FirstOrDefault().Status = "locked";
        }

        public static void AddUser(Users newUser)
        {
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = "INSERT INTO UserTable VALUES(@StudentId, @Name, @Password, @Role, @Retry, @Status)";
            string query2 = "UPDATE Student SET SiteUser = 1 where Id = @Id";
            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.Parameters.AddWithValue("@StudentId", newUser.Id);
                    cmd.Parameters.AddWithValue("@Name", newUser.UserName);
                    cmd.Parameters.AddWithValue("@Password", newUser.Password);
                    cmd.Parameters.AddWithValue("@Role", newUser.Role);
                    cmd.Parameters.AddWithValue("@Retry", 0);
                    cmd.Parameters.AddWithValue("@Status", DBNull.Value);
                    cmd.ExecuteNonQuery();
                }
                using (SqlCommand cmd = new SqlCommand(query2, con))
                {
                    cmd.Parameters.AddWithValue("@Id", newUser.Id);
                    cmd.ExecuteNonQuery();
                }
            }
            var y = WhoIsWhereLists.Students4WhoIsWhere.Where(x => x.Id == newUser.Id).First();
            y.SiteUser = 1;
            users.Add(newUser);
        }

        public static void UpdateUser(string userName, string role, string status)
        {
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = string.Empty;
            query = "UPDATE UserTable SET [Role] = @Role, [Status] = @Status WHERE Name = @Name";
            if (status == "Activate")
            {
                Users.Where(x => x.UserName == userName).FirstOrDefault().Status = string.Empty;
            }
            else
            {
                Users.Where(x => x.UserName == userName).FirstOrDefault().Status = "locked";
            }
            Users.Where(x => x.UserName == userName).FirstOrDefault().Role = role;

            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.Parameters.AddWithValue("@Role", role);
                    cmd.Parameters.AddWithValue("@Name", userName);
                    cmd.Parameters.Add(status == "Activate" ?
                        new SqlParameter("@Status", DBNull.Value) : new SqlParameter("@Status", "locked"));
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }

    public static class AddUniversity
    {
        public static EducationBoardUniversity Add(UniversityName name)
        {
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = "INSERT INTO EducationBoardUniversity VALUES(@Id, @Name, @Level)";
            int uniId = Lists4CV.BoardUniversity.Max(x => x.Id) + 1;
            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.Parameters.AddWithValue("@Id", uniId);
                    cmd.Parameters.AddWithValue("@Name", name.Name);
                    cmd.Parameters.AddWithValue("@Level", "University");
                    cmd.ExecuteNonQuery();
                }
            }
            EducationBoardUniversity ebu = new EducationBoardUniversity();
            ebu.Id = uniId;
            ebu.Name = name.Name;
            ebu.Level = "University";
            Lists4CV.BoardUniversity.Add(ebu);
            return ebu;
        }
    }

    public static class AddMembersOrganisation
    {
        public static MemberOf Add(UniversityName name)
        {
            string cs = ConfigurationManager.ConnectionStrings["StudentDB"].ConnectionString;
            string query = "INSERT INTO MemberOf VALUES(@Id, @OrganisationName)";
            int uniId = Lists4CV.MemberOf.Max(x => x.Id) + 1;
            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    con.Open();
                    cmd.Parameters.AddWithValue("@Id", uniId);
                    cmd.Parameters.AddWithValue("@OrganisationName", name.Name);
                    cmd.ExecuteNonQuery();
                }
            }
            MemberOf ebu = new MemberOf();
            ebu.Id = uniId;
            ebu.Organisation = name.Name;
            Lists4CV.MemberOf.Add(ebu);
            return ebu;
        }
    }
}
