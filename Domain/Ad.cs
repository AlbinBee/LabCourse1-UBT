using System;

namespace Domain
{
    public class Ad
    {
        public Guid Id { get; set; }
        // public User Owner { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public double Price { get; set; }
        public bool isBanner { get; set; }
        public bool isSlideshow { get; set; }
        public string MainImage { get; set; }
        public string BannerImage { get; set; }
        public string SlideshowImage { get; set; }
        public DateTime dateCreated { get; set; }
        public DateTime expirationDate { get; set; }
        public string Status { get; set; }
    }
}