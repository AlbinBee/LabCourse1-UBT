using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection.Metadata;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Application.Photos
{
    public class AddEventPhoto
    {
        public class Command : IRequest<Photo>
        {
            public Guid Id { get; set; }
            public IFormFile File { get; set; }

        }

        public class Handler : IRequestHandler<Command, Photo>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
            }

            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {
                var myEvent = await _context.Events.FindAsync(request.Id);
                if (myEvent == null)
                    throw new RestException(HttpStatusCode.NotFound, new { myEvent = "Not Found" });

                var photoUploadResult = _photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if (!myEvent.GalleryImages.Any(x => x.IsMain))
                    photo.IsMain = true;

                myEvent.GalleryImages.Add(photo);

                //handler logic
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return photo;

                else
                {
                    throw new Exception("Problem saving changes");
                }
            }
        }
    }
}