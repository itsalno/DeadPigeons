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

    [DataType(DataType.Password), Compare("Password")]
    public string ConfirmPassword { get; set; }
}