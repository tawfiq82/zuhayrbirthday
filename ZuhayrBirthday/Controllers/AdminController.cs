using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ZuhayrBirthday.Models;

namespace ZuhayrBirthday.Controllers
{
    public class AdminController : Controller
    {
        private GuestDBContext _dbContext;

        public AdminController()
        {
            _dbContext = new GuestDBContext();
        }

        public ActionResult Index()
        {
            IList<Guest> guests = _dbContext.GetAllGuestData();
            return View(guests);
        }
    }
}