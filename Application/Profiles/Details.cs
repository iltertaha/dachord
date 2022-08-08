using System.Threading;
using System.Threading.Tasks;
using Application.core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Result<Profile>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Profile>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor) 
            {
                this.context = context;
                this.mapper = mapper;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await this.context.Users.ProjectTo<Profile>(mapper.ConfigurationProvider, new {currentUsername = userAccessor.GetUsername()})
                    .SingleOrDefaultAsync(x => x.Username == request.Username);

                if(user == null) { return null; }
                return Result<Profile>.Success(user);
            }
        }
    }
}
