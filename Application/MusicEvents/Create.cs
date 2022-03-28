using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.MusicEvents
{
    public class Create
    {
        public class Command: IRequest
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

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;

            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                this.context.Activities.Add(request.Activity);

                await this.context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
