SET NOCOUNT ON
GO
set nocount    on

USE master
GO
	if exists (select * from sysdatabases where name='StudentsDB')
	BEGIN
		DROP DATABASE StudentsDB
	END
GO
CHECKPOINT
go

CREATE DATABASE StudentsDB
CHECKPOINT
go

Use StudentsDB
GO

Create Table Student(
	Id int not null primary key,
	Name nvarchar(60) not null,
	RegistrationNo nvarchar(20) null,
	[Status] tinyint null,
	Department tinyint null,
	AppliedOn date not null,
	JoinedOn date null,
	LeftOn date null,
	DoB date not null,
	SiteUser bit not null,
	LastStat int null
)

Create Table PeriodOfCourse(
	Id tinyint not null primary key,
	Years float not null
)

Create Table StudentRegistration(
	Id int not null primary key,
	[Date] date not null,
	Period tinyint null,

FOREIGN KEY (Id) REFERENCES Student(Id),
FOREIGN KEY (Period) REFERENCES PeriodOfCourse(Id)
)

Create Table HRSupervisory(
	Sl int not null identity(1,1),
	Id int not null,
	PartnerId int null,
	ManagerId int null,
	DepartmentId int null,
	StatusId tinyint not null,
	[From] date not null,
	[To] date null,

FOREIGN KEY (Id) REFERENCES Student(Id),
INDEX IX_HRSupervisory NONCLUSTERED (Id)
)


Create Table JoiningLetter(
	Id int not null primary key,
	PartnerId int not null,
	AppSubject nvarchar(300) not null,
	AppBody nvarchar(1500) not null,
	[Date] date not null,
	Reviewed bit not null,

FOREIGN KEY (Id) REFERENCES Student(Id),
FOREIGN KEY (PartnerId) REFERENCES Student(Id)
)

CREATE Table PartnerCurrentPosition(
	Id int not null,
	Position nvarchar(75) not null,
	Organisation nvarchar(150) not null,
	[From] date not null

FOREIGN KEY (Id) REFERENCES Student(Id),
INDEX IX_PartnerCurrentPosition NONCLUSTERED (Id)
)

CREATE Table PartnerPastPosition(
	Id int not null,
	Position nvarchar(75) not null,
	Organisation nvarchar(150) not null,
	[From] date not null,
	[To] date not null

FOREIGN KEY (Id) REFERENCES Student(Id),
INDEX IX_PartnerPastPosition NONCLUSTERED (Id)
)

Create Table MemberOf(
	Id int not null primary key,
	OrganisationName nvarchar(200) not null
)

CREATE Table PartnerMembership(
	Id int not null,
	MemberId nvarchar(50) not null,
	OrgId int not null

FOREIGN KEY (Id) REFERENCES Student(Id),
FOREIGN KEY (OrgId) REFERENCES MemberOf(Id),
INDEX IX_PartnerMembership NONCLUSTERED (Id)
)

CREATE Table CurrentPosition(
	Id int not null primary key,
	Position nvarchar(75) not null,
	Organisation nvarchar(150) not null,
	[From] date not null,
	Responsibilities nvarchar(1000) not null

FOREIGN KEY (Id) REFERENCES Student(Id)
)

CREATE Table PastPosition(
	Id int not null,
	Position nvarchar(75) not null,
	Organisation nvarchar(150) not null,
	[From] date not null,
	[To] date not null,
	Responsibilities nvarchar(1000) not null

FOREIGN KEY (Id) REFERENCES Student(Id),
INDEX IX_PastPosition NONCLUSTERED (Id)
)


CREATE Table StatusTable(
	Id tinyint not null primary key,
	[Status] varchar(60) not null
)

CREATE Table Department(
	Id tinyint not null primary key,
	Name varchar(60) not null
)

Create Table DepartmentStatusMap(
	DepartmentId tinyint not null,
	StatusId tinyint not null,

FOREIGN KEY (DepartmentId) REFERENCES Department(Id),
FOREIGN KEY (StatusId) REFERENCES StatusTable(Id)
)

CREATE TABLE UserTable(
	Id int not null IDENTITY(1,1) Primary Key,
	StudentId int null,
	Name nvarchar(100) UNIQUE not null,
	[Password] nvarchar(12) not null,
	[Role] nvarchar(25) not null,
	Retry tinyint not null,
	[Status] nvarchar(6) 

FOREIGN KEY (StudentId) REFERENCES Student(Id)
)

Create Table ApplicationType(
	Id tinyint not null primary key,
	[Type] nvarchar(250) not null,
)

Create Table StudentApplication(
	Sl int not null identity(1,1),
	StudentId int not null,
	ManagerId int null,
	PartnerId int not null,
	ApplicationTypeId tinyint not null,
	ApplicationBody nvarchar(1500) not null,
	[Date] date not null,
	ManagerNote nvarchar(500) null,
	PartnerNote nvarchar(500) null,
	StudentReview bit not null,
	ManagerReview bit not null,
	PartnerReview bit not null,
	Accepted bit null,

FOREIGN KEY (StudentId) REFERENCES Student(Id),
FOREIGN KEY (ManagerId) REFERENCES Student(Id),
FOREIGN KEY (PartnerId) REFERENCES Student(Id),
FOREIGN KEY (ApplicationTypeId) REFERENCES ApplicationType(Id),
INDEX IX_StudentApp1 NONCLUSTERED (StudentId),
INDEX IX_StudentApp2 NONCLUSTERED (ManagerId),
INDEX IX_StudentApp3 NONCLUSTERED (PartnerId)
)

Create Table Education(
	Id int not null primary key,
	[Level] nvarchar(35) not null
)

Create Table BloodGroup(
	Id tinyint not null primary key,
	GroupName nvarchar(3) not null
)

Create Table Religion(
	Id tinyint not null primary key,
	ReligionName nvarchar(15) not null
)

Create Table MaritalStatus(
	Id tinyint not null primary key,
	[Status] nvarchar(15) not null
)

Create Table EducationTitles(
	Id int not null,
	TitleId tinyint not null primary key,
	Title nvarchar(100) not null,

FOREIGN KEY (Id) REFERENCES Education(Id)
)

Create Table EducationBoardUniversity(
	Id tinyint not null primary key,
	Name nvarchar(150) not null,
	[Level] nvarchar(20) not null
)

Create Table Reference(
	Id int not null,
	Name nvarchar(75) not null,
	Designation nvarchar(50) not null,
	Organisation nvarchar(150) not null,
	ContactNo nvarchar(15) not null,
	Relation nvarchar(50) not null,

FOREIGN KEY (Id) REFERENCES Student(Id),
INDEX IX_Reference NONCLUSTERED (Id)
)

Create Table StudentDetail(
	Id int not null primary key,
	FatherName nvarchar(60) not null,
	MotherName nvarchar(60) not null,
	Religion tinyint not null,
	Gender bit not null,
	MaritalStatus tinyint not null,
	Nationality nvarchar(20) not null,
	Blood tinyint not null,
	ContactNo nvarchar(15) not null,
	Email nvarchar(50),
	PresentAddress nvarchar(500) not null,
	PermanentAddress nvarchar(500) not null,
	EmergencyContactNo nvarchar(15) not null,
	RelationWithEmergencyContact nvarchar(50) not null,
	Objective nvarchar(1500) not null,

FOREIGN KEY (Id) REFERENCES Student(Id),
FOREIGN KEY (Religion) REFERENCES Religion(Id),
FOREIGN KEY (MaritalStatus) REFERENCES MaritalStatus(Id),
FOREIGN KEY (Blood) REFERENCES BloodGroup(Id)
)

Create Table StudentEducation(
	Id int not null,
	[Type] nvarchar(20) null,
	Title tinyint not null,
	BoardUniversity tinyint null,
	Institute nvarchar(150) not null,
	YearOfPass int not null,
	CGPA nvarchar(4) null,
	Major nvarchar(150) null,

FOREIGN KEY (Id) REFERENCES Student(Id),
INDEX IX_StudentEducation NONCLUSTERED (Id)
)

Create Table StudentOAEducation(
	Id int not null,
	[Level] bit not null,
	[Subject] nvarchar(75) not null,
	Grade nvarchar(2) not null,

FOREIGN KEY (Id) REFERENCES Student(Id),
INDEX IX_StudentOAEducation NONCLUSTERED (Id)
)

CREATE Table NewApplication(
	Id int not null primary key,
	AppSubject nvarchar(150) not null,
	AppBody nvarchar(1500) not null,
	StatusId tinyint not null,
	Accepted bit null,

FOREIGN KEY (Id) REFERENCES Student(Id),
FOREIGN KEY (StatusId) REFERENCES StatusTable(Id)
)

INSERT INTO Education VALUES
	(1, 'Secondary'),
	(2, 'Higher Secondary'),
	(3, 'Bachelor'),
	(4, 'Master'),
	(5, 'Professional')

INSERT INTO EducationTitles VALUES
	(1, 11, 'SSC'),
	(1, 12, 'O Level'),
	(2, 21, 'HSC'),
	(2, 22, 'A Level'),
	(3, 31, 'BBS(Pass)'),
	(3, 32, 'BSS(Pass)'),
	(3, 33, 'BSC(Pass)'),
	(3, 34, 'Honours'),
	(3, 35, 'BBA'),
	(4, 41, 'MBS'),
	(4, 42, 'MSS'),
	(4, 43, 'MSC'),
	(4, 44, 'MBA'),
	(5, 51, 'CMA'),
	(5, 52, 'ACCA')

INSERT INTO EducationBoardUniversity VALUES
	(1, 'Dhaka', 'SSCHSC'),
	(2, 'Rajshahi', 'SSCHSC'),
	(3, 'Dinajpur', 'SSCHSC'),
	(4, 'Jessore', 'SSCHSC'),
	(5, 'Barisal', 'SSCHSC'),
	(6, 'Sylhet', 'SSCHSC'),
	(7, 'Comilla', 'SSCHSC'),
	(8, 'Chittagong', 'SSCHSC'),
	(9, 'Technical', 'SSCHSC'),
	(10, 'Madrasah', 'SSCHSC'),
	(11, 'Edexcel', 'OA'),
	(12, 'Cambridge', 'OA'),
	(13, 'National University', 'University'),
	(14, 'Dhaka University', 'University'),
	(15, 'Bangladesh Islami University', 'University'),
	(16, 'Stamford University Bangladesh', 'University'),
	(17, 'University of South Asia', 'University')

INSERT INTO BloodGroup VALUES	
	(1, 'A+'),
	(2, 'A-'),
	(3, 'B+'),
	(4, 'B-'),
	(5, 'AB+'),
	(6, 'AB-'),
	(7, 'O+'),
	(8, 'O-')

INSERT INTO Religion VALUES
	(1, 'Islam'),
	(2, 'Hindu'),
	(3, 'Christian'),
	(4, 'Buddist')

INSERT INTO MaritalStatus VALUES
	(1, 'Unmarried'),
	(2, 'Married')

INSERT INTO UserTable VALUES
	(null, 'Emon', '1234', 'Administrator', 0, null),
	(null, 'Manager1', '1234', 'Manager', 0, null),
	(null, 'Manager2', '1234', 'Manager', 0, null)

INSERT INTO ApplicationType VALUES
	(1, 'Leave in advance'),
	(2, 'Fitness Certificate'),
	(3, 'Leave of absence'),
	(4, 'CC Certificate'),
	(5, 'Resignation Letter'),
	(6, 'Release Letter'),
	(7, 'Character Certificate')

INSERT INTO StatusTable VALUES
	(1, 'Partner'),
	(2, 'Director'),
	(3, 'Senior Manager'),
	(4, 'Manager'),
	(5, 'Assistant Manager'),
	(6, 'Articled'),
	(7, 'Executive'),
	(8, 'Driver'),
	(9, 'Office Assistant'),
	(10, 'Applicant for Job'),
	(11, 'Applicant for Articleship'),
	(12, 'Rejected'),
	(13, 'Apprentice'),
	(14, 'Applied for Registration'),
	(15, 'Terminated'),
	(16, 'Course Completed'),
	(17, 'Left')

INSERT INTO Department VALUES
	(1, 'Assurance'),
	(2, 'Quality Control'),
	(3, 'Accounts'),
	(4, 'Company Affairs'),
	(5, 'Taxes'),
	(6, 'Information Technology'),
	(7, 'Human Resource'),
	(8, 'Administration')

INSERT INTO DepartmentStatusMap VALUES
	(1,2),
	(1,3),
	(1,4),
	(1,5),
	(1,7),

	(2,2),
	(2,3),
	(2,4),
	(2,5),
	(2,7),

	(3,2),
	(3,3),
	(3,4),
	(3,5),
	(3,7),

	(4,2),
	(4,3),
	(4,4),
	(4,5),
	(4,7),

	(5,2),
	(5,3),
	(5,4),
	(5,5),
	(5,7),

	(6,2),
	(6,3),
	(6,4),
	(6,5),
	(6,7),

	(7,2),
	(7,3),
	(7,4),
	(7,5),
	(7,7),

	(8,2),
	(8,3),
	(8,4),
	(8,5),
	(8,6),
	(8,7),
	(8,8),
	(8,9)

INSERT INTO MemberOf VALUES
	(1, 'Institute Of Chartered Accountants Of Bangladesh'),
	(2, 'Institute Of Chartered Accountants Of England and Wales')

INSERT INTO PeriodOfCourse VALUES
	(1, 2),
	(2, 3),
	(3, 4)
