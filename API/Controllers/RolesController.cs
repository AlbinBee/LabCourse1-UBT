using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RolesController : BaseController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMediator _mediator;
        public RolesController(UserManager<AppUser> userManager, IMediator mediator)
        {
            _userManager = userManager;
            _mediator = mediator;
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("delete-role/user={username}&role={role}")]
        public async Task<ActionResult> DeleteRole(string username, string role)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) throw new RestException(HttpStatusCode.NotFound, new { User = "Could not find user!" });
            var userRoles = await _userManager.GetRolesAsync(user);
            var result = await _userManager.RemoveFromRoleAsync(user, role);
            if (!result.Succeeded) throw new RestException(HttpStatusCode.BadRequest, new { User = "Could not delete role from user!" });
            return Ok(await _userManager.GetRolesAsync(user));
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("add-role/user={username}&role={role}")]
        public async Task<ActionResult> AddRole(string username, string role)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null) throw new RestException(HttpStatusCode.NotFound, new { User = "Could not find user!" });
            var userRoles = await _userManager.GetRolesAsync(user);
            var result = await _userManager.AddToRoleAsync(user, role);
            if (!result.Succeeded) throw new RestException(HttpStatusCode.BadRequest, new { User = "Could not add user to role!" });
            return Ok(await _userManager.GetRolesAsync(user));
        }
    }
}