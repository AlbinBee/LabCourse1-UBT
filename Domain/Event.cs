using System;

namespace Domain
{
    public class Event
    {
        public Guid Id { get; set; }
        //organizer needed as a foreign key
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateOfEvent { get; set; }
        public string City { get; set; }
        public string MainImage { get; set; }
        public string GalleryImages { get; set; }
        public bool isBookable { get; set; }
        public bool hasTickets { get; set; }
        public int AvailableTickets { get; set; }
        public int Views { get; set; }
        public string Extra1 { get; set; }
        public string Extra2 { get; set; }
        public string Extra3 { get; set; }
        public string Extra4 { get; set; }
        public string Status { get; set; }
    }
}