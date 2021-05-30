using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Ads
{
    public class Create
    {
        public class Command : IRequest
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
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var ad = new Ad
                {
                    Id = request.Id,
                    Title = request.Title,
                    Type = request.Type,
                    Price = request.Price,
                    isBanner = request.isBanner,
                    isSlideshow = request.isSlideshow,
                    MainImage = request.MainImage,
                    BannerImage = request.BannerImage,
                    SlideshowImage = request.SlideshowImage,
                    dateCreated = request.dateCreated,
                    expirationDate = request.expirationDate,
                };
                _context.Ads.Add(ad);
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                else throw new Exception("Problem saving changes");
            }
        }
    }
}