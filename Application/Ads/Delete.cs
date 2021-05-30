using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Ads
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }

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
                var ad = await _context.Ads.FindAsync(request.Id);
                if (ad == null)
                {
                    throw new Exception("Could not find ad");
                }else{
                    _context.Remove(ad);
                }
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