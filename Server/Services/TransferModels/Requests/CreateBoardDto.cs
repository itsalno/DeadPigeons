using DataAccess.Models;

namespace Services.TransferModels.Requests;

public class CreateBoardDto
{
    public Guid Playerid { get; set; }

    public Guid? Gameid { get; set; }

    public int? Price { get; set; }

    public bool? AutoplayEnabled { get; set; }

    public DateTime? CreatedAt { get; set; }
    
    public string? Sequence { get; set; }
    
    public int? AutoplayStartWeek { get; set; }
    
    public int? AutoplayWeeksRemaining { get; set; }

    
    public Board ToBoard()
    {
        return new Board()
        {
            Playerid = Playerid,
            Gameid = Gameid,
            Price = Price,
            AutoplayEnabled = AutoplayEnabled,
            CreatedAt = CreatedAt,
            Sequence = Sequence,
            AutoplayStartWeek = AutoplayStartWeek,
            AutoplayWeeksRemaining = AutoplayWeeksRemaining,
        };
    }
}