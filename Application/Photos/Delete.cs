using Application.core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; } 

        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
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

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == userAccessor.GetUsername());

                if( user == null) { return null; }

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if( photo == null) { return null; };

                if (photo.IsMainPhoto) { return Result<Unit>.Failure("You can't delete main photo"); }

                var result = await photoAccessor.DeletePhoto(photo.Id);

                if(result == null)
                {
                    return Result<Unit>.Failure("Problem while deleting photo from photo service");
                }

                // happy path
                user.Photos.Remove(photo);

                var success = await context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("Problem while deleting photo from API");
            }
        }
    }
}
