using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }

        [HttpGet("{username}/events")]
        public async Task<IActionResult> GetUserEvents(string username,string predicate)
        {
            return HandleResult(await Mediator.Send(new ListEvents.Query { Username = username, Predicate = predicate }));
        }
    }
}
