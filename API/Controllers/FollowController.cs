using Application.Followers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowController : BaseApiController
    {
        [HttpPost("{username}")]
        public async Task<IActionResult> Follow(string username) { 
            return HandleResult(await Mediator.Send(new FollowMarker.Command { TargetUsername = username }));
        }
    }
}
