using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class Event
    {
        public Guid Id { get; set; }
        //organizer needed as a foreign key
        public string Title { get; set; }
        public string Description { get; set; }
        public int? CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public virtual Category Category { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateOfEvent { get; set; }
        public string City { get; set; }
        public string MainImage { get; set; }
        // public virtual Photo MainImage { get; set; }
        public virtual ICollection<Photo> GalleryImages { get; set; }
        public bool isBookable { get; set; }
        public bool hasTickets { get; set; }
        public int AvailableTickets { get; set; }
        public int Views { get; set; }
        public string Extra1 { get; set; }
        public string Extra2 { get; set; }
        public string Extra3 { get; set; }
        public string Extra4 { get; set; }
        public string Status { get; set; }
        public Guid? AuthorId { get; set; }
        [ForeignKey("AuthorId")]
        public virtual AppUser Author { get; set; }

    }
}