using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StudentAppRecovered.Helper
{
    public class StudentCV
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string RegistrationNo { get; set; }
        public string Status { get; set; }
        public DateTime AppliedOn { get; set; }
        public DateTime JoinedOn { get; set; }
        public DateTime LeftOn { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string Religion { get; set; }
        public string Gender { get; set; }
        public string MaritalStatus { get; set; }
        public string Nationality { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Blood { get; set; }
        public int LastStatus { get; set; }

        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string PresentAddress { get; set; }
        public string PermanentAddress { get; set; }
        public string EmergencyContactNo { get; set; }
        public string RelationWithEmergencyContact { get; set; }

        public string Objective { get; set; }
        public string ApplicationFor { get; set; }
        public string AppSubject { get; set; }
        public string AppBody { get; set; }
        public RegistrationInfo Registration { get; set; }
        public List<UniversityInfo> Education { get; set; }
        public List<SubjectsOfOA> SubjectsOA { get; set; }
        
        public List<ReferenceInfo> Reference { get; set; }
        public List<Experience> Experiences { get; set; }
        public CurrentPosition CurrentJob { get; set; }
        public List<PartnerMembership> PartnerMembership { get; set; }
        public List<PartnerPastPosition> PartnerPastPosition { get; set; }
        public List<PartnerCurrentPosition> PartnerCurrentPosition { get; set; }
    }

    public class CurrentPosition
    {
        public string Position { get; set; }
        public string Organisation { get; set; }
        public DateTime From { get; set; }
        public string Responsibilities { get; set; }
    }

    public class Experience
    {
        public string Position { get; set; }
        public string Organisation { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string Responsibilities { get; set; }
    }

    public class SubjectsOfOA
    {
        public string Level { get; set; }
        public string Name { get; set; }
        public string Grade { get; set; }
    }

    public class StudentInfo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string Religion { get; set; }
        public string Gender { get; set; }
        public string MaritalStatus { get; set; }
        public string Nationality { get; set; }      
        public string DateOfBirth { get; set; }
        public string Blood { get; set; }

        public string ContactNo { get; set; }
        public string Email { get; set; }
        public string PresentAddress { get; set; }
        public string PermanentAddress { get; set; }
        public string EmergencyContactNo { get; set; }
        public string RelationWithEmergencyContact { get; set; }

        public string Objective { get; set; }
        public string ApplicationFor { get; set; }
        public string AppSubject { get; set; }
        public string AppBody { get; set; }

        public SchoolCollegeInfo SSC { get; set; }
        public SchoolCollegeInfo HSC { get; set; }
        public OAInfo OLevel { get; set; }
        public OAInfo ALevel { get; set; }
        public UniversityInfo Bachelor { get; set; }
        public UniversityInfo Master { get; set; }
        public ProfessionalInfo ACCA { get; set; }
        public ProfessionalInfo CMA { get; set; }
        public List<ReferenceInfo> Reference { get; set; }
        public List<Experience> Experiences { get; set; }
        public CurrentPosition CurrentJob { get; set; }
        public List<PartnerMembership> PartnerMembership { get; set; }
        public List<PartnerPastPosition> PartnerPastPosition { get; set; }
        public List<PartnerCurrentPosition> PartnerCurrentPosition { get; set; }
    }

    public class SchoolCollegeInfo
    {
        public string Board { get; set; }
        public string Institute { get; set; }
        public string YearOfPass { get; set; }
        public string CGPA { get; set; }
    }

    public class OAInfo
    {
        public string Board { get; set; }
        public string Institute { get; set; }
        public string YearOfPass { get; set; }
        public List<OASubjects> Subjects { get; set; }
    }

    public class OASubjects
    {
        public string Name { get; set; }
        public string Grade { get; set; }
    }

    public class UniversityInfo
    {
        public string Type { get; set; }
        public string Title { get; set; }
        public string Major { get; set; }
        public string Institute { get; set; }
        public string YearOfPass { get; set; }
        public string CGPA { get; set; }
        public string University { get; set; }
    }

    public class ProfessionalInfo
    {
        public string Institute { get; set; }
        public string YearOfPass { get; set; }
    }

    public class ReferenceInfo
    {
        public string Name { get; set; }
        public string Designation { get; set; }
        public string Organisation { get; set; }
        public string ContactNo { get; set; }
        public string Relation { get; set; }
    }
}