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
            Isautoplay = board.Isautoplay,
            CreatedAt = board.CreatedAt,
            Game = board.Game,
            Player = board.Player,
            Sequence = board.Sequence,
        };
    }
    
    public Guid Id { get; set; }

    public Guid? Playerid { get; set; }

    public Guid? Gameid { get; set; }

    public int? Price { get; set; }

    public bool? Isautoplay { get; set; }

    public DateTime? CreatedAt { get; set; }
    
    public string? Sequence { get; set; }

    public virtual Game? Game { get; set; }

    public virtual PlayerProfile? Player { get; set; }
}