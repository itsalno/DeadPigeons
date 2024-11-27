using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class Winner
{
    public Guid Id { get; set; }

    public Guid Gameid { get; set; }

    public string? Sequence { get; set; }

    public DateTime? CreatedAt { get; set; }

    public Guid? Playerid { get; set; }

    public virtual Game Game { get; set; } = null!;

    public virtual PlayerProfile? Player { get; set; }
}
