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

        public ActionResult Index(string id = "0")
        {
            Guest model = _dbContext.GetGuest(id);
            ViewBag.Json = _serializer.Serialize(model);
            return View(model);
        }

        public ActionResult UpdateGuest(Guest guest)
        {
            var result = "Success";
            try
            {
                _dbContext.UpdateGuest(guest);
            }
            catch (Exception ex)
            {

                result = "Error";
            }
            return Json(new { Result = result }, JsonRequestBehavior.AllowGet);
        }
    }
}