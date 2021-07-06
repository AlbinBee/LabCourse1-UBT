using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Categories
{
    public class Edit
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            // public virtual ICollection<Photo> Photos { get; set; }
            public virtual ICollection<Event> Events { get; set; }

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

                category.Title = request.Title ?? category.Title;
                category.Description = request.Description ?? category.Description;

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                else throw new Exception("Problem saving changes");
            }
        }
    }
}