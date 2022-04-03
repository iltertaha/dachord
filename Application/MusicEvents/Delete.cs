using Application.core;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.MusicEvents
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>?> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await this.context.Activities.FindAsync(request.Id);
                
                if(activity == null)
                {
                    return null;
                }
                // handle exception if record does not exists
                this.context.Remove(activity);

                var result = await this.context.SaveChangesAsync() > 0;

                if (!result) { return Result<Unit>.Failure("Failed to delete the event."); }

                return Result<Unit>.Success(Unit.Value);
                
            }
        }
    }
}
