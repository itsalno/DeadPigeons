using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Transaction
{
    public Guid Id { get; set; }

    public Guid? Playerid { get; set; }

    public string? Transactiontype { get; set; }

    public string? Transactionref { get; set; }

    public DateTime CreatedAt { get; set; }

    public int Amount { get; set; }
    
    public bool Pending { get; set; }

    public virtual PlayerProfile? Player { get; set; }
}
