using Microsoft.AspNetCore.Mvc;
using Services.Services;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BalanceController(BalanceService balanceService): ControllerBase
{
    
    [HttpPost]
    [Route("")]
    public ActionResult<BalanceDTO> AddFunds([FromBody] CreateBalanceDTO createBalanceDto)
    {
        var balance = balanceService.AddFunds(createBalanceDto);
        return Ok(balance);
    }
    
}