using FluentValidation;
using Services.TransferModels.Requests;

namespace Services.Validators;

public class ValidateCreateBoard : AbstractValidator<CreateBoardDto>
{
    public ValidateCreateBoard()
    {
        RuleFor(b => b.Playerid)
            .NotNull().WithMessage("Playerid cannot be null")
            .NotEmpty().WithMessage("Playerid cannot be empty");
        
        RuleFor(b => b.Gameid)
            .NotNull().WithMessage("Gameid cannot be null")
            .NotEmpty().WithMessage("Gameid cannot be empty");
        
        RuleFor(b => b.AutoplayEnabled)
            .NotNull().WithMessage("AutoplayEnabled cannot be null")
            .NotEmpty().WithMessage("AutoplayEnabled cannot be empty");
        
        RuleFor(b => b.Sequence)
            .NotNull().WithMessage("Sequence cannot be null")
            .NotEmpty().WithMessage("Sequence cannot be empty")
            .MinimumLength(5).WithMessage("Sequence must be between 5 and 8 characters")
            .MaximumLength(8).WithMessage("Sequence must be between 5 and 8 characters");
        
        RuleFor(b=>b.Price).GreaterThanOrEqualTo(20).WithMessage("Price cannot be less than 20");
    }
}