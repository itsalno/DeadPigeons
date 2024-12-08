using DataAccess.Models;
using FluentValidation;

namespace Services.Validators;

public class ValidateCreateUser : AbstractValidator<User>
{
    public ValidateCreateUser()
    {
        RuleFor(u => u.Email)
            .NotNull().WithMessage("Email cannot be null")
            .EmailAddress().NotEmpty().WithMessage("Email is required");
        
        RuleFor(u => u.Name)
            .NotNull().WithMessage("Name cannot be null")
            .NotEmpty().WithMessage("Name cannot be empty")
            .MinimumLength(3).WithMessage("Name must be at least 3 characters long");
        
        RuleFor(u => u.Surname)
            .NotNull().WithMessage("Surname cannot be null")
            .NotEmpty().WithMessage("Surname cannot be empty")
            .MinimumLength(3).WithMessage("Surname must be at least 3 characters long");
        
        RuleFor(u => u.Phone)
            .NotEmpty().WithMessage("Phone cannot be null")
            .MinimumLength(5).WithMessage("Phone must be at least 5 characters long");
        
        RuleFor(u => u.PasswordHash)
            .NotNull().WithMessage("Password cannot be null")
            .NotEmpty().WithMessage("Password cannot be empty");
    }
}