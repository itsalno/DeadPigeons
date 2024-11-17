using DataAccess.Models;

namespace DataAccess.Data.Interfaces;

public interface IPlayerProfileRepository
{
    public List<PlayerProfile> GetAllPlayers();

    public PlayerProfile? GetById(Guid id);

    public void UpdatePlayerProfile(PlayerProfile profile);

}