using System.Collections.Generic;
using System.Threading.Tasks;
using Application.User;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class UsersController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<AppUserDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }
    }
}