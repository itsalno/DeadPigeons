using DataAccess.Models;
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
public class BoardController(IBoardService boardService): ControllerBase

{
    
    
    [HttpPost]
    [Route("")]
    [Authorize(Roles = "User")]
    public ActionResult<Game> CreatePaper(CreateBoardDto createBoardDto)
    {
        var board = boardService.CreateBoard(createBoardDto);
        return Ok(board);
    }
    
    [HttpGet("{gameId}")]
    [Authorize(Roles = "Admin")]
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