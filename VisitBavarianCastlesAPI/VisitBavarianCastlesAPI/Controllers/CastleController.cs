using Microsoft.AspNetCore.Mvc;
using VisitBavarianCastlesAPI.Models;
using VisitBavarianCastlesAPI.Services;

namespace VisitBavarianCastlesAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CastleController:ControllerBase
    {
        CastleService castleService = new CastleService();

        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetAllCastles()
        {
            List<Castle> castles = await castleService.GetAllCastles();
            return Ok(castles);
        }
    }
}
