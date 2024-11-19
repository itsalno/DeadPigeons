using DataAccess.Interfaces;
using DataAccess.Models;

namespace Services.Services;

public class GameService(IGamesRepository gamesRepository)
{
    public List<Game> GetAllGames()
    {
        return gamesRepository.GetAllGames();
    }
}