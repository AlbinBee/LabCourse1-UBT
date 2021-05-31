using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.MyTasks
{
    public class Details
    {
        public class Query : IRequest<MyTask>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, MyTask>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<MyTask> Handle(Query request, CancellationToken cancellationToken)
            {
                var myTask = await _context.MyTasks.FindAsync(request.Id);

                return myTask;
            }
        }
    }
}