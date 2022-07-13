using Application.core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MusicEvents
{
    public class List
    {
        public class Query : IRequest<Result<List<MusicEventDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<MusicEventDto>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
        private readonly IMapper mapper;

            public Handler(DataContext context, ILogger<List> logger, IMapper mapper)
            {
                this.mapper = mapper;
                this._context = context;
                this._logger = logger;
            }

            public async Task<Result<List<MusicEventDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                /*try
                {
                    for(var i  = 0; i < 10; i++)
                    {
                        cancellationToken.ThrowIfCancellationRequested();
                        await Task.Delay(1000,cancellationToken);
                        _logger.LogInformation($"Task {i} has completed");

                    }
                }
                catch(Exception ex) when(ex is TaskCanceledException)
                {
                    _logger.LogInformation("Task was cancelled");
                }*/

                var activities = await _context.Activities
                                    .Include(a => a.Attendees)
                                    .ThenInclude(u => u.AppUser)
                                    .ToListAsync(cancellationToken);

                var activities2Return = mapper.Map<List<MusicEventDto>>(activities);
                

                return Result<List<MusicEventDto>>.Success(activities2Return);

            }
        }
    }
}
