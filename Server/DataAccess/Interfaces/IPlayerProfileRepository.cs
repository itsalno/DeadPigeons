using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IPlayerProfileRepository
{
    public List<PlayerProfile> GetAllActivePlayers();

    public List<PlayerProfile> GetAllInactivePlayers();

    public PlayerProfile GetById(Guid id);

    public void UpdatePlayerProfile(PlayerProfile profile);

    PlayerProfile CreatePlayerProfile(PlayerProfile profile);

}