using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Game
{
    public Guid Id { get; set; }

    public int Week { get; set; }

    public string? Winningseq { get; set; }

    public int? Year { get; set; }

    public int? Prizepool { get; set; }

    public int? Carryover { get; set; }

    public bool? Isactive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? StartingDate { get; set; }

    public DateTime? EndingDate { get; set; }

    public virtual ICollection<Board> Boards { get; set; } = new List<Board>();

    public virtual ICollection<Winner> Winners { get; set; } = new List<Winner>();
}
