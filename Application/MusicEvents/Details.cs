using Application.core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.MusicEvents
{
    public class Details
    {
        public class Query : IRequest<Result<MusicEventDto>>
        {
            public Guid Id { get; set; }

        }

        public class Handler : IRequestHandler<Query, Result<MusicEventDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<Result<MusicEventDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var requestedEvent = await context.Activities
                .ProjectTo<MusicEventDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<MusicEventDto>.Success(requestedEvent);
            }
        }
    }
}
