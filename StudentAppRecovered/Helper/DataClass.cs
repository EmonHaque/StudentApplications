using System;
using System.Collections.Generic;

namespace StudentAppRecovered.Helper
{
    public class RegistrationInfo
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Period { get; set; }
    }

    public class PeriodOfCourse
    {
        public int Id { get; set; }
        public double Years { get; set; }
    }

    public class PartnerChart
    {
        public List<ChartObject> Chart { get; set; }
    }
    public class ChartObject
    {
        public string DataFieild { get; set; }
        public int ValueField { get; set; }
    }
    public class PartnerChart2
    {
        public List<ChartObject2> Chart { get; set; }
    }
    public class ChartObject2
    {
        public string DataFieild { get; set; }
        public int ValueField1 { get; set; }
        public int ValueField2 { get; set; }
    }

    public class JoinedPartnerUpdateInfo
    {
        public int PartnerId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public DateTime JoiningDate { get; set; }
    }

    public class ApplicationReading
    {
        public int Sl { get; set; }
        public int PageNo { get; set; }
    }

    public class EmployeePaging
    {
        public string Who { get; set; }
        public string Under { get; set; }
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public int TotalApps { get; set; }
    }

    public class ApplicationPaging
    {
        public int PageNo { get; set; }
        public int PageSize { get; set; }
        public int TotalApps { get; set; }
    }

    public class TransferInfo
    {
        public int OldSup { get; set; }
        public int NewSup { get; set; }
    }

    public class AllStudentTransferInfo
    {
        public int OldPartner { get; set; }
        public int NewPartner { get; set; }
        public int NewManager { get; set; }
    }

    public class LeftOrTerminated
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime Date { get; set; }
    }

    public class AppInfo
    {
        public int Id { get; set; }
        public string Info { get; set; }
    }

    public class StudentAppRecovereds
    {
        public NewApplication FirstApplication { get; set; }
        public JoiningLetter Joining { get; set; }
        public List<RegularApplication> Applications { get; set; }
    }

    public class AppNote
    {
        public int Sl { get; set; }
        public string Note { get; set; }
        public string Accepted { get; set; }
    }

    public class JSONApplication
    {
        public int Id { get; set; }
        public int AppTypeId { get; set; }
        public string AppBody { get; set; }
    }

    public class RegularApplication
    {
        public int Sl { get; set; }
        public int Id { get; set; }
        public int PartnerId { get; set; }
        public int ManagerId { get; set; }
        public int AppTypeId { get; set; }
        public string AppBody { get; set; }
        public DateTime Date { get; set; }
        public string ManagerNote { get; set; }
        public string PartnerNote { get; set; }
        public bool StudentReview { get; set; }
        public bool ManagerReview { get; set; }
        public bool PartnerReview { get; set; }
        public bool? Accepted { get; set; }
    }

    public class RegistrationNo
    {
        public int Id { get; set; }
        public string RegNo { get; set; }
        public int PeriodOfCourse { get; set; }
    }

    public class HRSupervisory
    {
        public int Id { get; set; }
        public int PartnerId { get; set; }
        public int ManagerId { get; set; }
        public int DepartmentId { get; set; }
        public int StatusId { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
    }

    public class EmployeeJoining
    {
        public int EmployeeId { get; set; }
        public int PartnerId { get; set; }
        public int ManagerId { get; set; }
        public int DepartmentId { get; set; }
        public int StatusId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public int Retry { get; set; }
        public DateTime Date { get; set; }
    }

    public class Partner
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class Manager
    {
        public int Id { get; set; }
        public int PartnerId { get; set; }
        public string Name { get; set; }
    }

    public class JoiningLetter
    {
        public int Id { get; set; }
        public int PartnerId { get; set; }
        public string AppSubject { get; set; }
        public string AppBody { get; set; }
        public DateTime Date { get; set; }
    }

    public class NewApplication
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string AppSubject { get; set; }
        public string AppBody { get; set; }
        public int StatusId { get; set; }
        public DateTime Date { get; set; }
    }

    public class NewApplicants
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
    }

    public class PartnerMembership
    {
        public string Id { get; set; }
        public string Organisation { get; set; }
    }

    public class PartnerPastPosition
    {
        public string Position { get; set; }
        public string Organisation { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
    }

    public class PartnerCurrentPosition
    {
        public string Position { get; set; }
        public string Organisation { get; set; }
        public DateTime From { get; set; }
    }

    public class MemberOf
    {
        public int Id { get; set; }
        public string Organisation { get; set; }
    }

    public class Status
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class Department
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class DepartmentId
    {
        public int Id { get; set; }
    }

    public class PartnerId
    {
        public int Id { get; set; }
    }

    public class DeptStatusMap
    {
        public int DepartmentId { get; set; }
        public int StatusId { get; set; }
    }

    public class Education
    {
        public int Id { get; set; }
        public string Level { get; set; }
    }

    public class EducationBoardUniversity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Level { get; set; }
    }

    public class EducationTitle
    {
        public int Id { get; set; }
        public int TitleId { get; set; }
        public string Title { get; set; }
    }

    public class Blood
    {
        public int Id { get; set; }
        public string GroupName { get; set; }
    }

    public class Religion
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class MaritalStatus
    {
        public int Id { get; set; }
        public string Status { get; set; }
    }

    public class Clients
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class Services
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class AddUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public string Password { get; set; }
    }

    public class UpdateUser
    {
        public string UserName { get; set; }
        public string Role { get; set; }
        public string Status { get; set; }
    }

    public class Authenticate
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class Users
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public short Retry { get; set; }
        public string Status { get; set; }
    }

    public class Addressee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
    }

    public class ApplicationType
    {
        public int Id { get; set; }
        public string Type { get; set; }
    }

    public class StudentId
    {
        public int id { get; set; }
    }

    public class UniversityName
    {
        public string Name { get; set; }
    }

    public class Student4WhoWhere
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string RegistrationNo { get; set; }
        public string Status { get; set; }
        public DateTime AppliedOn { get; set; }
        public DateTime JoinedOn { get; set; }
        public DateTime LeftOn { get; set; }
        public DateTime DoB { get; set; }
        public byte SiteUser { get; set; }
        public string DepartmentId { get; set; }
        public int LastStatus { get; set; }
    }
}