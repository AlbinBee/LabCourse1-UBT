using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Categories;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : BaseController
    {
        private readonly IMediator _mediator;
        public CategoriesController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<CategoryDto>>> List()
        {
            return await _mediator.Send(new List.Query());
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> Details(int id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await _mediator.Send(new Delete.Command { Id = id });
        }
    }
}