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
    
    [HttpPost("process-winners/{gameId}")]
    public IActionResult ProcessWinners(Guid gameId)
    {
        try
        {
            string result = winnerService.ProcessWinners(gameId);
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error occurred while processing winners.");
        }
    }
}