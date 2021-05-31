using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Emails
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public string UserEmail { get; set; }
            public string Status { get; set; }
            public DateTime? DateCreated { get; set; }
            public string Extra1 { get; set; }
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
                var email = await _context.Emails.FindAsync(request.Id);
                if (email == null)
                {
                    throw new Exception("Could not find email");
                }
                email.Title = request.Title ?? email.Title;
                email.Description = request.Description ?? email.Description;
                email.Category = request.Category ?? email.Category;
                email.UserEmail = request.UserEmail ?? email.UserEmail;
                email.Status = request.Status ?? email.Status;
                email.DateCreated = request.DateCreated ?? email.DateCreated;
                email.Extra1 = request.Extra1 ?? email.Extra1;

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