using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Details
    {
        public class Query : IRequest<Event>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Event>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Event> Handle(Query request, CancellationToken cancellationToken)
            {
                var myEvent = await _context.Events.FindAsync(request.Id);

                if (myEvent == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new {myEvent = "Not Found"});
                }

                return myEvent;
            }
        }
    }
}