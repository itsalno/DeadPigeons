using DataAccess.Data.Interfaces;
using DataAccess.Models;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Services.Services;

public class BalanceService(IBalanceRepository balanceRepository)
{
    public BalanceDTO AddFunds(CreateBalanceDTO createBalanceDto)
    {
        var balance = createBalanceDto.ToBalance();
        Transaction newTransaction = balanceRepository.addFunds(balance);
        return new BalanceDTO().FromEntity(newTransaction);
        
    }
}