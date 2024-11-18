using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Services;

namespace Api.Controllers;




[ApiController]
[Route("api/[controller]")]
public class GamesController(GameService gameService):ControllerBase

{
    
    
    [HttpGet("GetAllGames")]
    public ActionResult<List<Game>> GetAllGames()
    {
        var games = gameService.GetAllGames();
        return Ok(games);
    }
    
    
    
    
    
    
}