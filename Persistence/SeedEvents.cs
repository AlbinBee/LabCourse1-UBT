
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
            if (!context.Events.Any())
            {
                var events = new List<Event>{
                    new Event{
                        Title = "Event 1",
                        Description = "First Event here",
                        Category = "Test",
                        DateCreated = DateTime.Now,
                        DateOfEvent = DateTime.Now.AddMonths(2),
                        City = "Ferizaj",
                        MainImage = "ImagePath",
                        GalleryImages = "ImagesPaths",
                        isBookable = true,
                        hasTickets = true,
                        AvailableTickets = 100,
                        Views = 20,
                        Extra1 = "Extra1",
                        Extra2 = "Extra2",
                        Extra3 = "Extra3",
                        Extra4 = "Extra4",
                        Status = "Active"
                    },
                    new Event{
                        Title = "Event 2",
                        Description = "Second Event here",
                        Category = "Test",
                        DateCreated = DateTime.Now,
                        DateOfEvent = DateTime.Now.AddMonths(3),
                        City = "Prishtine",
                        MainImage = "ImagePath",
                        GalleryImages = "ImagesPaths",
                        isBookable = true,
                        hasTickets = true,
                        AvailableTickets = 20,
                        Views = 10,
                        Extra1 = "Extra1",
                        Extra2 = "Extra2",
                        Extra3 = "Extra3",
                        Extra4 = "Extra4",
                        Status = "Active"
                    },
                    new Event{
                        Title = "Event 3",
                        Description = "Third Event here",
                        Category = "Test",
                        DateCreated = DateTime.Now,
                        DateOfEvent = DateTime.Now.AddMonths(4),
                        City = "Prizren",
                        MainImage = "ImagePath",
                        GalleryImages = "ImagesPaths",
                        isBookable = false,
                        hasTickets = false,
                        AvailableTickets = 120,
                        Views = 45,
                        Extra1 = "Extra1",
                        Extra2 = "Extra2",
                        Extra3 = "Extra3",
                        Extra4 = "Extra4",
                        Status = "Active"
                    },
                    new Event{
                        Title = "Event 4",
                        Description = "Fourth Event here",
                        Category = "Test",
                        DateCreated = DateTime.Now,
                        DateOfEvent = DateTime.Now.AddMonths(4),
                        City = "Gjilan",
                        MainImage = "ImagePath",
                        GalleryImages = "ImagesPaths",
                        isBookable = false,
                        hasTickets = true,
                        AvailableTickets = 20,
                        Views = 10,
                        Extra1 = "Extra1",
                        Extra2 = "Extra2",
                        Extra3 = "Extra3",
                        Extra4 = "Extra4",
                        Status = "Active"
                    },
                };

                context.Events.AddRange(events);
                context.SaveChanges();
            }
        }
    }
}

