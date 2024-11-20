namespace Services.TransferModels.Requests;

public class CreatePlayerDTO
{ 
        public int InitialBalance { get; set; } = 0;  
        public bool IsActive { get; set; } = false; 
}