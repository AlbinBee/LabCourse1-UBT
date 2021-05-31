using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.MyTasks
{
    public class Create
    {
        public class Command : IRequest
        {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DeadlineDate { get; set; }
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
                var myTask = new MyTask
                {
                        Id = request.Id,
                        Title = request.Title,
                        Description = request.Description,
                        Category = request.Category,
                        Status = request.Status,
                        Priority = request.Priority,
                        DateCreated = request.DateCreated,
                        DeadlineDate = request.DeadlineDate,
                };
                _context.MyTasks.Add(myTask);
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                else throw new Exception("Problem saving changes");
            }
        }
    }
}