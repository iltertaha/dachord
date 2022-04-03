using Application.core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.MusicEvents
{
    public class Create
    {
        public class Command: IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                this.context.Activities.Add(request.Activity);

                // result zero means nothing is written to db
                var result = await this.context.SaveChangesAsync() > 0;
                if (!result)
                {
                    return Result<Unit>.Failure("Failed to create music event.");
                }
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
