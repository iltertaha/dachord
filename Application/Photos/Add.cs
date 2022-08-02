using Application.core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext context;
            private readonly IPhotoAccessor photoAccessor;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                this.context = context;
                this.photoAccessor = photoAccessor;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await this.context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == this.userAccessor.GetUsername());

                if(user == null) { return null; }

                var photoUploadResult = await this.photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if(!user.Photos.Any( x => x.IsMainPhoto))
                {
                    photo.IsMainPhoto = true;
                }

                user.Photos.Add(photo);

                var result = await context.SaveChangesAsync() > 0;

                if (result) { return Result<Photo>.Success(photo); }

                return Result<Photo>.Failure("Problem while adding photo");
            }
        }
    }
}
