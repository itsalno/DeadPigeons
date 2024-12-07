using System.ComponentModel.DataAnnotations;

namespace Services.Auth.dto;

public class Register
{
    [Required]
    public string Username { get; set; }

    [Required, EmailAddress]
    public string Email { get; set; }

    [Required, DataType(DataType.Password)]
    public string Password { get; set; }

    [Required]
    public string Name { get; set; }
    
    [Required]
    public string Surname { get; set; }
    
    [Required,DataType(DataType.PhoneNumber)]
    public string Phone { get; set; }
    
    public bool FirstPass { get; set; }
}