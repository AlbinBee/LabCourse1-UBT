using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Emails
{
    public class Details
    {
        public class Query : IRequest<Email>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Email>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Email> Handle(Query request, CancellationToken cancellationToken)
            {
                var email = await _context.Emails.FindAsync(request.Id);

                return email;
            }
        }
    }
}