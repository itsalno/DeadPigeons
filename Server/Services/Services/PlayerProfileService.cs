using DataAccess.Interfaces;
using DataAccess.Models;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Services.Services;



public class PlayerProfileService(IPlayerProfileRepository playerProfileRepository) 
{
    public List<PlayerDTO> GetAllPlayers()
    {
        var activePlayers = playerProfileRepository.GetAllPlayers(); 

        var playersWithDetails = activePlayers
            .Select(player => new PlayerDTO()
            {
                PlayerId = player.Id,
                Balance = player.Balance,
                UserName = player.User.Username, 
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

    public PlayerProfile CreatePlayerProfile(Guid userId, CreatePlayerDTO createPlayerDto)
    {
        var playerProfile = new PlayerProfile
        {
            Userid = userId,
            Balance = createPlayerDto.InitialBalance,
            Isactive = createPlayerDto.IsActive,
            CreatedAt = 0
        };

        return playerProfileRepository.CreatePlayerProfile(playerProfile);
    }
}