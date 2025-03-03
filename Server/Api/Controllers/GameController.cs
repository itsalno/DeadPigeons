﻿using DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Interfaces;
using Services.Services;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;


namespace Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class GameController(IGameService gameService) : ControllerBase
{
    [HttpPost]
    [Route("")]
    [AllowAnonymous]
    public ActionResult<Game> CreateGame(CreateGameDto createGameDto)
    {
        var game = gameService.CreateGame(createGameDto);
        return Ok(game);
    }

    [HttpPost]
    [Route("ActiveGame")]
    [AllowAnonymous]
    public ActionResult<Game> GetActiveGame()
    {
        var game = gameService.GetActiveGame();
        return game;
    }

    [HttpGet("GetAllGames")]
    [Authorize(Roles = "Admin")]
    public ActionResult<List<Game>> GetAllGames()
    {
        var games = gameService.GetAllGames();
        return Ok(games);
    }

    [HttpPatch]
    [Route("endGame")]
    [Authorize(Roles = "Admin")]
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
    [AllowAnonymous]
    public IActionResult UpdateGame(Guid id, [FromBody] UpdateGameDto gameDto)
    {
        if (gameDto == null)
        {
            return BadRequest("Invalid game data.");
        }

        if (gameDto.GameId != id)
        {
            return BadRequest("Game ID in URL does not match Game ID in request body.");
        }

        try
        {
            gameService.UpdateGame(gameDto);

            return Ok("Game prizepool updated successfully.");
        }
        catch (Exception ex)
        {
            return NotFound(new { Message = ex.Message });
        }
    }

    [HttpGet]
    [Route("getGameById/{id}")]
    [Authorize(Roles = "Admin,User")]
    public ActionResult<GameDto> GetById(Guid id)
    {
        var game =gameService.getById(id);
        return Ok(game);
    }
    
    [HttpGet]
    [Route("PricepoolById/{id}")]
    public int GetPricePoolByGameId(Guid id)
    {
        var pricepool = gameService.GetPricePoolByGameId(id);

        // If the value is null, return a default value (e.g., 0).
        return pricepool ?? 0;
    }
    
}