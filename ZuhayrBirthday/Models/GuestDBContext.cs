using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Xml.Linq;

namespace ZuhayrBirthday.Models
{
    public class GuestDBContext
    {
        private XDocument _xdoc;

        public GuestDBContext()
        {
            _xdoc = XDocument.Load(Path.Combine(HostingEnvironment.ApplicationPhysicalPath, @"App_Data\GuestData.xml"));
        }

        public Guest GetGuest(string phoneId)
        {
            return GetAllGuestData().Where(x => x.PhoneId == phoneId).FirstOrDefault();
        }

        public void UpdateGuest(Guest guest)
        {
            XElement element = _xdoc.Descendants("Guest").FirstOrDefault(x => x.Element("PhoneId").Value == guest.PhoneId.ToString());
            if (element != null)
            {
                element.Element("IsConfirmed").Value = guest.IsConfirmed.ToString();
                element.Element("ConfirmedAdultCount").Value = guest.ConfirmedAdultCount.ToString();
                element.Element("ConfirmedChildrenCount").Value = guest.ConfirmedChildrenCount.ToString();
                element.Element("ConfirmedInfantCount").Value = guest.ConfirmedInfantCount.ToString();
            }
            _xdoc.Save(Path.Combine(HostingEnvironment.ApplicationPhysicalPath, @"App_Data\GuestData.xml"));
        }

        public IList<Guest> GetConfirmedGuestList()
        {
            return GetAllGuestData().Where(x => x.IsConfirmed).ToList();
        }



        public IList<Guest> GetAllGuestData()
        {
            try
            {
                return _xdoc.Descendants("Guest").Select(x => new Guest()
                {
                    PhoneId = x.Element("PhoneId").Value,
                    Name = x.Element("Name").Value,
                    IsConfirmed = bool.Parse(x.Element("IsConfirmed").Value),
                    AdultCount = int.Parse(x.Element("AdultCount").Value),
                    ChildrenCount = int.Parse(x.Element("ChildrenCount").Value),
                    InfantCount = int.Parse(x.Element("InfantCount").Value),
                    ConfirmedAdultCount = int.Parse(x.Element("ConfirmedAdultCount").Value),
                    ConfirmedChildrenCount = int.Parse(x.Element("ConfirmedChildrenCount").Value),
                    ConfirmedInfantCount = int.Parse(x.Element("ConfirmedInfantCount").Value)
                }).ToList();
            }
            catch (Exception ex)
            {

                throw;
            }

        }
    }
}