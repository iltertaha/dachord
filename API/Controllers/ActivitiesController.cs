using Application.MusicEvents;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        private readonly IMediator mediator;

        

        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());

        }

        // activities/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
;
        } 
        
        [HttpPost]
        public async Task<IActionResult> CreateActivit([FromBody]Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }
    }
}
