using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Ads
{
    public class Edit
    {
        public class Command : IRequest
        {
        public Guid Id { get; set; }
        // public User Owner { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public double? Price { get; set; }
        public bool? isBanner { get; set; }
        public bool? isSlideshow { get; set; }
        public string MainImage { get; set; }
        public string BannerImage { get; set; }
        public string SlideshowImage { get; set; }
        public DateTime? dateCreated { get; set; }
        public DateTime? expirationDate { get; set; }
        public string Status { get; set; }
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
                var ad = await _context.Ads.FindAsync(request.Id);
                if (ad == null)
                {
                    throw new Exception("Could not find ad");
                }
                ad.Title = request.Title ?? ad.Title;
                ad.Type = request.Type ?? ad.Type;
                ad.Price = request.Price ?? ad.Price;
                ad.isBanner = request.isBanner ?? ad.isBanner;
                ad.isSlideshow = request.isSlideshow ?? ad.isSlideshow;
                ad.MainImage = request.MainImage ?? ad.MainImage;
                ad.BannerImage = request.BannerImage ?? ad.BannerImage;
                ad.SlideshowImage = request.SlideshowImage ?? ad.SlideshowImage;
                ad.dateCreated = request.dateCreated ?? ad.dateCreated;
                ad.expirationDate = request.expirationDate ?? ad.expirationDate;
                ad.Status = request.Status ?? ad.Status;

                //handler logic
                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                {
                    return Unit.Value;
                }
                else
                {
                    throw new Exception("Problem saving changes");
                }
            }
        }
    }
}