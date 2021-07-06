using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.User
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            //organizer needed as a foreign key
            public string DisplayName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Bio { get; set; }
            public string Status { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Status).NotEmpty();
            }
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
                var user = await _context.Users.FindAsync(request.Id);
                Console.WriteLine(request.Id);
                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { user = "Not Found" });
                }
                user.DisplayName = request.DisplayName ?? user.DisplayName;
                user.UserName = request.UserName ?? user.UserName;
                user.Email = request.Email ?? user.Email;
                user.Bio = request.Bio ?? user.Bio;
                user.Status = request.Status ?? user.Status;

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