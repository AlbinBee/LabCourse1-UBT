using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class AddToRole
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;
            public Handler(DataContext context, UserManager<AppUser> userManager, IUserAccessor userAccessor)
            {
                _userManager = userManager;
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Console.WriteLine("---------------");
                Console.WriteLine(request.Id);
                Console.WriteLine("---------------");
                // var user = await _context.Users.FindAsync(request.Id);

                var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername());

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { User = "Could not find user" });


                var roleResult = await _userManager.AddToRoleAsync(user, "SimpleUser");
                if (!roleResult.Succeeded)
                {
                    throw new RestException(HttpStatusCode.InternalServerError,
                        new { User = "Could not add role to user!" });
                }
                // var attendance = await _context.UserActivities
                //     .SingleOrDefaultAsync(x => x.ActivityId == activity.Id && 
                //         x.AppUserId == user.Id);

                // if (attendance != null)
                //     throw new RestException(HttpStatusCode.BadRequest,
                //         new { Attendance = "Already attending this activity" });

                // attendance = new UserActivity
                // {
                //     Activity = activity,
                //     AppUser = user,
                //     IsHost = false,
                //     DateJoined = DateTime.Now
                // };

                // _context.UserActivities.Add(attendance);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}