using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Ads
{
    public class Details
    {
        public class Query : IRequest<Ad>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Ad>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Ad> Handle(Query request, CancellationToken cancellationToken)
            {
                var ad = await _context.Ads.FindAsync(request.Id);

                return ad;
            }
        }
    }
}