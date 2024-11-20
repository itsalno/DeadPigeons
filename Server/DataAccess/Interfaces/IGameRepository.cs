using DataAccess.Models;


namespace DataAccess.Data.Interfaces;

public interface IGameRepository
{
    public Game CreateGame(Game game);

    public Game? GetActiveGame();


}