using Services.TransferModels.Responses;

namespace Services.Interfaces;

public interface IWinnerService
{
     List<WinnerDto> GetWinners();
     string ProcessWinners(Guid gameId);
    
}