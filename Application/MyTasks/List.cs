using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.MyTasks
{
    public class List
    {
        public class Query : IRequest<List<MyTask>> { }

        public class Handler : IRequestHandler<Query, List<MyTask>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<MyTask>> Handle(Query request, CancellationToken cancellationToken)
            {
                var myTasks = await _context.MyTasks.ToListAsync();

                return myTasks;
            }
        }
    }
}