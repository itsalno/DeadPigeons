using DataAccess.Models;

namespace DataAccess.Interfaces;

public interface IWinnerRepository
{
    public List<Winner> GetWinners();
    public List<Board> GetMatchingBoards(Guid gameId, string winningSequence);
    public void SaveWinners(List<Winner> winners);
}