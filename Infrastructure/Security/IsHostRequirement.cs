using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.Security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }

    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext context;
        private readonly IHttpContextAccessor httpContextAccessor;

        public IsHostRequirementHandler(DataContext context, IHttpContextAccessor httpContextAccessor)
        {
            this.context = context;
            this.httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if( userId == null){return Task.CompletedTask;}

            var activityId = Guid.Parse(httpContextAccessor.HttpContext?.Request.RouteValues.SingleOrDefault(x => x.Key == "id")
            .Value?.ToString());

            var attendee = context.ActivityAttendees
                                .AsNoTracking()
                                .SingleOrDefaultAsync( x => x.AppUserId == userId && x.ActivityId == activityId)
                                .Result;

            
            if(attendee == null){return Task.CompletedTask;}

            if( attendee.IsHost ){context.Succeed(requirement);}

            return Task.CompletedTask;


        }
    }
}