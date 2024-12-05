using DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.Services;
using Services.TransferModels.Responses;

namespace Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class WinnerController(IWinnerService winnerService):ControllerBase
{
    [HttpGet("GetAllWinners")]
    [Authorize(Roles = "Admin")]
    public ActionResult<List<WinnerDto>> GetAllPlayerProfiles()
    {
        var players = winnerService.GetWinners();
        return Ok(players);
    }
    
    [HttpPost("process-winners/{gameId}")]
    [Authorize(Roles = "Admin")]
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