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
    
    [HttpGet("{playerId}")]
    public ActionResult<BalanceDTO> GetTransactionsByPlayerId(Guid playerId)
    {
        var transactions = balanceService.GetBalancesByPlayerId(playerId);
        if (transactions == null || transactions.Count == 0)
        {
            return NotFound(new { Message = "No transactions found for this player." });
        }

        return Ok(transactions);
    }
    
}