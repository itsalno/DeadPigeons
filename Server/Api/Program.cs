
using Microsoft.EntityFrameworkCore;
using FluentValidation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



/*var connectionString = builder.Configuration.GetConnectionString("DBConnectionString");
builder.Services.AddDbContext<DMDbContext>(options =>
{
    options.EnableSensitiveDataLogging();
    options.UseNpgsql(connectionString);
});
*/

var app = builder.Build();


/*using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<DMDbContext>();
    dbContext.Database.EnsureCreated();
}
*/


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.UseCors(config => config.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.Run();