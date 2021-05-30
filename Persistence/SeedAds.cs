using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class SeedAds
    {
        public static void SeedAdData(DataContext context)
        {
            if (!context.Ads.Any())
            {
                var ads = new List<Ad>{
                    new Ad{
                        Title = "Ad 1",
                        Type = "premium",
                        Price = 29.99,
                        isBanner = true,
                        isSlideshow = true,
                        MainImage = "imagePath",
                        BannerImage = "imagePath",
                        SlideshowImage = "imagePath",
                        dateCreated = DateTime.Now,
                        expirationDate = DateTime.Now.AddMonths(3)
                    },
                    new Ad{
                        Title = "Ad 2",
                        Type = "standard",
                        Price = 19.99,
                        isBanner = true,
                        isSlideshow = false,
                        MainImage = "imagePath",
                        BannerImage = "imagePath",
                        SlideshowImage = "imagePath",
                        dateCreated = DateTime.Now,
                        expirationDate = DateTime.Now.AddMonths(2)
                    },
                    new Ad{
                        Title = "Ad 3",
                        Type = "deluxe",
                        Price = 39.99,
                        isBanner = true,
                        isSlideshow = true,
                        MainImage = "imagePath",
                        BannerImage = "imagePath",
                        SlideshowImage = "imagePath",
                        dateCreated = DateTime.Now,
                        expirationDate = DateTime.Now.AddMonths(5)
                    },
                };
                context.Ads.AddRange(ads);
                context.SaveChanges();
            }
        }
    }
}