using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Game
{
    public Guid Id { get; set; }

    public int Week { get; set; }

    public List<string>? Winningseq { get; set; }

    public int? Year { get; set; }

    public decimal? Prizepool { get; set; }

    public decimal? Carryover { get; set; }

    public bool? Isactive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<Board> Boards { get; set; } = new List<Board>();
}
