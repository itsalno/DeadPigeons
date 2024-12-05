using DataAccess.Models;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Services.Interfaces;

public interface IBalanceService
{
     BalanceDTO AddFunds(CreateBalanceDTO createBalanceDto);
     List<BalanceDTO> GetBalancesByPlayerId(Guid playerId);
     List<BalanceDTO> GetPendingBalancesByPlayerId(Guid playerId);
     Transaction? ApproveTransaction(Guid id);
     Transaction? RejectTransaction(Guid id);
}