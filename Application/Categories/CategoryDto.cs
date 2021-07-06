using System.Collections.Generic;
using Application.Events;
using Domain;

namespace Application.Categories
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        // public virtual ICollection<Photo> Photos { get; set; }
        public virtual ICollection<EventDto> Events { get; set; }
    }
}