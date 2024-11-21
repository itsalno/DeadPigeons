namespace Services.TransferModels.Requests;

public class UpdatePlayerDTO
{
    public Guid PlayerId { get; set; }
    public int Balance { get; set; }
}