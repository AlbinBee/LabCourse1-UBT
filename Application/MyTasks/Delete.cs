using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.MyTasks
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
                var myTask = await _context.MyTasks.FindAsync(request.Id);
                if (myTask == null)
                {
                    throw new Exception("Could not find myTask");
                }else{
                    _context.Remove(myTask);
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