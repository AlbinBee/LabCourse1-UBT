using System;
namespace Domain
{
    public class MyTask
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DeadlineDate { get; set; }
    }
}