﻿namespace Services.TransferModels.Responses;

public class PlayerDTO
{
    public Guid PlayerId { get; set; }
    public int? Balance { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Phone { get; set; }
    
    public bool? IsActive { get; set; }

}