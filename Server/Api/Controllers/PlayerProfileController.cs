using System.Security.Claims;
using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Services;
using Services.Services;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlayerProfileController(PlayerProfileService profileService) : ControllerBase
{
    
    
    [HttpGet("GetAllPlayers")]
    public ActionResult<List<PlayerDTO>> GetAllPlayerProfiles()
    {
        var players = profileService.GetAllActivePlayers();
        return Ok(players);
    }
    
    [HttpGet("GetAllInactivePlayers")]
    public ActionResult<List<PlayerDTO>> GetAllInactivePlayerProfiles()
    {
        var players = profileService.GetAllInactivePlayers();
        return Ok(players);
    }
    
    [HttpPatch]
    [Route("{id}/softDelete")]
    public ActionResult<PlayerProfile> SoftDeleteProfile(Guid id)
    {
        var profile = profileService.SoftDeleteProfile(id);

        if (profile == null)
        {
            return NotFound(new { message = "Profile not found" });
        }

        return Ok(profile);
    }
    
    [HttpPatch]
    [Route("{id}/makeActive")]
    public ActionResult<PlayerProfile> MakeProfileActive(Guid id)
    {
        var profile = profileService.MakeProfileActive(id);

        if (profile == null)
        {
            return NotFound(new { message = "Profile not found" });
        }

        return Ok(profile);
    }

    [HttpPut]
    [Route("update/{id}")]
    public IActionResult UpdatePlayerBalance(Guid id, [FromBody] UpdatePlayerDTO playerDto)
    {
        if (playerDto == null)
        {
            return BadRequest("Invalid player data.");
        }

        if (playerDto.PlayerId != id)
        {
            return BadRequest("Player ID in URL does not match Player ID in request body.");
        }

        try
        {
            profileService.UpdatePlayerBalance(playerDto);

            return Ok("Player balance updated successfully.");
        }
        catch (Exception ex)
        {
            return NotFound(new { Message = ex.Message });
        }
    }

    [HttpGet]
    [Route("getBalance/{id}")]
    public ActionResult<PlayerProfile> GetPlayerBalance(Guid id)
    {
        
        var player = profileService.GetProfileById(id);

        if (player == null)
        {
            return NotFound($"Player with ID {id} not found.");
        }

        return Ok(player);
    }

}