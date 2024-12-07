using System.ComponentModel.DataAnnotations;

namespace Services.Auth.dto;

public class LogIn
{
    [Required]
    public string Username { get; set; }

    [Required, DataType(DataType.Password)]
    public string Password { get; set; }
    
   
    
}