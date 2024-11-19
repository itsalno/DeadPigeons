namespace Services.TransferModels.Requests;

public class CreatePlayerDTO
{ 
        public decimal InitialBalance { get; set; } = 0;  
        public bool IsActive { get; set; } = false; 
}