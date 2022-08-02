using Application.core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

            public Handler(DataContext context, IMapper mapper) 
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await context.Users.ProjectTo<Profile>(mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(x => x.Username == request.Username);

                if(user == null) { return null; }
                return Result<Profile>.Success(user);
            }
        }
    }
}
