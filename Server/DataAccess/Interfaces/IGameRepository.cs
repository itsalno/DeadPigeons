using DataAccess.Models;


namespace DataAccess.Data.Interfaces;

public interface IGameRepository
{
    public Game CreateGame(Game game);

    public Game? GetActiveGame();
    public List<Game> GetAllGames();

    public Game? GetById(Guid id);

    public void UpdateGame(Game game);

}