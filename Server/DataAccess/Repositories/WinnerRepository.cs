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
    
    public List<Board> GetMatchingBoards(Guid gameId, string winningSequence)
    {
        var winningNumbers = winningSequence.Split(',')
            .Select(int.Parse)
            .ToHashSet();
        
        return context.Boards
            .Where(b => b.Gameid == gameId)
            .ToList()
            .Where(b =>
            {
                var boardNumbers = b.Sequence.Split(',').Select(int.Parse).ToHashSet();
                return winningNumbers.All(boardNumbers.Contains);
            })
            .ToList();
    }


    public void SaveWinners(List<Winner> winners)
    {
        context.Winners.AddRange(winners);
        context.SaveChanges();
    }
}