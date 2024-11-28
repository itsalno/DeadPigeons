using DataAccess.Models;

namespace Services.TransferModels.Requests;

public class CreateBalanceDTO
{
    public Guid PlayerId { get; set; }

    public int Amount { get; set; } 

    public string TransactionType{ get; set; }

    public string TransactionNerf{ get; set; }

    public DateTime TimeStamp { get; set; }
    
    public bool Pending { get; set; }
    
    public Transaction ToBalance()
    {
        return new Transaction()
        {
            Playerid = PlayerId,
            Amount = Amount,
            Transactiontype = TransactionType,
            Transactionref = TransactionNerf,
            CreatedAt = TimeStamp,
            Pending = Pending
        };
    }
}