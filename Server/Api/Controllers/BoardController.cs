using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Services.Services;
using Services.TransferModels.Requests;


namespace Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class BoardController(BoardService boardService): ControllerBase
{
    [HttpPost]
    [Route("")]
    public ActionResult<Game> CreatePaper(CreateBoardDto createBoardDto)
    {
        var board = boardService.CreateBoard(createBoardDto);
        return Ok(board);
    }
}