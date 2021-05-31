using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Users
{
    public class Edit
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
        public int? Age { get; set; }
        public bool? isPremium { get; set; }
        public DateTime? DateRegistered { get; set; }
        public string City { get; set; }
        public string AvatarImage { get; set; }
        public string Extra1 { get; set; }
        public string Status { get; set; }
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
                if (user == null)
                {
                    throw new Exception("Could not find event");
                }
                user.Username = request.Username ?? user.Username;
                user.FirstName = request.FirstName ?? user.FirstName;
                user.LastName = request.LastName ?? user.LastName;
                user.Password = request.Password ?? user.Password;
                user.Email = request.Email ?? user.Email;
                user.Age = request.Age ?? user.Age;
                user.Role = request.Role ?? user.Role;
                user.isPremium = request.isPremium ?? user.isPremium;
                user.DateRegistered = request.DateRegistered ?? user.DateRegistered;
                user.City = request.City ?? user.City;
                user.AvatarImage = request.AvatarImage ?? user.AvatarImage;
                user.Extra1 = request.Extra1 ?? user.Extra1;
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