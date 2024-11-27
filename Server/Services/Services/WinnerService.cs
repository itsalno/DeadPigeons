using DataAccess.Interfaces;
using DataAccess.Models;

namespace Services.Services;

public class WinnerService(IWinnerRepository winnerRepository)
{
    public List<Winner> GetWinners()
    {
        return winnerRepository.GetWinners();
    }
}