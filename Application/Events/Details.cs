using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Events
{
    public class Details
    {
        public class Query : IRequest<EventDto>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, EventDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<EventDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var myEvent = await _context.Events.FindAsync(request.Id);

                if (myEvent == null)
                    throw new RestException(HttpStatusCode.NotFound, new { myEvent = "Not Found" });

                var eventToReturn = _mapper.Map<Event, EventDto>(myEvent);

                return eventToReturn;
            }
        }
    }
}