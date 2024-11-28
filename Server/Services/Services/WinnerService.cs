using DataAccess.Interfaces;
using DataAccess.Models;
using Services.TransferModels.Responses;

namespace Services.Services;

public class WinnerService(IWinnerRepository winnerRepository)
{
    public List<WinnerDto> GetWinners()
    {
        var winners = winnerRepository.GetWinners();

        var winnersWithDetails = winners
            .Select(winner => new WinnerDto()
            {
                
                CreatedAt = winner.CreatedAt.GetValueOrDefault(DateTime.MinValue),
               Sequence = winner.Sequence,
               Email = winner.Player.User.Email,
               Name = winner.Player.User.Name,
               Surname = winner.Player.User.Surname,
               Phone = winner.Player.User.Phone
               
                
            })
            .ToList();

        return winnersWithDetails;
    }
}