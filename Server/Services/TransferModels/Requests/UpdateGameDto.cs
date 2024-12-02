namespace Services.TransferModels.Requests;

public class UpdateGameDto
{
    public Guid GameId { get; set; }
    public int? Prizepool { get; set; }
}