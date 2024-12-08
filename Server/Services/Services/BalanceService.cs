using DataAccess.Data.Interfaces;
using DataAccess.Models;
using FluentValidation;
using Services.Interfaces;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Services.Services;

public class BalanceService(IBalanceRepository balanceRepository, IValidator<CreateBalanceDTO> addBalanceValidator):IBalanceService
{
    public BalanceDTO AddFunds(CreateBalanceDTO createBalanceDto)
    {
        addBalanceValidator.ValidateAndThrow(createBalanceDto);
        var balance = createBalanceDto.ToBalance();
        Transaction newTransaction = balanceRepository.addFunds(balance);
        return new BalanceDTO().FromEntity(newTransaction);
        
    }
    
    public List<BalanceDTO> GetBalancesByPlayerId(Guid playerId)
    {
        var transactions = balanceRepository.GetTransactionsByPlayerId(playerId);
        
        var filteredTransactions = transactions.Where(t => !t.Pending);

        return filteredTransactions.Select(t => new BalanceDTO
        {
            Id = t.Id,
            PlayerId = t.Playerid,
            Amount = t.Amount,
            TransactionType = t.Transactiontype,
            TransactionRef = t.Transactionref,
            TimeStamp = t.CreatedAt,
        }).ToList();
    }
    
    public List<BalanceDTO> GetPendingBalancesByPlayerId(Guid playerId)
    {
        var transactions = balanceRepository.GetTransactionsByPlayerId(playerId);
        
        var filteredTransactions = transactions.Where(t => t.Pending);

        return filteredTransactions.Select(t => new BalanceDTO
        {
            Id= t.Id,
            PlayerId = t.Playerid,
            Amount = t.Amount,
            TransactionType = t.Transactiontype,
            TransactionRef = t.Transactionref,
            TimeStamp = t.CreatedAt,
        }).ToList();
    }
    
    public Transaction? ApproveTransaction(Guid id)
    {

        var transaction = balanceRepository.GetById(id);
        if (transaction == null) return null;

        transaction.Pending = false;
        balanceRepository.UpdateTransaction(transaction);
        return transaction;
    }
    
    public Transaction? RejectTransaction(Guid id)
    {

        var transaction = balanceRepository.GetById(id);
        if (transaction == null) return null;
        
        balanceRepository.RejectTransaction(transaction);
        return transaction;
    }
    
}