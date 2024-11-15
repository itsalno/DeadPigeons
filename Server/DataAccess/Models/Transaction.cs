using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Transaction
{
    public Guid Id { get; set; }

    public Guid? Playerid { get; set; }

    public Guid? Amount { get; set; }

    public string? Transactiontype { get; set; }

    public string? Transactionref { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual PlayerProfile? Player { get; set; }
}
