using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
namespace Application.Categories
{
    public class Delete
    {

        public class Command : IRequest
        {
            public int Id { get; set; }

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
                var category = await _context.Categories.FindAsync(request.Id);
                if (category == null)
                {
                    throw new Exception("Could not find category");
                }
                else
                {
                    _context.Remove(category);
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