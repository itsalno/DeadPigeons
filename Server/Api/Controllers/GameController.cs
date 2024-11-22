using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Services;
using Services.TransferModels.Requests;


namespace Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class GameController(GameService gameService): ControllerBase
{
    [HttpPost]
    [Route("")]
    public ActionResult<Game> CreateGame(CreateGameDto createGameDto)
    {
        var game = gameService.CreateGame(createGameDto);
        return Ok(game);
    }

    [HttpPost]
    [Route("ActiveGame")]
    public ActionResult<Game> GetActiveGame()
    {
        var game = gameService.GetActiveGame();
        return game;
    }
    
    [HttpGet("GetAllGames")]
    public ActionResult<List<Game>> GetAllGames()
    {
        var games = gameService.GetAllGames();
        return Ok(games);
    }
}