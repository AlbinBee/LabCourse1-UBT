using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            //organizer needed as a foreign key
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime DateCreated { get; set; }
            public DateTime DateOfEvent { get; set; }
            public string City { get; set; }
            public string MainImage { get; set; }
            public string GalleryImages { get; set; }
            public bool isBookable { get; set; }
            public bool hasTickets { get; set; }
            public int AvailableTickets { get; set; }
            public int Views { get; set; }
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
                var myEvent = new Event
                {
                        Id = request.Id,
                        Title = request.Title,
                        Description = request.Description,
                        Category = request.Category,
                        DateCreated = request.DateCreated,
                        DateOfEvent = request.DateOfEvent,
                        City = request.City,
                        MainImage = request.MainImage,
                        GalleryImages = request.GalleryImages,
                        isBookable = request.isBookable,
                        hasTickets = request.hasTickets,
                        AvailableTickets = request.AvailableTickets,
                        Views = request.Views,
                        Extra1 = request.Extra1,
                        Extra2 = request.Extra2,
                        Extra3 = request.Extra3,
                        Extra4 = request.Extra4,
                        Status = request.Status
                };
                _context.Events.Add(myEvent);
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                else throw new Exception("Problem saving changes");
            }
        }
    }
}