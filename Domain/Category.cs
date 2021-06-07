using System;

namespace Domain
{
    public class Category
    {
        public Guid Id { get; set; }
        // public User Owner { get; set; }
        public string Title { get; set; }
        public string MainImagePath { get; set; }
        public string IconPath { get; set; }
        public DateTime dateCreated { get; set; }
        public string Status { get; set; }
    }
}