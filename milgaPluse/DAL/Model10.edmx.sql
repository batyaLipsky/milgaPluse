
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 08/29/2019 11:36:45
-- Generated from EDMX file: E:\milgaPluse\milgaPluse\DAL\Model10.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [MilgaPluseDB];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_Children_ToraMen]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Children] DROP CONSTRAINT [FK_Children_ToraMen];
GO
IF OBJECT_ID(N'[dbo].[FK_Scholarships_ToraMen]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[Scholarships] DROP CONSTRAINT [FK_Scholarships_ToraMen];
GO
IF OBJECT_ID(N'[dbo].[FK_ToraMen_ToraMen]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ToraMen] DROP CONSTRAINT [FK_ToraMen_ToraMen];
GO
IF OBJECT_ID(N'[dbo].[FK_ToraMen_ToraMen1]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[ToraMen] DROP CONSTRAINT [FK_ToraMen_ToraMen1];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[BankAccounts]', 'U') IS NOT NULL
    DROP TABLE [dbo].[BankAccounts];
GO
IF OBJECT_ID(N'[dbo].[Children]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Children];
GO
IF OBJECT_ID(N'[dbo].[City]', 'U') IS NOT NULL
    DROP TABLE [dbo].[City];
GO
IF OBJECT_ID(N'[dbo].[Documents]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Documents];
GO
IF OBJECT_ID(N'[dbo].[Loans]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Loans];
GO
IF OBJECT_ID(N'[dbo].[Scholarships]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Scholarships];
GO
IF OBJECT_ID(N'[dbo].[sysdiagrams]', 'U') IS NOT NULL
    DROP TABLE [dbo].[sysdiagrams];
GO
IF OBJECT_ID(N'[dbo].[ToraMen]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ToraMen];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'BankAccounts'
CREATE TABLE [dbo].[BankAccounts] (
    [AccountNumber] varchar(50)  NOT NULL,
    [Identity] varchar(50)  NOT NULL,
    [LastName] varchar(50)  NULL,
    [BankName] varchar(50)  NOT NULL,
    [BankNumber] varchar(50)  NOT NULL,
    [BranchNumber] varchar(50)  NOT NULL,
    [SumForLeft] int  NULL
);
GO

-- Creating table 'Children'
CREATE TABLE [dbo].[Children] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [BirthDate] datetime  NOT NULL,
    [LastName] varchar(50)  NOT NULL,
    [ParentIdentity] varchar(50)  NOT NULL,
    [Married] int  NOT NULL
);
GO

-- Creating table 'City'
CREATE TABLE [dbo].[City] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [City1] varchar(50)  NOT NULL
);
GO

-- Creating table 'Loans'
CREATE TABLE [dbo].[Loans] (
    [Date] datetime  NOT NULL,
    [LenderIdentity] varchar(50)  NOT NULL,
    [BorrowerIdentity] varchar(50)  NOT NULL,
    [TakeOrBack] bit  NOT NULL,
    [LastNameLender] varchar(50)  NOT NULL,
    [LastNameBorrower] varchar(50)  NOT NULL,
    [AccountNumberLender] varchar(50)  NULL,
    [AccountNumberBorrower] varchar(50)  NULL,
    [Aote] varchar(50)  NULL,
    [WayOfPay] varchar(50)  NULL
);
GO

-- Creating table 'Scholarships'
CREATE TABLE [dbo].[Scholarships] (
    [Identity] varchar(50)  NOT NULL,
    [Date] datetime  NOT NULL,
    [Basic] int  NOT NULL,
    [Musar] bit  NOT NULL,
    [Absence] int  NOT NULL,
    [NoteAbsence] varchar(50)  NULL,
    [ShmiratSdarim] int  NOT NULL,
    [Atmada] int  NOT NULL,
    [NoteAtmada] varchar(50)  NULL,
    [Mark] int  NULL,
    [ExcellenceScholarship] int  NULL,
    [HolidayScholarship] int  NULL,
    [NoteHolidayScholarship] varchar(50)  NULL,
    [ReligiousMinistry] int  NOT NULL,
    [Scholarships1] int  NOT NULL,
    [ScholarshipsAndLoan] int  NOT NULL,
    [Refund] int  NOT NULL,
    [Donation] int  NULL,
    [RemainderDebt] int  NOT NULL,
    [HebrewMonth] varchar(50)  NOT NULL,
    [HebrewYear] varchar(50)  NOT NULL,
    [Confirm] bit  NOT NULL,
    [SumForMusar] int  NULL,
    [SumForAbsence] int  NOT NULL,
    [SumForShmiratSdarim] int  NOT NULL,
    [SumForAtmada] int  NOT NULL,
    [SumForMark] int  NULL,
    [addToShmiratSdarimBecauseGoodTest] int  NULL,
    [Id] int IDENTITY(1,1) NOT NULL
);
GO

-- Creating table 'sysdiagrams'
CREATE TABLE [dbo].[sysdiagrams] (
    [name] nvarchar(128)  NOT NULL,
    [principal_id] int  NOT NULL,
    [diagram_id] int IDENTITY(1,1) NOT NULL,
    [version] int  NULL,
    [definition] varbinary(max)  NULL
);
GO

-- Creating table 'ToraMen'
CREATE TABLE [dbo].[ToraMen] (
    [Identity] varchar(50)  NOT NULL,
    [FirstName] varchar(50)  NOT NULL,
    [LastName] varchar(50)  NOT NULL,
    [Email] varchar(50)  NULL,
    [Telephon] varchar(50)  NULL,
    [CellularTelephone1] varchar(50)  NULL,
    [CellularTelephone2] varchar(50)  NULL,
    [City] int  NOT NULL,
    [Street] varchar(50)  NOT NULL,
    [BuildingNumber] int  NOT NULL,
    [HomeNumber] int  NULL,
    [ZipCode] int  NULL,
    [Children] int  NOT NULL,
    [FullDay] bit  NULL,
    [DoingTest] bit  NULL,
    [RefundTransportation] decimal(19,4)  NULL,
    [IsManager] bit  NULL,
    [LearnMusar] bit  NULL,
    [BirthDate_hebrew] varchar(50)  NOT NULL,
    [BirthDate_gregorian] datetime  NOT NULL
);
GO

-- Creating table 'Documents'
CREATE TABLE [dbo].[Documents] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [NameFile] varchar(100)  NULL,
    [DisplayName] varchar(50)  NOT NULL,
    [Extension] varchar(10)  NOT NULL,
    [ContentType] varchar(200)  NOT NULL,
    [FileData] varbinary(max)  NOT NULL,
    [FileSize] bigint  NOT NULL,
    [UploadDate] datetime  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [AccountNumber] in table 'BankAccounts'
ALTER TABLE [dbo].[BankAccounts]
ADD CONSTRAINT [PK_BankAccounts]
    PRIMARY KEY CLUSTERED ([AccountNumber] ASC);
GO

-- Creating primary key on [Id] in table 'Children'
ALTER TABLE [dbo].[Children]
ADD CONSTRAINT [PK_Children]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'City'
ALTER TABLE [dbo].[City]
ADD CONSTRAINT [PK_City]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Date] in table 'Loans'
ALTER TABLE [dbo].[Loans]
ADD CONSTRAINT [PK_Loans]
    PRIMARY KEY CLUSTERED ([Date] ASC);
GO

-- Creating primary key on [Identity], [HebrewMonth], [HebrewYear], [Date] in table 'Scholarships'
ALTER TABLE [dbo].[Scholarships]
ADD CONSTRAINT [PK_Scholarships]
    PRIMARY KEY CLUSTERED ([Identity], [HebrewMonth], [HebrewYear], [Date] ASC);
GO

-- Creating primary key on [diagram_id] in table 'sysdiagrams'
ALTER TABLE [dbo].[sysdiagrams]
ADD CONSTRAINT [PK_sysdiagrams]
    PRIMARY KEY CLUSTERED ([diagram_id] ASC);
GO

-- Creating primary key on [Identity] in table 'ToraMen'
ALTER TABLE [dbo].[ToraMen]
ADD CONSTRAINT [PK_ToraMen]
    PRIMARY KEY CLUSTERED ([Identity] ASC);
GO

-- Creating primary key on [Id] in table 'Documents'
ALTER TABLE [dbo].[Documents]
ADD CONSTRAINT [PK_Documents]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [ParentIdentity] in table 'Children'
ALTER TABLE [dbo].[Children]
ADD CONSTRAINT [FK_Children_ToraMen]
    FOREIGN KEY ([ParentIdentity])
    REFERENCES [dbo].[ToraMen]
        ([Identity])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_Children_ToraMen'
CREATE INDEX [IX_FK_Children_ToraMen]
ON [dbo].[Children]
    ([ParentIdentity]);
GO

-- Creating foreign key on [City] in table 'ToraMen'
ALTER TABLE [dbo].[ToraMen]
ADD CONSTRAINT [FK_ToraMen_City]
    FOREIGN KEY ([City])
    REFERENCES [dbo].[City]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_ToraMen_City'
CREATE INDEX [IX_FK_ToraMen_City]
ON [dbo].[ToraMen]
    ([City]);
GO

-- Creating foreign key on [Identity] in table 'Scholarships'
ALTER TABLE [dbo].[Scholarships]
ADD CONSTRAINT [FK_Scholarships_ToraMen]
    FOREIGN KEY ([Identity])
    REFERENCES [dbo].[ToraMen]
        ([Identity])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Identity] in table 'ToraMen'
ALTER TABLE [dbo].[ToraMen]
ADD CONSTRAINT [FK_ToraMen_ToraMen]
    FOREIGN KEY ([Identity])
    REFERENCES [dbo].[ToraMen]
        ([Identity])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating foreign key on [Identity] in table 'ToraMen'
ALTER TABLE [dbo].[ToraMen]
ADD CONSTRAINT [FK_ToraMen_ToraMen1]
    FOREIGN KEY ([Identity])
    REFERENCES [dbo].[ToraMen]
        ([Identity])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------