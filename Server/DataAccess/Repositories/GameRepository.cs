using DataAccess.Data.Interfaces;
using DataAccess.Models;
using Npgsql;

namespace DataAccess.Repositories;

public class GameRepository(MyDbContext context) : IGameRepository
{
    public Game CreateGame(Game game)
    {
        context.Games.Add(game);
        context.SaveChanges();
        return game;
    }

    public Game? GetActiveGame()
    {
        var activeGame = context.Games.Where(g=> g.Isactive == true).SingleOrDefault();
        if(activeGame != null)
        {
            return activeGame;    
        }

        return null;
    }
    public List<Game> GetAllGames()
    {
        return context.Games.ToList();
    }
}