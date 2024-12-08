using FluentValidation;
using Services.TransferModels.Requests;

namespace Services.Validators;

public class ValidateAddBalance : AbstractValidator<CreateBalanceDTO>
{
    public ValidateAddBalance()
    {
        RuleFor(b => b.Amount)
            .NotNull().WithMessage("Amount cannot be null")
            .GreaterThan(0).WithMessage("Amount must be greater than 0");
    }
}