using DataAccess.Interfaces;
using DataAccess.Models;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Services.Services;

public class BoardService(IBoardRepository boardRepository)
{
    public BoardDto CreateBoard(CreateBoardDto createBoardDto)
    {
        var board = createBoardDto.ToBoard();
        Board newBoard = boardRepository.CreateBoard(board);
        return new BoardDto().FromEntity(newBoard);
    }
}