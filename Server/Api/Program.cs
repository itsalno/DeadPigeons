using DataAccess;
using DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using FluentValidation.AspNetCore;
using DotNetEnv;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthorization();
builder.Services.AddAuthentication();

builder.Services.AddIdentityCore<User>()
    .AddEntityFrameworkStores<MyDbContext>()
    .AddApiEndpoints();



var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");

builder.Services.AddDbContext<MyDbContext>(options =>
{
    options.EnableSensitiveDataLogging();
    options.UseNpgsql(connectionString);
});


/*builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();


/*builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});*/


var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapIdentityApi<User>().AllowAnonymous(); 


app.UseAuthorization();
app.UseAuthentication(); 
app.MapControllers();
app.UseCors(config => config.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.Run();