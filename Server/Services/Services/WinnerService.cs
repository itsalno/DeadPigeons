using DataAccess.Data.Interfaces;
using DataAccess.Interfaces;
using DataAccess.Models;

namespace Services.Services;

public class WinnerService(IWinnerRepository winnerRepository,IGameRepository gameRepository)
{
    public List<Winner> GetWinners()
    {
        return winnerRepository.GetWinners();
    }
    
    public string ProcessWinners(Guid gameId)
    {
        
        var game = gameRepository.GetById(gameId);
        if (game == null)
        {
            throw new InvalidOperationException("Game not found.");
        }
        

        if (string.IsNullOrEmpty(game.Winningseq))
        {
            throw new InvalidOperationException("Winning sequence not found.");
        }

        string winningSequence = game.Winningseq;
        if (string.IsNullOrEmpty(game.Winningseq?.Trim()))
        {
            throw new InvalidOperationException("Winning sequence not found.");
        }
        
        var matchingBoards = winnerRepository.GetMatchingBoards(gameId, winningSequence);
        if (!matchingBoards.Any())
        {
            return "No matching boards found.";
        }
        
        var winners = matchingBoards.Select(board => new Winner
        {
            Gameid = gameId,
            Sequence = board.Sequence,
            Playerid = board.Playerid,
            CreatedAt = DateTime.UtcNow
        }).ToList();
        
        winnerRepository.SaveWinners(winners);

        return $"{winners.Count} winners processed successfully.";
    }
}