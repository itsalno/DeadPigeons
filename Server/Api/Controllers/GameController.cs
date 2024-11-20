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
    public ActionResult<Game> CreatePaper(CreateGameDto createGameDto)
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
}