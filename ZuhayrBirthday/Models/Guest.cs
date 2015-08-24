using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ZuhayrBirthday.Models
{
    public class Guest
    {
        public string PhoneId { get; set; }
        public string Name { get; set; }
        public bool IsConfirmed { get; set;}
        public int AdultCount { get; set; }
        public int ChildrenCount { get; set; }
        public int InfantCount { get; set; }
        public int ConfirmedAdultCount { get; set; }
        public int ConfirmedChildrenCount { get; set; }
        public int ConfirmedInfantCount { get; set; }
    }
}