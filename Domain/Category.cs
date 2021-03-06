using System;
using System.Collections.Generic;

namespace Domain
{
    public class Category
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        // public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<Event> Events { get; set; }
    }
}