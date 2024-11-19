using DataAccess.Interfaces;
using DataAccess.Models;

namespace DataAccess.Repositories;

public class GamesRepository(MyDbContext context):IGamesRepository
{
    public List<Game> GetAllGames()
    {
        return context.Games.ToList();
    }
    
    
}