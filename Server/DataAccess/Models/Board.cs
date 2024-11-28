using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Board
{
    public Guid Id { get; set; }

    public Guid Playerid { get; set; }

    public Guid? Gameid { get; set; }

    public int? Price { get; set; }

    public bool? AutoplayEnabled { get; set; }

    public DateTime? CreatedAt { get; set; }

    public string? Sequence { get; set; }
    
    public int? AutoplayStartWeek { get; set; }
    
    public int? AutoplayWeeksRemaining { get; set; }

    public virtual Game? Game { get; set; }

    public virtual PlayerProfile? Player { get; set; }
}
