using DataAccess.Data;
using DataAccess.Data.Interfaces;
using DataAccess.Models;
using Services.TransferModels.Responses;

namespace Services.Services;



public class PlayerProfileService(IPlayerProfileRepository playerProfileRepository, MyDbContext context) 
{
    public List<PlayerDTO> GetAllPlayers()
    {
        var activePlayers = playerProfileRepository.GetAllPlayers(); 

        var playersWithDetails = activePlayers
            .Select(player => new PlayerDTO()
            {
                PlayerId = player.Id,
                Balance = player.Balance,
                UserName = player.User.UserName, 
                Email = player.User.Email
                
            })
            .ToList();

        return playersWithDetails;
    }
    
    public PlayerProfile? SoftDeleteProfile(Guid id)
    {
        var playerProfile = playerProfileRepository.GetById(id);
        if (playerProfile == null) return null;

        playerProfile.Isactive = false;
        playerProfileRepository.UpdatePlayerProfile(playerProfile);
        return playerProfile;
    }
    
    public PlayerProfile GetProfileById (Guid id)
    {
        return playerProfileRepository.GetById(id);
    }

    public void UpdatePlayerProfile(PlayerProfile profile)
    {
        playerProfileRepository.UpdatePlayerProfile(profile);
    }
}