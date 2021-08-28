using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class DeleteEventPhoto
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public Guid EventId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var photo = await _context.Photos.SingleOrDefaultAsync(x => x.Id.Equals(request.Id));
                var myEvent = await _context.Events.SingleOrDefaultAsync(x => x.Id == request.EventId);

                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Photo = "Not Found" });

                if (photo.IsMain)
                    throw new RestException(HttpStatusCode.BadRequest, new { Photo = "Cannot delete event main photo" });

                var result = _photoAccessor.DeletePhoto(photo.Id);

                if (result == null)
                    throw new Exception("Problem deleting photo");

                myEvent.GalleryImages.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}