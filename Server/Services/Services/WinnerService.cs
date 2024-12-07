using DataAccess.Data.Interfaces;
using DataAccess.Interfaces;
using DataAccess.Models;
using Services.Interfaces;
using Services.TransferModels.Responses;

namespace Services.Services;

public class WinnerService(IWinnerRepository winnerRepository,IGameRepository gameRepository):IWinnerService
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
               Phone = winner.Player.User.Phone,
               AmountWon = winner.AmountWon
               
                
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
        
        if (string.IsNullOrEmpty(game.Winningseq) || string.IsNullOrEmpty(game.Winningseq?.Trim()))
        {
            throw new InvalidOperationException("Winning sequence not found.");
        }

        string winningSequence = game.Winningseq;
        
        var matchingBoards = winnerRepository.GetMatchingBoards(gameId, winningSequence);
        if (!matchingBoards.Any())
        {
            game.Carryover = (game.Prizepool ?? 0);
            game.Prizepool = 0; 
            gameRepository.UpdateGame(game); 

            return "No matching boards found. Prize pool carried over to the next game.";
        }
        
        int prizePool = game.Prizepool ?? 0;
        int prizePoolForWinners = (int)(prizePool * 0.7); 

        int numberOfWinningBoards = matchingBoards.Count();
        decimal amountPerBoard = numberOfWinningBoards > 0 ? (decimal)prizePoolForWinners / numberOfWinningBoards : 0;

        int maxWinningPerPlayer = 5000; 
        int carryoverFromExcess = 0;
        
        var playerWinnings = matchingBoards
            .GroupBy(board => board.Playerid)
            .ToDictionary(group => group.Key, group =>
            {
                decimal totalWinnings = group.Count() * amountPerBoard;

                if (totalWinnings > maxWinningPerPlayer)
                {
                    carryoverFromExcess += (int)(totalWinnings - maxWinningPerPlayer); 
                    totalWinnings = maxWinningPerPlayer;
                }

                return totalWinnings;
            });

        
        var winners = matchingBoards.Select(board => new Winner
        {
            Gameid = gameId,
            Sequence = board.Sequence,
            Playerid = board.Playerid,
            CreatedAt = DateTime.UtcNow,
            AmountWon = amountPerBoard 
        }).ToList();
        
        winnerRepository.SaveWinners(winners);
        
        game.Carryover = (game.Carryover ?? 0) + carryoverFromExcess;
        game.Carryover = 0; 
        gameRepository.UpdateGame(game);

        return $"{winners.Count} winners processed successfully. Each winner receives {amountPerBoard:C}.";
    }
}