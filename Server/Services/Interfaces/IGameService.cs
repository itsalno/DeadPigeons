using DataAccess.Models;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Services.Interfaces;

public interface IGameService
{
     GameDto CreateGame(CreateGameDto createGameDto);
     List<GameDto> GetAllGames();
     Game GetActiveGame();
     Game? EndGame(Guid id, string finalSequence);
     void UpdateGame(UpdateGameDto updateGameDto);
     Game? getById(Guid id);
     public int? GetPricePoolByGameId(Guid gameId);
}