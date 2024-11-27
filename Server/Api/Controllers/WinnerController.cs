using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Services;

namespace Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class WinnerController(WinnerService winnerService):ControllerBase
{
    [HttpGet("GetAllWinners")]
    public ActionResult<List<Winner>> GetAllPlayerProfiles()
    {
        var players = winnerService.GetWinners();
        return Ok(players);
    }
}