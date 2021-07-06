using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace Application.Categories
{
    public class Create
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
                if (await _context.Categories.Where(x => x.Title == request.Title).AnyAsync() || await _context.Categories.Where(x => x.Id == request.Id).AnyAsync())
                    throw new RestException(HttpStatusCode.BadRequest, new { Category = "Category " + request.Title+" already exists" });

                var category = new Category
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Events = request.Events
                };
                _context.Categories.Add(category);
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                else throw new Exception("Problem saving changes");
            }
        }
    }
}