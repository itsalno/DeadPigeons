using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Services;
using Services.TransferModels.Requests;


namespace Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class GameController(GameService gameService) : ControllerBase
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

    [HttpPatch]
    [Route("endGame")]
    public ActionResult<Game> EndGame(Guid id, string finalSequence)
    {
        var game = gameService.EndGame(id, finalSequence);

        if (game == null)
        {
            return NotFound(new { message = "Game not found" });
        }

        return Ok(game);
    }
    
    [HttpPut]
    [Route("update/{id}")]
    public IActionResult UpdateGame(Guid id, [FromBody] UpdateGameDto gameDto)
    {
        if (gameDto == null)
        {
            return BadRequest("Invalid player data.");
        }

        if (gameDto.GameId != id)
        {
            return BadRequest("Player ID in URL does not match Player ID in request body.");
        }

        try
        {
            gameService.UpdateGame(gameDto);

            return Ok("Player balance updated successfully.");
        }
        catch (Exception ex)
        {
            return NotFound(new { Message = ex.Message });
        }
    }
    
}