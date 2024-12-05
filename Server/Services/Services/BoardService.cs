using DataAccess.Interfaces;
using DataAccess.Models;
using Services.Interfaces;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Services.Services;

public class BoardService(IBoardRepository boardRepository):IBoardService
{
    public BoardDto CreateBoard(CreateBoardDto createBoardDto)
    {
        var board = createBoardDto.ToBoard();
        Board newBoard = boardRepository.CreateBoard(board);
        return new BoardDto().FromEntity(newBoard);
    }
    
    
    public List<DetailGameHystoryDto> GetDetailGameHistory(Guid gameId)
    {
        var boardHistory = boardRepository.GetDetailGameHistory(gameId);

        return boardHistory.Select(b => new DetailGameHystoryDto()
        {
            Price = b.Price,
            CreatedAt = b.CreatedAt,
            Sequence = b.Sequence,
            UserName = b.Player.User.Username,
            Email =  b.Player.User.Email,
            Name =  b.Player.User.Name,
            Surname =  b.Player.User.Surname,
            Phone =  b.Player.User.Phone
        }).ToList();
    }
}