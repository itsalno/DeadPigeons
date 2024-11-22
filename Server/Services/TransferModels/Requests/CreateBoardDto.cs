using DataAccess.Models;

namespace Services.TransferModels.Requests;

public class CreateBoardDto
{
    public Guid? Playerid { get; set; }

    public Guid? Gameid { get; set; }

    public decimal? Price { get; set; }

    public bool? Isautoplay { get; set; }

    public DateTime? CreatedAt { get; set; }
    
    public string? Sequence { get; set; }

    
    public Board ToBoard()
    {
        return new Board()
        {
            Playerid = Playerid,
            Gameid = Gameid,
            Price = Price,
            Isautoplay = Isautoplay,
            CreatedAt = CreatedAt,
            Sequence = Sequence,
        };
    }
}