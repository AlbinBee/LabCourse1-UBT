using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Events;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EventsController : BaseController
    {
        [AllowAnonymous]
        [HttpGet]

        public async Task<ActionResult<List<EventDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<EventDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPut("{EventId}")]
        public async Task<ActionResult<Unit>> Edit(Guid EventId, Edit.Command command)
        {
            command.EventId = EventId;
            return await Mediator.Send(command);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
        [AllowAnonymous]
        [HttpPut("addView/{id}")]
        public async Task<ActionResult<Unit>> AddViewCount(Guid id)
        {
            return await Mediator.Send(new AddViewCount.Command { Id = id });
        }

    }
}