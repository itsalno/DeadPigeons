namespace Services.TransferModels.Responses;

public class WinnerDto
{
    public DateTime CreatedAt{ get; set; }
    public string Sequence { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Phone { get; set; }
    public decimal AmountWon { get; set; }
}