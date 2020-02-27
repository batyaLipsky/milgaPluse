export class user {
    Identity: string;
    UserName:string;
    FirstName: string;
    LastName: string;
    Email: string;
    Telephon: string;
    CellularTelephone1: string;
    CellularTelephone2: string;
    City: number;
    Street: string;
    BuildingNumber: number;
    HomeNumber: number;
    ZipCode: number;
    BirthDate_hebrew: string;
    BirthDate_gregorian: Date;
    Children: number;
    FullDay: boolean;
    DoingTest: boolean;
  
    IsManager: boolean;
    LearnNowadays:boolean;
    DateOfLeave:Date;
    // LearnMusar: boolean;
}
// Scholarships


export enum userDataEnum {
    identity="מספר זהות",
    firstName = "שם פרטי",
    lastName = "שם משפחה",
    email = "מייל",
    telephon = "טלפון",
    cellularTelephone1 = "נייד (1)",
    cellularTelephone2 = "נייד (2)",
    address = "כתובת",
    city = "עיר",
    zipCode = "מיקוד",
    birthDate = "תאריך לידה",
    children = "ילדים",
    fullDay = "לומד יום שלם",
    doingTest = "נבחן",
    refundTransportation = "החזר נסיעות",
    isManager = "ראש כולל",
    musar="מוסר"
}


