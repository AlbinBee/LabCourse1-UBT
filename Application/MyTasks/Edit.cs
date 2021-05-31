using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.MyTasks
{
    public class Edit
    {
        public class Command : IRequest
        {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DeadlineDate { get; set; }
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
                }
                myTask.Title = request.Title ?? myTask.Title;
                myTask.Description = request.Description ?? myTask.Description;
                myTask.Category = request.Category ?? myTask.Category;
                myTask.Status = request.Status ?? myTask.Status;
                myTask.Priority = request.Priority ?? myTask.Priority;
                myTask.DateCreated = request.DateCreated ?? myTask.DateCreated;
                myTask.DeadlineDate = request.DeadlineDate ?? myTask.DeadlineDate;

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