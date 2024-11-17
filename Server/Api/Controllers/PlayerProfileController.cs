using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Services;
using Services.Services;
using Services.TransferModels.Responses;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlayerProfileController(PlayerProfileService profileService) : ControllerBase
{
    [HttpGet("GetAllPlayers")]
    public ActionResult<List<PlayerDTO>> GetAllPlayerProfiles()
    {
        var players = profileService.GetAllPlayers();
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

    [HttpPost]
    [Route("update/{id}")]
    public ActionResult<PlayerDTO> UpdatePlayerProfile(Guid id, [FromBody] PlayerDTO playerDto)
    {
        if (playerDto == null)
        {
            return BadRequest("Invalid player data.");
        }

        // Make sure the playerId in the DTO matches the id in the URL
        if (playerDto.PlayerId != id)
        {
            return BadRequest("Player ID in URL does not match Player ID in request body.");
        }

        var playerProfile = profileService.GetProfileById(id);
        if (playerProfile == null)
        {
            return NotFound("Player not found");
        }

        // Update player profile with the new values
        playerProfile.User.UserName = playerDto.UserName;
        playerProfile.User.Email = playerDto.Email;
        playerProfile.Balance = playerDto.Balance;

        profileService.UpdatePlayerProfile(playerProfile);

        return Ok(playerProfile);  // Return the updated player profile
    }
}