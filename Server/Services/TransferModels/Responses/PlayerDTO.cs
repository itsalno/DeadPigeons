namespace Services.TransferModels.Responses;

public class PlayerDTO
{
    public Guid PlayerId { get; set; }
    public decimal? Balance { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
}