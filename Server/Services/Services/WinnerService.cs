using DataAccess.Data.Interfaces;
using DataAccess.Interfaces;
using DataAccess.Models;
using Services.TransferModels.Responses;

namespace Services.Services;

public class WinnerService(IWinnerRepository winnerRepository,IGameRepository gameRepository)
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