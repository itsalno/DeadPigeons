using FluentValidation;
using Services.TransferModels.Requests;

namespace Services.Validators;

public class ValidateCreateGame : AbstractValidator<CreateGameDto>
{
    public ValidateCreateGame()
    {
        RuleFor(g => g.Week)
            .NotNull().WithMessage("Week cannot be null.")
            .NotEmpty().WithMessage("Please specify a valid week");
        
        RuleFor(g => g.Year)
            .NotNull().WithMessage("Year cannot be null.")
            .NotEmpty().WithMessage("Please specify a valid year");
        
        RuleFor(g => g.StartingDate)
            .NotNull().WithMessage("Starting date cannot be null.")
            .NotEmpty().WithMessage("Please specify a valid starting date");
        
        RuleFor(g => g.EndingDate)
            .NotNull().WithMessage("Ending date cannot be null.")
            .NotEmpty().WithMessage("Please specify a valid ending date");
        
        RuleFor(g => g.Isactive)
            .NotNull().WithMessage("Isactive cannot be null.")
            .NotEmpty().WithMessage("Please specify is the game active or not");
    }
}