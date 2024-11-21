using DataAccess.Models;

namespace Services.TransferModels.Responses;

public class BalanceDTO
{
    
    public BalanceDTO FromEntity(Transaction transaction)
    {
        
        return new BalanceDTO()
        {
            PlayerId = transaction.Playerid.Value,
            Amount = transaction.Amount,
            TransactionType = transaction.Transactiontype,
            TransactionRef = transaction.Transactionref,
            TimeStamp = transaction.CreatedAt,
            
        };
    }
    public Guid? PlayerId { get; set; }

    public int Amount { get; set; } 

    public string TransactionType{ get; set; }

    public string TransactionRef{ get; set; }

    public DateTime TimeStamp { get; set; }
}