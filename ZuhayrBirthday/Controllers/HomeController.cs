using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using ZuhayrBirthday.Models;

namespace ZuhayrBirthday.Controllers
{
    public class HomeController : Controller
    {
        private GuestDBContext _dbContext;
        private JavaScriptSerializer _serializer;

        public HomeController()
        {
            _dbContext = new GuestDBContext();
            _serializer = new JavaScriptSerializer();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Confirm(Guest guest)
        {
            var result = "Success";
            try
            {
                _dbContext.UpdateGuest(guest);
            }
            catch (Exception)
            {
                result = "Error";
            }
            return Json(new { Result = result }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Login(Guest guest)
        {
            Guest jsonGuest = _dbContext.GetGuest(guest.PhoneId);
            if (jsonGuest != null)
            {
                return Json(new { Result = "Success", JsonGuest = _serializer.Serialize(jsonGuest) }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { Result = "Error" }, JsonRequestBehavior.AllowGet);
        }
    }
}