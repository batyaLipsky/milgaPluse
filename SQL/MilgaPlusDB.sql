USE [master]
GO
/****** Object:  Database [MilgaPluseDB]    Script Date: 28/04/2020 18:44:15 ******/
CREATE DATABASE [MilgaPluseDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'MilgaPluseDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\MilgaPluseDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'MilgaPluseDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\MilgaPluseDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [MilgaPluseDB] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [MilgaPluseDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [MilgaPluseDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [MilgaPluseDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [MilgaPluseDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [MilgaPluseDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [MilgaPluseDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET RECOVERY FULL 
GO
ALTER DATABASE [MilgaPluseDB] SET  MULTI_USER 
GO
ALTER DATABASE [MilgaPluseDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [MilgaPluseDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [MilgaPluseDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [MilgaPluseDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [MilgaPluseDB] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'MilgaPluseDB', N'ON'
GO
ALTER DATABASE [MilgaPluseDB] SET QUERY_STORE = OFF
GO
USE [MilgaPluseDB]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [MilgaPluseDB]
GO
/****** Object:  Table [dbo].[BankAccounts]    Script Date: 28/04/2020 18:44:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BankAccounts](
	[BranchNumber] [varchar](50) NOT NULL,
	[AccountNumber] [varchar](50) NOT NULL,
	[Identity] [varchar](50) NOT NULL,
	[BankName] [varchar](50) NOT NULL,
	[BankNumber] [varchar](50) NOT NULL,
 CONSTRAINT [PK_BankAccounts] PRIMARY KEY CLUSTERED 
(
	[BranchNumber] ASC,
	[AccountNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[City]    Script Date: 28/04/2020 18:44:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[City](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CityName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_City] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Loans]    Script Date: 28/04/2020 18:44:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Loans](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ReturnLoanGeorgianDate] [datetime] NOT NULL,
	[ReturnLoanHebrewDate] [varchar](50) NOT NULL,
	[BorrowerIdentity] [varchar](50) NOT NULL,
	[AccountNumberBorrower] [varchar](50) NULL,
	[NoteOfReturnLoan] [varchar](50) NULL,
	[WayOfPay] [varchar](50) NOT NULL,
	[LoanSum] [int] NOT NULL,
	[DebtBalance] [int] NOT NULL,
 CONSTRAINT [PK_Loans_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Scholarships]    Script Date: 28/04/2020 18:44:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Scholarships](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Identity] [varchar](50) NOT NULL,
	[HebrewMonth] [varchar](50) NOT NULL,
	[HebrewYear] [varchar](50) NOT NULL,
	[Date] [date] NOT NULL,
	[Basic] [int] NOT NULL,
	[Musar] [bit] NOT NULL,
	[SumForMusar] [int] NULL,
	[Absence] [int] NOT NULL,
	[NoteAbsence] [varchar](50) NULL,
	[SumForAbsence] [int] NOT NULL,
	[ShmiratSdarim] [int] NOT NULL,
	[SumForShmiratSdarim] [int] NOT NULL,
	[addToShmiratSdarimBecauseGoodTest] [int] NULL,
	[Atmada] [int] NOT NULL,
	[NoteAtmada] [varchar](50) NULL,
	[SumForAtmada] [int] NOT NULL,
	[Mark] [int] NULL,
	[SumForMark] [int] NULL,
	[ExcellenceScholarship] [int] NULL,
	[HolidayScholarship] [int] NULL,
	[NoteHolidayScholarship] [varchar](50) NULL,
	[ReligiousMinistry] [int] NOT NULL,
	[Scholarship] [int] NOT NULL,
	[ScholarshipsAndLoan] [int] NOT NULL,
	[Refund] [int] NOT NULL,
	[Donation] [int] NULL,
	[RemainderDebt] [int] NOT NULL,
	[Confirm] [bit] NOT NULL,
	[RefundTransportation] [int] NULL,
	[NoteGeneral] [varchar](50) NULL,
 CONSTRAINT [PK_Scholarships] PRIMARY KEY CLUSTERED 
(
	[Identity] ASC,
	[HebrewMonth] ASC,
	[HebrewYear] ASC,
	[Date] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 28/04/2020 18:44:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Identity] [varchar](50) NOT NULL,
	[UserName] [varchar](50) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Email] [varchar](50) NULL,
	[Telephon] [varchar](50) NULL,
	[CellularTelephone1] [varchar](50) NULL,
	[CellularTelephone2] [varchar](50) NULL,
	[City] [int] NOT NULL,
	[Street] [varchar](50) NOT NULL,
	[BuildingNumber] [int] NOT NULL,
	[HomeNumber] [int] NULL,
	[ZipCode] [int] NULL,
	[BirthDate_hebrew] [varchar](50) NOT NULL,
	[BirthDate_gregorian] [date] NOT NULL,
	[Children] [int] NOT NULL,
	[FullDay] [bit] NULL,
	[DoingTest] [bit] NULL,
	[IsManager] [bit] NULL,
	[LearnNowadays] [bit] NOT NULL,
	[DateOfLeave] [date] NULL,
 CONSTRAINT [PK_ToraMen] PRIMARY KEY CLUSTERED 
(
	[Identity] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[City] ON 

INSERT [dbo].[City] ([Id], [CityName]) VALUES (1, N'בני ברק')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (2, N'פתח תקווה')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (3, N'אלעד')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (4, N'ירושלים')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (5, N'נתיבות')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (6, N'אשדוד')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (7, N'בית שמש')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (8, N'גני תקוה')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (9, N'יהוד')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (10, N'אור יהודה')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (11, N'באר שבע')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (12, N'תל אביב')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (13, N'חיפה')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (14, N'אילת')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (15, N'רמת גן')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (16, N'ראש העין')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (17, N'ראשון לציון')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (18, N'נתניה')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (19, N'רחובות')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (20, N'הרצליה')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (21, N'רמת השרון')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (22, N'רעננה')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (23, N'זכרון יעקב')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (24, N'מטולה')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (25, N'עפולה')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (26, N'קרית שמונה')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (27, N'קרית מלאכי')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (28, N'לוד')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (29, N'רמלה')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (30, N'ביתר')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (31, N'טבריה')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (32, N'צפת')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (33, N'דימונה')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (34, N'אופקים')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (35, N'סביון')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (36, N'כפר שמריהו')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (37, N'בת ים')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (38, N'קיסריה')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (39, N'ערד')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (40, N'כרמיאל')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (41, N'גזר')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (1039, N'נאות קדומים')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (2039, N'אור הגנוז')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (2040, N'מירון')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (2041, N'יערה')
INSERT [dbo].[City] ([Id], [CityName]) VALUES (3039, N'מעלות')
SET IDENTITY_INSERT [dbo].[City] OFF
SET IDENTITY_INSERT [dbo].[Loans] ON 

INSERT [dbo].[Loans] ([Id], [ReturnLoanGeorgianDate], [ReturnLoanHebrewDate], [BorrowerIdentity], [AccountNumberBorrower], [NoteOfReturnLoan], [WayOfPay], [LoanSum], [DebtBalance]) VALUES (1, CAST(N'2019-11-17T00:00:00.000' AS DateTime), N'י"ט חשון תש"פ', N'034232488', NULL, NULL, N'מזומן', 100, 4495)
INSERT [dbo].[Loans] ([Id], [ReturnLoanGeorgianDate], [ReturnLoanHebrewDate], [BorrowerIdentity], [AccountNumberBorrower], [NoteOfReturnLoan], [WayOfPay], [LoanSum], [DebtBalance]) VALUES (2, CAST(N'2019-11-17T00:00:00.000' AS DateTime), N'י"ט חשון תש"פ', N'034232488', NULL, NULL, N'מזומן', 50, 4445)
INSERT [dbo].[Loans] ([Id], [ReturnLoanGeorgianDate], [ReturnLoanHebrewDate], [BorrowerIdentity], [AccountNumberBorrower], [NoteOfReturnLoan], [WayOfPay], [LoanSum], [DebtBalance]) VALUES (3, CAST(N'2019-11-17T00:00:00.000' AS DateTime), N'י"ט חשון תש"פ', N'034232488', NULL, NULL, N'מזומן', 50, 4395)
INSERT [dbo].[Loans] ([Id], [ReturnLoanGeorgianDate], [ReturnLoanHebrewDate], [BorrowerIdentity], [AccountNumberBorrower], [NoteOfReturnLoan], [WayOfPay], [LoanSum], [DebtBalance]) VALUES (1002, CAST(N'2020-01-01T00:00:00.000' AS DateTime), N'ד'' טבת תש"פ', N'034232488', NULL, NULL, N'העברה', 50, 4445)
INSERT [dbo].[Loans] ([Id], [ReturnLoanGeorgianDate], [ReturnLoanHebrewDate], [BorrowerIdentity], [AccountNumberBorrower], [NoteOfReturnLoan], [WayOfPay], [LoanSum], [DebtBalance]) VALUES (1003, CAST(N'2020-01-01T00:00:00.000' AS DateTime), N'ד'' טבת תש"פ', N'034232488', NULL, NULL, N'העברה', 50, 4395)
INSERT [dbo].[Loans] ([Id], [ReturnLoanGeorgianDate], [ReturnLoanHebrewDate], [BorrowerIdentity], [AccountNumberBorrower], [NoteOfReturnLoan], [WayOfPay], [LoanSum], [DebtBalance]) VALUES (2002, CAST(N'2020-01-02T00:00:00.000' AS DateTime), N'ה'' טבת תש"פ', N'034232488', NULL, NULL, N'מזומן', 20, 3893)
SET IDENTITY_INSERT [dbo].[Loans] OFF
SET IDENTITY_INSERT [dbo].[Scholarships] ON 

INSERT [dbo].[Scholarships] ([Id], [Identity], [HebrewMonth], [HebrewYear], [Date], [Basic], [Musar], [SumForMusar], [Absence], [NoteAbsence], [SumForAbsence], [ShmiratSdarim], [SumForShmiratSdarim], [addToShmiratSdarimBecauseGoodTest], [Atmada], [NoteAtmada], [SumForAtmada], [Mark], [SumForMark], [ExcellenceScholarship], [HolidayScholarship], [NoteHolidayScholarship], [ReligiousMinistry], [Scholarship], [ScholarshipsAndLoan], [Refund], [Donation], [RemainderDebt], [Confirm], [RefundTransportation], [NoteGeneral]) VALUES (3, N'034232488', N'אב', N'תשע"ט', CAST(N'2019-06-25' AS Date), 130, 1, 150, 9, NULL, 0, 0, 0, 140, 12, N'הערות התמדה', 280, 99, 350, 100, NULL, NULL, 748, 1898, 2500, 0, NULL, 602, 1, NULL, NULL)
INSERT [dbo].[Scholarships] ([Id], [Identity], [HebrewMonth], [HebrewYear], [Date], [Basic], [Musar], [SumForMusar], [Absence], [NoteAbsence], [SumForAbsence], [ShmiratSdarim], [SumForShmiratSdarim], [addToShmiratSdarimBecauseGoodTest], [Atmada], [NoteAtmada], [SumForAtmada], [Mark], [SumForMark], [ExcellenceScholarship], [HolidayScholarship], [NoteHolidayScholarship], [ReligiousMinistry], [Scholarship], [ScholarshipsAndLoan], [Refund], [Donation], [RemainderDebt], [Confirm], [RefundTransportation], [NoteGeneral]) VALUES (5, N'034232488', N'אב', N'תשע"ט', CAST(N'2019-08-28' AS Date), 130, 0, 0, 4, NULL, 0, 0, 150, 0, 0, NULL, 400, 2, 0, 0, NULL, NULL, 748, 1428, 2500, 0, NULL, 1072, 1, NULL, NULL)
INSERT [dbo].[Scholarships] ([Id], [Identity], [HebrewMonth], [HebrewYear], [Date], [Basic], [Musar], [SumForMusar], [Absence], [NoteAbsence], [SumForAbsence], [ShmiratSdarim], [SumForShmiratSdarim], [addToShmiratSdarimBecauseGoodTest], [Atmada], [NoteAtmada], [SumForAtmada], [Mark], [SumForMark], [ExcellenceScholarship], [HolidayScholarship], [NoteHolidayScholarship], [ReligiousMinistry], [Scholarship], [ScholarshipsAndLoan], [Refund], [Donation], [RemainderDebt], [Confirm], [RefundTransportation], [NoteGeneral]) VALUES (1, N'034232488', N'אדר', N'תשע"ט', CAST(N'2019-01-25' AS Date), 130, 1, 150, 9, NULL, 0, 0, 0, 140, 12, N'הערות התמדה', 280, 70, 350, 0, NULL, NULL, 748, 1798, 2500, 0, NULL, 702, 1, NULL, NULL)
INSERT [dbo].[Scholarships] ([Id], [Identity], [HebrewMonth], [HebrewYear], [Date], [Basic], [Musar], [SumForMusar], [Absence], [NoteAbsence], [SumForAbsence], [ShmiratSdarim], [SumForShmiratSdarim], [addToShmiratSdarimBecauseGoodTest], [Atmada], [NoteAtmada], [SumForAtmada], [Mark], [SumForMark], [ExcellenceScholarship], [HolidayScholarship], [NoteHolidayScholarship], [ReligiousMinistry], [Scholarship], [ScholarshipsAndLoan], [Refund], [Donation], [RemainderDebt], [Confirm], [RefundTransportation], [NoteGeneral]) VALUES (6, N'034232488', N'אלול', N'תשע"ט', CAST(N'0001-01-01' AS Date), 130, 1, 150, 2, NULL, 0, 2, 200, 165, 7, NULL, 330, 99, 350, 100, 0, NULL, 748, 2173, 2500, 0, 2, 325, 1, NULL, NULL)
INSERT [dbo].[Scholarships] ([Id], [Identity], [HebrewMonth], [HebrewYear], [Date], [Basic], [Musar], [SumForMusar], [Absence], [NoteAbsence], [SumForAbsence], [ShmiratSdarim], [SumForShmiratSdarim], [addToShmiratSdarimBecauseGoodTest], [Atmada], [NoteAtmada], [SumForAtmada], [Mark], [SumForMark], [ExcellenceScholarship], [HolidayScholarship], [NoteHolidayScholarship], [ReligiousMinistry], [Scholarship], [ScholarshipsAndLoan], [Refund], [Donation], [RemainderDebt], [Confirm], [RefundTransportation], [NoteGeneral]) VALUES (2011, N'034232488', N'חשון', N'תש"פ', CAST(N'2019-10-31' AS Date), 130, 0, 0, 3, NULL, 0, 0, 175, 180, 4, NULL, 360, 99, 350, 100, NULL, NULL, 748, 2052, 2500, 0, NULL, 448, 0, 9, NULL)
INSERT [dbo].[Scholarships] ([Id], [Identity], [HebrewMonth], [HebrewYear], [Date], [Basic], [Musar], [SumForMusar], [Absence], [NoteAbsence], [SumForAbsence], [ShmiratSdarim], [SumForShmiratSdarim], [addToShmiratSdarimBecauseGoodTest], [Atmada], [NoteAtmada], [SumForAtmada], [Mark], [SumForMark], [ExcellenceScholarship], [HolidayScholarship], [NoteHolidayScholarship], [ReligiousMinistry], [Scholarship], [ScholarshipsAndLoan], [Refund], [Donation], [RemainderDebt], [Confirm], [RefundTransportation], [NoteGeneral]) VALUES (3011, N'034232488', N'כסלו', N'תש"פ', CAST(N'2019-12-12' AS Date), 130, 0, 0, 12, NULL, 0, 0, 0, 200, 0, NULL, 400, 99, 350, 100, NULL, NULL, 748, 1928, 2500, 0, NULL, 572, 1, NULL, NULL)
INSERT [dbo].[Scholarships] ([Id], [Identity], [HebrewMonth], [HebrewYear], [Date], [Basic], [Musar], [SumForMusar], [Absence], [NoteAbsence], [SumForAbsence], [ShmiratSdarim], [SumForShmiratSdarim], [addToShmiratSdarimBecauseGoodTest], [Atmada], [NoteAtmada], [SumForAtmada], [Mark], [SumForMark], [ExcellenceScholarship], [HolidayScholarship], [NoteHolidayScholarship], [ReligiousMinistry], [Scholarship], [ScholarshipsAndLoan], [Refund], [Donation], [RemainderDebt], [Confirm], [RefundTransportation], [NoteGeneral]) VALUES (2, N'034232488', N'סיון', N'תשע"ט', CAST(N'2019-04-25' AS Date), 130, 1, 150, 9, NULL, 0, 0, 0, 140, 12, N'הערות התמדה', 280, 99, 350, 100, NULL, NULL, 748, 1898, 2500, 0, NULL, 602, 1, NULL, NULL)
INSERT [dbo].[Scholarships] ([Id], [Identity], [HebrewMonth], [HebrewYear], [Date], [Basic], [Musar], [SumForMusar], [Absence], [NoteAbsence], [SumForAbsence], [ShmiratSdarim], [SumForShmiratSdarim], [addToShmiratSdarimBecauseGoodTest], [Atmada], [NoteAtmada], [SumForAtmada], [Mark], [SumForMark], [ExcellenceScholarship], [HolidayScholarship], [NoteHolidayScholarship], [ReligiousMinistry], [Scholarship], [ScholarshipsAndLoan], [Refund], [Donation], [RemainderDebt], [Confirm], [RefundTransportation], [NoteGeneral]) VALUES (1006, N'034232488', N'תשרי', N'תש"פ', CAST(N'2019-10-23' AS Date), 130, 0, 0, 12, NULL, 0, 0, 0, 0, 0, NULL, 400, 6, 0, 0, NULL, NULL, 748, 1278, 2500, 0, NULL, 1222, 1, NULL, NULL)
INSERT [dbo].[Scholarships] ([Id], [Identity], [HebrewMonth], [HebrewYear], [Date], [Basic], [Musar], [SumForMusar], [Absence], [NoteAbsence], [SumForAbsence], [ShmiratSdarim], [SumForShmiratSdarim], [addToShmiratSdarimBecauseGoodTest], [Atmada], [NoteAtmada], [SumForAtmada], [Mark], [SumForMark], [ExcellenceScholarship], [HolidayScholarship], [NoteHolidayScholarship], [ReligiousMinistry], [Scholarship], [ScholarshipsAndLoan], [Refund], [Donation], [RemainderDebt], [Confirm], [RefundTransportation], [NoteGeneral]) VALUES (1012, N'211339650', N'תשרי', N'תש"פ', CAST(N'2019-10-25' AS Date), 65, 0, 0, 12, NULL, 0, 0, 0, 100, 0, NULL, 200, 91, 350, 100, NULL, NULL, 374, 1189, 2500, 0, NULL, 1311, 1, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Scholarships] OFF
INSERT [dbo].[Users] ([Identity], [UserName], [FirstName], [LastName], [Email], [Telephon], [CellularTelephone1], [CellularTelephone2], [City], [Street], [BuildingNumber], [HomeNumber], [ZipCode], [BirthDate_hebrew], [BirthDate_gregorian], [Children], [FullDay], [DoingTest], [IsManager], [LearnNowadays], [DateOfLeave]) VALUES (N'012345678', N'012345678', N'אברהם', N'אברמוביץ', NULL, N'039091111', N'050848484', N'0508383833', 2, N'פינקל', 8, NULL, NULL, N'', CAST(N'1900-01-01' AS Date), 8, 1, 1, NULL, 1, NULL)
INSERT [dbo].[Users] ([Identity], [UserName], [FirstName], [LastName], [Email], [Telephon], [CellularTelephone1], [CellularTelephone2], [City], [Street], [BuildingNumber], [HomeNumber], [ZipCode], [BirthDate_hebrew], [BirthDate_gregorian], [Children], [FullDay], [DoingTest], [IsManager], [LearnNowadays], [DateOfLeave]) VALUES (N'023456789', N'023456789', N'ישראל', N'ישראלי', NULL, N'039089327', N'0527188129', NULL, 2, N'פיק"א', 25, NULL, NULL, N'', CAST(N'1900-01-01' AS Date), 12, 1, 1, NULL, 1, NULL)
INSERT [dbo].[Users] ([Identity], [UserName], [FirstName], [LastName], [Email], [Telephon], [CellularTelephone1], [CellularTelephone2], [City], [Street], [BuildingNumber], [HomeNumber], [ZipCode], [BirthDate_hebrew], [BirthDate_gregorian], [Children], [FullDay], [DoingTest], [IsManager], [LearnNowadays], [DateOfLeave]) VALUES (N'024567890', N'024567890', N'בנימין', N'קיסטר', NULL, N'039089254', N'0504139578', NULL, 2, N'קהילות יעקב', 2, NULL, NULL, N'', CAST(N'1900-01-01' AS Date), 6, 1, 1, NULL, 1, NULL)
INSERT [dbo].[Users] ([Identity], [UserName], [FirstName], [LastName], [Email], [Telephon], [CellularTelephone1], [CellularTelephone2], [City], [Street], [BuildingNumber], [HomeNumber], [ZipCode], [BirthDate_hebrew], [BirthDate_gregorian], [Children], [FullDay], [DoingTest], [IsManager], [LearnNowadays], [DateOfLeave]) VALUES (N'025678906', N'025678906', N'שמואל', N'וינגוט', NULL, N'035798896', N'0527622908', N'0527622908', 1, N'יגאל אלון', 20, NULL, NULL, N'', CAST(N'1900-01-01' AS Date), 6, 1, 1, NULL, 1, NULL)
INSERT [dbo].[Users] ([Identity], [UserName], [FirstName], [LastName], [Email], [Telephon], [CellularTelephone1], [CellularTelephone2], [City], [Street], [BuildingNumber], [HomeNumber], [ZipCode], [BirthDate_hebrew], [BirthDate_gregorian], [Children], [FullDay], [DoingTest], [IsManager], [LearnNowadays], [DateOfLeave]) VALUES (N'027890126', N'027890126', N'ישעיהו', N'מנדלוביץ', NULL, N'039089286', N'0548483609', N'0548483607 ', 2, N'קהילות יעקב', 7, NULL, NULL, N'', CAST(N'1900-01-01' AS Date), 7, 1, 1, NULL, 1, NULL)
INSERT [dbo].[Users] ([Identity], [UserName], [FirstName], [LastName], [Email], [Telephon], [CellularTelephone1], [CellularTelephone2], [City], [Street], [BuildingNumber], [HomeNumber], [ZipCode], [BirthDate_hebrew], [BirthDate_gregorian], [Children], [FullDay], [DoingTest], [IsManager], [LearnNowadays], [DateOfLeave]) VALUES (N'031234458', N'031234458', N'יצחק', N'יצחקי', NULL, NULL, N'0527131311', N'0527658456', 1, N'דב הוז', 25, NULL, 51227, N'', CAST(N'1900-01-01' AS Date), 3, 1, 1, NULL, 1, NULL)
INSERT [dbo].[Users] ([Identity], [UserName], [FirstName], [LastName], [Email], [Telephon], [CellularTelephone1], [CellularTelephone2], [City], [Street], [BuildingNumber], [HomeNumber], [ZipCode], [BirthDate_hebrew], [BirthDate_gregorian], [Children], [FullDay], [DoingTest], [IsManager], [LearnNowadays], [DateOfLeave]) VALUES (N'123456789', N'123456789', N'אפרים', N'רוביפין', N'likratsr@gmail.com', N'', N'0548493506', N'0548493505', 2, N'השופר', 6, 4, NULL, N'י"ט אלול, תשל"ז', CAST(N'1977-08-31' AS Date), 4, 1, 1, 1, 1, NULL)
INSERT [dbo].[Users] ([Identity], [UserName], [FirstName], [LastName], [Email], [Telephon], [CellularTelephone1], [CellularTelephone2], [City], [Street], [BuildingNumber], [HomeNumber], [ZipCode], [BirthDate_hebrew], [BirthDate_gregorian], [Children], [FullDay], [DoingTest], [IsManager], [LearnNowadays], [DateOfLeave]) VALUES (N'023456785', N'023456785', N'יעקב', N'חדד', NULL, N'', N'0527688890', N'0527688895', 1, N'שפירא', 17, NULL, NULL, N'', CAST(N'1900-01-01' AS Date), 3, 1, 1, NULL, 1, NULL)
INSERT [dbo].[Users] ([Identity], [UserName], [FirstName], [LastName], [Email], [Telephon], [CellularTelephone1], [CellularTelephone2], [City], [Street], [BuildingNumber], [HomeNumber], [ZipCode], [BirthDate_hebrew], [BirthDate_gregorian], [Children], [FullDay], [DoingTest], [IsManager], [LearnNowadays], [DateOfLeave]) VALUES (N'052323233', N'052323233', N'אברהם', N'גמליאל', NULL, N'035793601', N'0504163601', NULL, 1, N'חידושי הרי"ם', 3, NULL, 51606, N'', CAST(N'1900-01-01' AS Date), 11, 1, 1, NULL, 1, NULL)
INSERT [dbo].[Users] ([Identity], [UserName], [FirstName], [LastName], [Email], [Telephon], [CellularTelephone1], [CellularTelephone2], [City], [Street], [BuildingNumber], [HomeNumber], [ZipCode], [BirthDate_hebrew], [BirthDate_gregorian], [Children], [FullDay], [DoingTest], [IsManager], [LearnNowadays], [DateOfLeave]) VALUES (N'058011112', N'058011112', N'אלחנן', N'דרנגר', NULL, N'035706906', N'0504162369', NULL, 1, N'הרב מלצר', 17, NULL, NULL, N'', CAST(N'1900-01-01' AS Date), 17, 1, 1, NULL, 1, NULL)
INSERT [dbo].[Users] ([Identity], [UserName], [FirstName], [LastName], [Email], [Telephon], [CellularTelephone1], [CellularTelephone2], [City], [Street], [BuildingNumber], [HomeNumber], [ZipCode], [BirthDate_hebrew], [BirthDate_gregorian], [Children], [FullDay], [DoingTest], [IsManager], [LearnNowadays], [DateOfLeave]) VALUES (N'053334560', N'053334560', N'יעקב', N'יעקבסון', NULL, N'039093579', N'0573193579', NULL, 2, N'רוזובסקי', 3, NULL, NULL, N'', CAST(N'1900-01-01' AS Date), 9, 1, 1, NULL, 1, NULL)
INSERT [dbo].[Users] ([Identity], [UserName], [FirstName], [LastName], [Email], [Telephon], [CellularTelephone1], [CellularTelephone2], [City], [Street], [BuildingNumber], [HomeNumber], [ZipCode], [BirthDate_hebrew], [BirthDate_gregorian], [Children], [FullDay], [DoingTest], [IsManager], [LearnNowadays], [DateOfLeave]) VALUES (N'311234560', N'311234560', N'נתן', N'רוזנברג', NULL, N'036190787', N'0504150760', NULL, 1, N'דבורה הנביאה', 4, NULL, NULL, N'', CAST(N'1900-01-01' AS Date), 8, 1, 1, NULL, 1, NULL)
INSERT [dbo].[Users] ([Identity], [UserName], [FirstName], [LastName], [Email], [Telephon], [CellularTelephone1], [CellularTelephone2], [City], [Street], [BuildingNumber], [HomeNumber], [ZipCode], [BirthDate_hebrew], [BirthDate_gregorian], [Children], [FullDay], [DoingTest], [IsManager], [LearnNowadays], [DateOfLeave]) VALUES (N'336201686', N'0', N'שמואל', N'רופשיץ', NULL, N'035705378', N'0527657166', NULL, 1, N'רשב"ם', 5, NULL, NULL, N'', CAST(N'1900-01-01' AS Date), 9, 1, 1, NULL, 1, NULL)
ALTER TABLE [dbo].[Scholarships] ADD  CONSTRAINT [DF_Scholarships_Musar]  DEFAULT ((1)) FOR [Musar]
GO
ALTER TABLE [dbo].[Scholarships] ADD  CONSTRAINT [DF_Scholarships_SumForMusar]  DEFAULT ((0)) FOR [SumForMusar]
GO
ALTER TABLE [dbo].[Scholarships] ADD  CONSTRAINT [DF_Scholarships_SumForAbsence]  DEFAULT ((0)) FOR [SumForAbsence]
GO
ALTER TABLE [dbo].[Scholarships] ADD  CONSTRAINT [DF_Scholarships_SumForShmiratSdarim]  DEFAULT ((0)) FOR [SumForShmiratSdarim]
GO
ALTER TABLE [dbo].[Scholarships] ADD  CONSTRAINT [DF_Scholarships_SumForAtmada]  DEFAULT ((0)) FOR [SumForAtmada]
GO
ALTER TABLE [dbo].[Scholarships] ADD  CONSTRAINT [DF_Scholarships_SumForMark]  DEFAULT ((0)) FOR [SumForMark]
GO
ALTER TABLE [dbo].[Scholarships] ADD  CONSTRAINT [DF_Scholarships_Confirm]  DEFAULT ((0)) FOR [Confirm]
GO
ALTER TABLE [dbo].[Scholarships] ADD  CONSTRAINT [DF_Scholarships_RefundTransportation]  DEFAULT ((0)) FOR [RefundTransportation]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_ToraMen_children]  DEFAULT ((0)) FOR [Children]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_ToraMen_fullDay]  DEFAULT ((1)) FOR [FullDay]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_ToraMen_doingTexts]  DEFAULT ((1)) FOR [DoingTest]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_ToraMen_IsManager]  DEFAULT ((0)) FOR [IsManager]
GO
ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_LearnNowadays]  DEFAULT ((1)) FOR [LearnNowadays]
GO
ALTER TABLE [dbo].[BankAccounts]  WITH CHECK ADD  CONSTRAINT [FK_BankAccounts_Users] FOREIGN KEY([Identity])
REFERENCES [dbo].[Users] ([Identity])
GO
ALTER TABLE [dbo].[BankAccounts] CHECK CONSTRAINT [FK_BankAccounts_Users]
GO
ALTER TABLE [dbo].[Loans]  WITH CHECK ADD  CONSTRAINT [FK_Loans_Users] FOREIGN KEY([BorrowerIdentity])
REFERENCES [dbo].[Users] ([Identity])
GO
ALTER TABLE [dbo].[Loans] CHECK CONSTRAINT [FK_Loans_Users]
GO
ALTER TABLE [dbo].[Scholarships]  WITH CHECK ADD  CONSTRAINT [FK_Scholarships_Users] FOREIGN KEY([Identity])
REFERENCES [dbo].[Users] ([Identity])
GO
ALTER TABLE [dbo].[Scholarships] CHECK CONSTRAINT [FK_Scholarships_Users]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_City1] FOREIGN KEY([City])
REFERENCES [dbo].[City] ([Id])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_City1]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'only yes(1) or no(0)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Scholarships', @level2type=N'COLUMN',@level2name=N'Musar'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'only yes(1) or no(0)
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'Children'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'only yes(1) or no(0)' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'FullDay'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'only yes(1) or no(0)
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users', @level2type=N'COLUMN',@level2name=N'DoingTest'
GO
USE [master]
GO
ALTER DATABASE [MilgaPluseDB] SET  READ_WRITE 
GO
