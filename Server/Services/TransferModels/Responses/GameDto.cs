using DataAccess.Models;

namespace Services.TransferModels.Responses;

public class GameDto
{
    public GameDto FromEntity(Game game)
    {
        return new GameDto()
        {
            Id = game.Id,
            Week = game.Week,
            Winningseq = game.Winningseq,
            Year = game.Year,
            Prizepool = game.Prizepool,
            Carryover = game.Carryover,
            Isactive = game.Isactive,
            CreatedAt = game.CreatedAt,
            UpdatedAt = game.UpdatedAt,
            Boards = game.Boards,
            StartingDate = game.StartingDate,
            EndingDate = game.EndingDate
        };
    }
    
    public Guid Id { get; set; }

    public int Week { get; set; }

    public string? Winningseq { get; set; }

    public int? Year { get; set; }

    public decimal? Prizepool { get; set; }

    public decimal? Carryover { get; set; }

    public bool? Isactive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<Board> Boards { get; set; } = new List<Board>();
    
    public DateTime? StartingDate { get; set; }
    
    public DateTime? EndingDate { get; set; }
}