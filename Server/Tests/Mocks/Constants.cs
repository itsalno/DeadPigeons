using Bogus;
using DataAccess.Models;

namespace Tests.Mocks;

public class Constants
{
    public static User GetUser()
    {
        return new Faker<User>()
            .RuleFor(d => d.Id, f => f.Random.Guid())
            .RuleFor(d => d.Username, f => f.Person.UserName)
            .RuleFor(d => d.Email, f => f.Person.Email)
            .RuleFor(d => d.PasswordHash, f => f.Random.Hash())
            .RuleFor(d => d.Role, f => "User") // can be Admin be sure to change
            .RuleFor(d => d.Name, f => f.Person.UserName)
            .RuleFor(d => d.Surname, f => f.Person.LastName)
            .RuleFor(d => d.Phone, f => f.Person.Phone);
    }

    public static PlayerProfile GetPlayerProfile()
    {
        return new Faker<PlayerProfile>()
            .RuleFor(d => d.Id, f => f.Random.Guid())
            //.RuleFor(d => d.Userid, f => f.Random.Guid())
            .RuleFor(d => d.Balance, f => f.Random.Number())
            .RuleFor(d => d.Isactive, f => f.Random.Bool())
            .RuleFor(d => d.CreatedAt, f => f.Date.Past().Day);
    }

    public static Board GetBoard()
    {
        return new Faker<Board>()
            .RuleFor(d => d.Id, f => f.Random.Guid());
        //.RuleFor(d => d.Playerid, f => f.Random.Guid())
        //.RuleFor(d => d.Gameid, f => f.Random.Guid())
        //.RuleFor()
    }
}