using System;
namespace Domain
{
    public class Email
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string UserEmail { get; set; }
        public string Status { get; set; }
        public DateTime DateCreated { get; set; }
        public string Extra1 { get; set; }

    }
}