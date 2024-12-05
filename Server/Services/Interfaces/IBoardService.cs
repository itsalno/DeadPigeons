using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Services.Interfaces;

public interface IBoardService
{
     BoardDto CreateBoard(CreateBoardDto createBoardDto);
     List<DetailGameHystoryDto> GetDetailGameHistory(Guid gameId);
}