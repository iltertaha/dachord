using Application.MusicEvents;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
      
    public class ActivitiesController : BaseApiController
    {
        private readonly IMediator mediator;

        
        
        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));

        }

        // activities/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
           return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        } 
        
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [Authorize(Policy = "IsEventHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity}));



        }

        [Authorize(Policy = "IsEventHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));



        }


        [HttpPost("{id}/join")]
        public async Task<IActionResult> Join(Guid id)
        {
                return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }
    }
}
