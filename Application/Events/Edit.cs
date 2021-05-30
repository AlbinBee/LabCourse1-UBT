using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            //organizer needed as a foreign key
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? DateCreated { get; set; }
            public DateTime? DateOfEvent { get; set; }
            public string City { get; set; }
            public string MainImage { get; set; }
            public string GalleryImages { get; set; }
            public bool? isBookable { get; set; }
            public bool? hasTickets { get; set; }
            public int? AvailableTickets { get; set; }
            public int? Views { get; set; }
            public string Extra1 { get; set; }
            public string Extra2 { get; set; }
            public string Extra3 { get; set; }
            public string Extra4 { get; set; }
            public string Status { get; set; }
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
                var myEvent = await _context.Events.FindAsync(request.Id);
                if (myEvent == null)
                {
                    throw new Exception("Could not find event");
                }
                myEvent.Title = request.Title ?? myEvent.Title;
                myEvent.Description = request.Description ?? myEvent.Description;
                myEvent.Category = request.Category ?? myEvent.Category;
                myEvent.DateCreated = request.DateCreated ?? myEvent.DateCreated;
                myEvent.DateOfEvent = request.DateOfEvent ?? myEvent.DateOfEvent;
                myEvent.City = request.City ?? myEvent.City;
                myEvent.MainImage = request.MainImage ?? myEvent.MainImage;
                myEvent.GalleryImages = request.GalleryImages ?? myEvent.GalleryImages;
                myEvent.isBookable = request.isBookable ?? myEvent.isBookable;
                myEvent.hasTickets = request.hasTickets ?? myEvent.hasTickets;
                myEvent.AvailableTickets = request.AvailableTickets ?? myEvent.AvailableTickets;
                myEvent.Views = request.Views ?? myEvent.Views;
                myEvent.Extra1 = request.Extra1 ?? myEvent.Extra1;
                myEvent.Extra2 = request.Extra2 ?? myEvent.Extra2;
                myEvent.Extra3 = request.Extra3 ?? myEvent.Extra3;
                myEvent.Extra4 = request.Extra4 ?? myEvent.Extra4;
                myEvent.Status = request.Status ?? myEvent.Status;

                //handler logic
                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                {
                    return Unit.Value;
                }
                else
                {
                    throw new Exception("Problem saving changes");
                }
            }
        }
    }
}