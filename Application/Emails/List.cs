using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Emails
{
    public class List
    {
        public class Query : IRequest<List<Email>> { }

        public class Handler : IRequestHandler<Query, List<Email>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Email>> Handle(Query request, CancellationToken cancellationToken)
            {
                var emails = await _context.Emails.ToListAsync();

                return emails;
            }
        }
    }
}