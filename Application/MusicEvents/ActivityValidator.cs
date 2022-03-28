using Domain;
using FluentValidation;

namespace Application.MusicEvents
{
    public class ActivityValidator : AbstractValidator<Activity>
    {
        public ActivityValidator()
        {
            RuleFor( x => x.Title ).NotEmpty();
            RuleFor( x => x.Description ).NotEmpty();
            RuleFor( x => x.Date ).NotEmpty();
            RuleFor( x => x.Category ).NotEmpty();
            RuleFor( x => x.Location ).NotEmpty();
            RuleFor( x => x.Venue).NotEmpty();
        }
    }
}
