using System.Collections.Generic;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class AppUserDto : IdentityUser
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Status { get; set; }
        // public virtual ICollection<UserActivity> UserActivities { get; set; }
        public virtual ICollection<Photo> Photos { get; set; }
    }
}