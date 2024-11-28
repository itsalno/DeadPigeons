using DataAccess.Interfaces;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories;

public class WinnerRepository(MyDbContext context):IWinnerRepository
{
    public List<Winner> GetWinners()
    {
        var winners = context.Winners
            .Include(w => w.Player)
            .ThenInclude(pp => pp.User) 
            .ToList();

        return winners;
    }
}