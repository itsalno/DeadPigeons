using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IGamesRepository
{
    public List<Game> GetAllGames();
}