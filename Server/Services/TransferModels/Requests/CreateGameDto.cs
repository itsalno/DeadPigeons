

using DataAccess.Models;

namespace Services.TransferModels.Requests;

public class CreateGameDto
{
    public int Week { get; set; }
    
    public int? Year { get; set; }
    
    public bool? Isactive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime StartingDate { get; set; }

    public DateTime EndingDate { get; set; }

    public Game ToGame()
    {
        return new Game()
        {
            Week = this.Week,
            Year = this.Year,
            Isactive = this.Isactive,
            CreatedAt = this.CreatedAt,
            StartingDate = this.StartingDate,
            EndingDate = this.EndingDate,
        };
    }
}