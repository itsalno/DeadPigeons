using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class PlayerProfile
{
    public Guid Id { get; set; }

    public Guid? Userid { get; set; }

    public int? Balance { get; set; }

    public bool? Isactive { get; set; }

    public int? CreatedAt { get; set; }

    public virtual ICollection<Board> Boards { get; set; } = new List<Board>();

    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();

    public virtual User? User { get; set; }
}
