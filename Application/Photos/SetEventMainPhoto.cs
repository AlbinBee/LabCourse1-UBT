using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Persistence;

namespace Application.Photos
{
    public class SetEventMainPhoto
    {
        public class Command : IRequest
        {
            public Guid EventId { get; set; }
            public string PhotoId { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var myEvent = await _context.Events.FindAsync(request.EventId);
                if (myEvent == null)
                    throw new RestException(HttpStatusCode.NotFound, new { myEvent = "Not Found" });

                var photo = myEvent.GalleryImages.FirstOrDefault(x => x.Id == request.PhotoId);
                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Photo = "Not Found" });

                var currentMain = myEvent.GalleryImages.FirstOrDefault(x => x.IsMain);

                if (!myEvent.GalleryImages.Any(x => x.IsMain))
                {
                    photo.IsMain = true;
                }
                else
                {
                    currentMain.IsMain = false;
                    photo.IsMain = true;
                }

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}