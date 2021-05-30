using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Ads
{
    public class List
    {
        public class Query : IRequest<List<Ad>> { }

        public class Handler : IRequestHandler<Query, List<Ad>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Ad>> Handle(Query request, CancellationToken cancellationToken)
            {
                var ads = await _context.Ads.ToListAsync();

                return ads;
            }
        }
    }
}