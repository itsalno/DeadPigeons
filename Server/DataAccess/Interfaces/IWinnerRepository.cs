using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IWinnerRepository
{
    public List<Winner> GetWinners();
}