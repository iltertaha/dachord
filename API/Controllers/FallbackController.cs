using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // We will serve index.html from this endpoint
    [AllowAnonymous]
    public class FallbackController : Controller
    {
        // use default controller class to use actions

        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");

        }

    }
}
