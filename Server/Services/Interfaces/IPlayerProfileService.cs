using DataAccess.Models;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Services.Interfaces;

public interface IPlayerProfileService
{
    List<PlayerDTO> GetAllActivePlayers();
    List<PlayerDTO> GetAllInactivePlayers();
    PlayerProfile? SoftDeleteProfile(Guid id);
    PlayerProfile? MakeProfileActive(Guid id); 
    PlayerProfile GetProfileById(Guid id);
    void UpdatePlayerBalance(UpdatePlayerDTO updatePlayerDto);
    PlayerProfile CreatePlayerProfile(Guid userId, CreatePlayerDTO createPlayerDto);
}