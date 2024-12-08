using DataAccess.Models;
using FluentValidation;

namespace Services.Validators;

public class ValidateCreatePlayerProfile : AbstractValidator<PlayerProfile>
{
    public ValidateCreatePlayerProfile()
    {
        RuleFor(p => p.Userid)
            .NotNull().WithMessage("User Id cannot be null")
            .NotEmpty().WithMessage("User Id cannot be empty");
        
        RuleFor(p => p.Balance)
            .NotNull().WithMessage("Balance cannot be null")
            .GreaterThanOrEqualTo(0).WithMessage("Balance must be equal or greater than 0");
        
        RuleFor(p => p.Isactive)
            .NotNull().WithMessage("Isactive cannot be null")
            .NotEmpty().WithMessage("Player can either be active or not active");
    }
}