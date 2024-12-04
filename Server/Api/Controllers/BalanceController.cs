using DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;
using Services.Services;
using Services.TransferModels.Requests;
using Services.TransferModels.Responses;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BalanceController(IBalanceService balanceService): ControllerBase
{
    
    [HttpPost]
    [Route("")]
    [Authorize(Roles = "User")]
    public ActionResult<BalanceDTO> AddFunds([FromBody] CreateBalanceDTO createBalanceDto)
    {
        var balance = balanceService.AddFunds(createBalanceDto);
        return Ok(balance);
        
    }
    
    [HttpGet("all/{playerId}")]
    [Authorize(Roles = "Admin")]
    public ActionResult<BalanceDTO> GetTransactionsByPlayerId(Guid playerId)
    {
        var transactions = balanceService.GetBalancesByPlayerId(playerId);
        if (transactions == null || transactions.Count == 0)
        {
            return NotFound(new { Message = "No transactions found for this player." });
        }

        return Ok(transactions);
    }
    
    
    [HttpGet("pending/{playerId}")]
    [Authorize(Roles = "Admin")]
    public ActionResult<BalanceDTO> GetPendingTransactionsByPlayerId(Guid playerId)
    {
        var transactions = balanceService.GetPendingBalancesByPlayerId(playerId);
        if (transactions == null || transactions.Count == 0)
        {
            return NotFound(new { Message = "No transactions found for this player." });
        }

        return Ok(transactions);
    }
    
    [HttpPatch]
    [Route("approveTransaction")]
    [Authorize(Roles = "Admin")]
    public ActionResult<Transaction> ApproveTransaction(Guid id)
    {
        var transaction = balanceService.ApproveTransaction(id);

        if (transaction == null)
        {
            return NotFound(new { message = "Transaction not found" });
        }

        return Ok(transaction);
    }
    
    [HttpPatch]
    [Route("rejectTransaction")]
    [Authorize(Roles = "Admin")]
    public ActionResult<Transaction> RejectTransaction(Guid id)
    {
        var transaction = balanceService.RejectTransaction(id);

        if (transaction == null)
        {
            return NotFound(new { message = "Transaction not found" });
        }

        return Ok(transaction);
    }
    
    
    
    
    
}