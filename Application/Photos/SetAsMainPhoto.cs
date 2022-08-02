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
    public class SetAsMainPhoto
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }  
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccesor;

            public Handler(DataContext context, IUserAccessor userAccesor)
            {
                this.context = context;
                this.userAccesor = userAccesor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == userAccesor.GetUsername());

                if(user == null)
                {
                    return null;
                }

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

                if(photo == null) { return null; }

                var currentPhoto = user.Photos.FirstOrDefault(x => x.IsMainPhoto);

                if(currentPhoto != null)
                {
                    currentPhoto.IsMainPhoto = false;
                }

                currentPhoto.IsMainPhoto = true;

                var success = await context.SaveChangesAsync() > 0;

                if (success)
                {
                    return Result<Unit>.Success(Unit.Value);
                }

                return Result<Unit>.Failure("Problem while setting main photo.");

            }
        }
    }
}
