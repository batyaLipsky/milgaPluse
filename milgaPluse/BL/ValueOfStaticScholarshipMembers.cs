using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public static class CurrentUserIsAdmin
    {
        public static bool IsAdmin = false;
        public static int WayToOpenManager=3;
        public static Nullable<int> DuringChangeWayToOpenManager = null;
    }

    [Serializable]
    public class ValueOfStaticScholarshipMembers
    {
        //<summary> data members
        private int basicFullDay;
        private int musar;
        private int shmiratSdarim;
        private int maxAbsenceForShmiratSdarim;
        private int discountPerAbsenceInMilga;
        private int atmadaFullDay;
        private int fullNumberAtmada;
        private int discountPerAtmada;
        private int test;
        private int minMarkForTestMilga;
        private int addMilgaTestToAtmda;
        private int excellenceScholarship;
        private int minExcellentMarkForMilga;
        private int staticScholarship;
        private int holidayScholarship;
        private string noteHolidayScholarship;
        private int religiousMinistryForFullDay;
        private int timeOfBeginMorningSeder;
        private int timeOfBeginAfternoonSeder;
        private string noteGeneral;

        //<summary> Properties
        public int BasicFullDay
        {
            get { return basicFullDay; }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)
                    basicFullDay = value;
            }
        }
        public int Musar
        {
            get
            {
                return musar;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)
                    musar = value;
            }
        }
        public int ShmiratSdarim
        {
            get
            {
                return shmiratSdarim;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    shmiratSdarim = value;
            }
        }
        public int MaxAbsenceForShmiratSdarimMilga
        {
            get
            {
                return maxAbsenceForShmiratSdarim;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    maxAbsenceForShmiratSdarim = value;
            }
        }
        public int DiscountPerAbsenceInMilga
        {
            get
            {
                return discountPerAbsenceInMilga;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    discountPerAbsenceInMilga = value;
            }
        }
        public int AtmadaFullDay
        {
            get
            {
                return atmadaFullDay;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    atmadaFullDay = value;
            }
        }
        public int FullNumberAtmada
        {
            get
            {
                return fullNumberAtmada;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    fullNumberAtmada = value;
            }
        }
        public int DiscountPerAtmadaMilga
        {
            get
            {
                return discountPerAtmada;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    discountPerAtmada = value;
            }
        }
        public int Test
        {
            get
            {
                return test;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    test = value;
            }
        }
        public int MinMarkForTestMilga
        {
            get
            {
                return minMarkForTestMilga;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    minMarkForTestMilga = value;
            }
        }
        public int AddMilgaTestToAtmda
        {
            get
            {
                return addMilgaTestToAtmda;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    addMilgaTestToAtmda = value;
            }
        }
        public int ExcellenceScholarship
        {
            get
            {
                return excellenceScholarship;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    excellenceScholarship = value;
            }
        }
        public int MinExcellentMarkForMilga
        {
            get
            {
                return minExcellentMarkForMilga;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    minExcellentMarkForMilga = value;
            }
        }
        public int HolidayScholarship
        {
            get
            {
                return holidayScholarship;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    holidayScholarship = value;
            }
        }
        public int Staticscholarship
        {
            get
            {
#pragma warning disable CS0472 // The result of the expression is always 'false' since a value of type 'int' is never equal to 'null' of type 'int?'
                if (staticScholarship == null)
#pragma warning restore CS0472 // The result of the expression is always 'false' since a value of type 'int' is never equal to 'null' of type 'int?'
                {
                    staticScholarship = 0;
                    return (int)staticScholarship;
                }
                else
                {
                    return staticScholarship;

                }
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)
                    staticScholarship = value;
            }
        }
        public string NoteHolidayScholarship
        {
            get
            {
                return noteHolidayScholarship;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    noteHolidayScholarship = value;
            }
        }
        public int ReligiousMinistryForFullDay
        {
            get
            {
                return religiousMinistryForFullDay;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    religiousMinistryForFullDay = value;
            }
        }
        public int TimeOfBeginMorningSeder
        {
            get
            {
                return timeOfBeginMorningSeder;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    timeOfBeginMorningSeder = value;
            }
        }
        public int TimeOfBeginAfternoonSeder
        {
            get
            {
                return timeOfBeginAfternoonSeder;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    timeOfBeginAfternoonSeder = value;
            }
        }
        public string NoteGeneral
        {
            get
            {
                return noteGeneral;
            }
            set
            {
                if (CurrentUserIsAdmin.IsAdmin)

                    noteGeneral = value;
            }
        }
    }
}

