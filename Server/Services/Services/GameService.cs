using System.Globalization;
using DataAccess.Data.Interfaces;
using DataAccess.Interfaces;
using DataAccess.Models;
using DataAccess.Repositories;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Services.Services;



public class GameService(IGameRepository gameRepository)
{
    public GameDto CreateGame(CreateGameDto createGameDto)
    {
        var game = createGameDto.ToGame();
        Game newGame = gameRepository.CreateGame(game);
        return new GameDto().FromEntity(newGame);
    }
    public List<GameDto> GetAllGames()
    {
        var games = gameRepository.GetAllGames();
        var gameDtos = games.Select(game => new GameDto().FromEntity(game)).ToList();
        return gameDtos;
    }

    public Game GetActiveGame()
    {
        var game = gameRepository.GetActiveGame();
        if (game != null)
        {
            return game;
        }

        DateTime date = DateTime.Today;
        int offset = date.DayOfWeek - DayOfWeek.Monday;

        DateTime lastMonday = date.AddDays(-offset);
        DateTime nextSunday = date.AddDays(7 - (int)date.DayOfWeek);
        Console.WriteLine(lastMonday);
        Console.WriteLine(nextSunday);

        Calendar cal = new CultureInfo("en-US").Calendar;
        int week = cal.GetWeekOfYear(date, CalendarWeekRule.FirstDay, DayOfWeek.Monday);
        Console.WriteLine(week);

        int year = date.Year;

        Game game1 = new Game()
        {
            Week = week,
            Year = year,
            CreatedAt = date,
            StartingDate = lastMonday,
            EndingDate = nextSunday,
            Isactive = true
        };
        Game newGame = gameRepository.CreateGame(game1);
        return newGame;
        
    }
    
    public Game? EndGame(Guid id, string finalSequence)
    {
        
        var game = gameRepository.GetById(id);
        if (game == null) return null;

        game.Isactive = false;
        game.Winningseq = finalSequence;
        gameRepository.UpdateGame(game);
        return game;
    }
}