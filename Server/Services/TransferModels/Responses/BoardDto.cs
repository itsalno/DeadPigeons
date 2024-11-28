using DataAccess.Models;

namespace Services.TransferModels.Responses;

public class BoardDto
{
    public BoardDto FromEntity(Board board)
    {
        return new BoardDto()
        {
            Id = board.Id,
            Playerid = board.Playerid,
            Gameid = board.Gameid,
            Price = board.Price,
            AutoplayEnabled = board.AutoplayEnabled,
            CreatedAt = board.CreatedAt,
            Game = board.Game,
            Player = board.Player,
            Sequence = board.Sequence,
            AutoplayWeeksRemaining = board.AutoplayWeeksRemaining,
            AutoplayStartWeek = board.AutoplayStartWeek,
        };
    }
    
    public Guid Id { get; set; }

    public Guid? Playerid { get; set; }

    public Guid? Gameid { get; set; }

    public decimal? Price { get; set; }

    public bool? AutoplayEnabled { get; set; }

    public DateTime? CreatedAt { get; set; }
    
    public string? Sequence { get; set; }

    public virtual Game? Game { get; set; }

    public virtual PlayerProfile? Player { get; set; }
    
    public int? AutoplayStartWeek { get; set; }
    
    public int? AutoplayWeeksRemaining { get; set; }
}