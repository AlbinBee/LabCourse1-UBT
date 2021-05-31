using System;

namespace Domain
{
    public class User
    {
        //organizer needed as a foreign key
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
        public string Status { get; set; }
    }
}