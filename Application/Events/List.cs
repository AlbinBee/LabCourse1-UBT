using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Events
{
    public class List
    {
        public class Query : IRequest<List<EventDto>> { }

        public class Handler : IRequestHandler<Query, List<EventDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<EventDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var events = await _context.Events.ToListAsync();

                return _mapper.Map<List<Event>, List<EventDto>>(events);

            }
        }
    }
}