using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Users
{
    public class Create
    {
        public class Command : IRequest
        {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public int Age { get; set; }
        public bool isPremium { get; set; }
        public DateTime DateRegistered { get; set; }
        public string City { get; set; }
        public string AvatarImage { get; set; }
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
                var user = new User
                {
                        Id = request.Id,
                        Username = request.Username,
                        FirstName = request.FirstName,
                        LastName = request.LastName,
                        Password = request.Password,
                        Email = request.Email,
                        Role = request.Role,
                        Age = request.Age,
                        isPremium = request.isPremium,
                        DateRegistered = request.DateRegistered,
                        City = request.City,
                        AvatarImage = request.AvatarImage,
                        Extra1 = request.Extra1
                };
                _context.Users.Add(user);
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                else throw new Exception("Problem saving changes");
            }
        }
    }
}