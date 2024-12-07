namespace Services.TransferModels.Responses;

public class LogInResponseDTO
{
    public string Token { get; set; }
    public string PlayerProfileId { get; set; }
    
    public bool FirstPass { get; set; }
    
    public Guid UserId { get; set; }
}
