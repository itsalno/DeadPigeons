using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Services;
using Services.TransferModels.Responses;

namespace Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class WinnerController(WinnerService winnerService):ControllerBase
{
    [HttpGet("GetAllWinners")]
    public ActionResult<List<WinnerDto>> GetAllPlayerProfiles()
    {
        var players = winnerService.GetWinners();
        return Ok(players);
    }
}