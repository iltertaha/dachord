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
    public class ListEvents
    {
        public class Query : IRequest<Result<List<UserEventDto>>>
        {
            public string Username { get; set; }

            public string Predicate { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<List<UserEventDto>>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<UserEventDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = context.ActivityAttendees.Where(u => u.AppUser.UserName == request.Username)
                                                     .OrderBy(a => a.Activity.Date)
                                                     .ProjectTo<UserEventDto>(mapper.ConfigurationProvider)
                                                     .AsQueryable();

                query = request.Predicate switch
                {
                    "past" => query.Where(a => a.Date <= DateTime.Now),
                    "hosting" => query.Where(a => a.HostUsername == request.Username),
                    _ => query.Where(a => a.Date >= DateTime.Now)
                };

                var events = await query.ToListAsync();

                return Result<List<UserEventDto>>.Success(events);
            }
        }
    }
}
