using DataAccess.Interfaces;
using DataAccess.Models;

namespace DataAccess.Repositories;

public class WinnerRepository(MyDbContext context):IWinnerRepository
{
    public List<Winner> GetWinners()
    {
        //return context;
        return context.Winner.ToList();
    }
}