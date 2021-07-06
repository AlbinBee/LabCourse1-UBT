
using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class SeedEvents
    {
        public static void SeedEventData(DataContext context)
        {
            if (!context.Categories.Any())
            {
                var categories = new List<Category>
                {
                    new Category{
                        Title = "Uncategorized",
                        Description = "Non categorized events goes here",
                        // Photos = null,
                        // Events = null
                    },
                    new Category{
                        Title = "Jobs",
                        Description = "Job related events goes here",
                        // Photos = null,
                        // Events = null
                    },
                    new Category{
                        Title = "Events",
                        Description = "Event related events goes here",
                        // Photos = null,
                        // Events = null
                    },
                    new Category{
                        Title = "Bookings",
                        Description = "Booking related events goes here",
                        // Photos = null,
                        // Events = null
                    },
                };
            }
            if (!context.Events.Any())
            {
                var events = new List<Event>{
                    new Event{
                        Title = "Event 1",
                        Description = "First Event here",
                        // Category = null,
                        DateCreated = DateTime.Now,
                        DateOfEvent = DateTime.Now.AddMonths(2),
                        City = "Ferizaj",
                        GalleryImages = null,
                        isBookable = true,
                        hasTickets = true,
                        AvailableTickets = 100,
                        Views = 20,
                        Extra1 = "Extra1",
                        Extra2 = "Extra2",
                        Extra3 = "Extra3",
                        Extra4 = "Extra4",
                        Status = "active"
                    },
                    new Event{
                        Title = "Event 2",
                        Description = "Second Event here",
                        // Category = null,
                        DateCreated = DateTime.Now,
                        DateOfEvent = DateTime.Now.AddMonths(3),
                        City = "Prishtine",
                        GalleryImages = null,
                        isBookable = true,
                        hasTickets = true,
                        AvailableTickets = 20,
                        Views = 10,
                        Extra1 = "Extra1",
                        Extra2 = "Extra2",
                        Extra3 = "Extra3",
                        Extra4 = "Extra4",
                        Status = "active"
                    },
                    new Event{
                        Title = "Event 3",
                        Description = "Third Event here",
                        // Category = null,
                        DateCreated = DateTime.Now,
                        DateOfEvent = DateTime.Now.AddMonths(4),
                        City = "Prizren",
                        GalleryImages = null,
                        isBookable = false,
                        hasTickets = false,
                        AvailableTickets = 120,
                        Views = 45,
                        Extra1 = "Extra1",
                        Extra2 = "Extra2",
                        Extra3 = "Extra3",
                        Extra4 = "Extra4",
                        Status = "active"
                    },
                    new Event{
                        Title = "Event 4",
                        Description = "Fourth Event here",
                        // Category = null,
                        DateCreated = DateTime.Now,
                        DateOfEvent = DateTime.Now.AddMonths(4),
                        City = "Gjilan",
                        GalleryImages = null,
                        isBookable = false,
                        hasTickets = true,
                        AvailableTickets = 20,
                        Views = 10,
                        Extra1 = "Extra1",
                        Extra2 = "Extra2",
                        Extra3 = "Extra3",
                        Extra4 = "Extra4",
                        Status = "active",
                        // Category = new Category
                        // {
                        //     new Category
                        //     {
                        //         Title = "Uncategorized",
                        //         Description = "",
                                
                        //     }
                        // }
                    },
                };

                context.Events.AddRange(events);
                context.SaveChanges();
            }
        }
    }
}

