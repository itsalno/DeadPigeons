using DataAccess.Data;
using DataAccess.Data.Interfaces;
using DataAccess.Models;

namespace Services.Services;

public interface IPlayerProfileService
{
    public List<PlayerProfile> GetAllPlayers();
}

public class UserService(IPlayerProfileRepository playerProfileRepository, MyDbContext context) : IPlayerProfileService
{
    public List<PlayerProfile> GetAllPlayers()
    {
       return playerProfileRepository.GetAllPlayers();
    }
}