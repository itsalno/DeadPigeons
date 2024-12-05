using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Services;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;


namespace Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class BoardController(BoardService boardService): ControllerBase
{
    [HttpPost]
    [Route("")]
    public ActionResult<Game> CreateBoard(CreateBoardDto createBoardDto)
    {
        var board = boardService.CreateBoard(createBoardDto);
        return Ok(board);
    }
    
    [HttpGet("{gameId}")]
    public ActionResult<DetailGameHystoryDto> GetDetailGameHistory(Guid gameId)
    {
        var boardHistory = boardService.GetDetailGameHistory(gameId);
        if (boardHistory == null || boardHistory.Count == 0)
        {
            return NotFound(new { Message = "No History Found" });
        }

        return Ok(boardHistory);
    }
}