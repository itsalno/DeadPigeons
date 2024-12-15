using System.Text;
using DataAccess;
using DataAccess.Data.Interfaces;
using DataAccess.Models;
using DataAccess.Interfaces;
using DataAccess.Repositories;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.OpenApi.Models;
using Services.Interfaces;
using Services.Security;
using Services.Services;
using Services.Validators;

namespace Api;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        
        var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
        var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");
        


        builder.Services.AddDbContext<MyDbContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });
        
        
        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtKey)),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });
        builder.Services.AddAuthorization(options =>
        {
            options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
            options.AddPolicy("UserOnly", policy => policy.RequireRole("User"));
        });


        builder.Services.AddScoped<JWTGenerator>();
        builder.Services.AddScoped<IPlayerProfileService, PlayerProfileService>();
        builder.Services.AddScoped<IPlayerProfileRepository, PlayerProfileRepository>();
        builder.Services.AddScoped<IUserRepository, UserRepository>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IBalanceRepository, BalanceRepository>();
        builder.Services.AddScoped<IBalanceService, BalanceService>();
        builder.Services.AddScoped<IGameService, GameService>();
        builder.Services.AddScoped<IGameRepository, GameRepository>();
        builder.Services.AddScoped<IBoardService, BoardService>();
        builder.Services.AddScoped<IBoardRepository, BoardRepository>();
        builder.Services.AddScoped<IWinnerRepository, WinnerRepository>();
        builder.Services.AddScoped<IWinnerService, WinnerService>();
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<ValidateAddBalance>());
        builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<ValidateCreateBoard>());
        builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<ValidateCreateGame>());
        builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<ValidateCreatePlayerProfile>());
        builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<ValidateCreateUser>());

        builder.Services.AddSwaggerGen(c =>
        {
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer",
                BearerFormat = "JWT",
                In = ParameterLocation.Header
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                         Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        }
                    },
                    Array.Empty<string>()
                }
            });
        });

        builder.Services.AddAuthorization();

        builder.Services.AddControllersWithViews()
            .AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

        var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
        var url = $"http://0.0.0.0:{port}";
        var target = Environment.GetEnvironmentVariable("TARGET") ?? "World";
        
        var app = builder.Build();
        
        app.MapGet("/", () => $"Hello {target}!").AllowAnonymous();

        
        
        app.UseForwardedHeaders(
            new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            }
        );


        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }


        app.UseHttpsRedirection();

        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.UseCors(config => config.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

        app.Run(url);
    }
}