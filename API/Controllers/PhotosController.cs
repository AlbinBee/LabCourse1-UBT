using System;
using System.Threading.Tasks;
using Application.Photos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Photo>> Add([FromForm] Add.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }
        [HttpPost("addEventPhoto/eventId={id}")]
        public async Task<ActionResult<Photo>> AddEventPhoto(Guid id, [FromForm] AddEventPhoto.Command command)
        {
            return await Mediator.Send(new AddEventPhoto.Command { Id = id, File = command.File });
        }
        [HttpDelete("deleteEventPhoto/eventId={eventId}&photoId={id}")]
        public async Task<ActionResult<Unit>> DeleteEventPhoto(Guid eventId, string id)
        {
            return await Mediator.Send(new DeleteEventPhoto.Command { Id = id, EventId = eventId });
        }

        [HttpPost("setEventMainPhoto/eventId={eventId}&photoId={photoId}/setmain")]
        public async Task<ActionResult<Unit>> SetEventMainPhoto(Guid eventId, string photoId)
        {
            return await Mediator.Send(new SetEventMainPhoto.Command { EventId = eventId, PhotoId = photoId });
        }
        [HttpPost("{id}/setmain")]
        public async Task<ActionResult<Unit>> SetMain(string id)
        {
            return await Mediator.Send(new SetMain.Command { Id = id });
        }
    }
}