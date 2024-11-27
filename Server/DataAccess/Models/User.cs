using System;
using System.Collections.Generic;

namespace DataAccess.Models;

public partial class User
{
    public Guid Id { get; set; }

    public string? Username { get; set; }

    public string? Email { get; set; }

    public string? PasswordHash { get; set; }

    public string? Role { get; set; }

    public string? Name { get; set; }

    public string? Surname { get; set; }

    public string? Phone { get; set; }

    public virtual ICollection<PlayerProfile> PlayerProfiles { get; set; } = new List<PlayerProfile>();
}
