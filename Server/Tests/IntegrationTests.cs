using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Api;
using DataAccess.Models;
using Xunit.Abstractions;

namespace Tests;

public class IntegrationTests : WebApplicationFactory<Program>
{
    /*
    Facts are tests which are always true. They test invariant conditions.
    [Fact]
    Theories are tests which are only true for a particular set of data.
    [Theory]
     */
    

    private readonly JsonSerializerOptions _options = new JsonSerializerOptions()
        { PropertyNameCaseInsensitive = true };

    private string GetAdminJwtToken()
    {
        var testProjectDirectory = Directory.GetParent(AppDomain.CurrentDomain.BaseDirectory)?
            .Parent?.Parent?.Parent?.FullName;

        var tokenFilePath = Path.Combine(testProjectDirectory, "token.txt");

        var token = File.ReadAllText(tokenFilePath).Trim();
        
        return token;
    }

    //
    //PlayerProfile tests
    //
    
    [Fact]
    public async Task Get_ActivePlayerProfiles_ReturnsActivePlayerProfiles()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var response = await client.GetAsync("/api/PlayerProfile/GetAllPlayers");
        var body = await response.Content.ReadAsStringAsync();
        
        List<PlayerProfile> playerProfiles = JsonSerializer.Deserialize<List<PlayerProfile>>(body, _options)!;

        var isActiveFirst = playerProfiles.First().Isactive;
        var isActiveLast = playerProfiles.Last().Isactive;
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.True(isActiveFirst);
        Assert.True(isActiveLast);
    }
    
    [Fact]
    public async Task Get_InactivePlayers_ReturnsInactivePlayerProfiles()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var response = await client.GetAsync("api/PlayerProfile/GetAllInactivePlayers");
        var body = await response.Content.ReadAsStringAsync();

        List<PlayerProfile> playerProfiles = JsonSerializer.Deserialize<List<PlayerProfile>>(body, _options)!;

        var isActiveFirst = playerProfiles.First().Isactive;
        var isActiveLast = playerProfiles.Last().Isactive;
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.False(isActiveFirst);
        Assert.False(isActiveLast);
    }
    
    [Fact]
    public async Task Patch_PlayerProfileActiveFalse()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        //Test player profile guid (its a fake)
        var id = "ae3a776e-2c5a-4f31-8f40-96ea200dfdec";
        var content = new StringContent(id, Encoding.UTF8, "application/json");
        var response = await client.PatchAsync($"/api/PlayerProfile/{id}/softDelete", content);
        var body = await response.Content.ReadAsStringAsync();
        
        PlayerProfile playerProfile = JsonSerializer.Deserialize<PlayerProfile>(body, _options)!;
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.False(playerProfile.Isactive);
    }

    [Fact]
    public async Task Patch_PlayerProfileActiveFalse_NotFound()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        //Test player profile guid (its a fake)
        var id = "ae3a776e-2c5a-4b31-8a45-96fa220dfdec";
        var content = new StringContent(id, Encoding.UTF8, "application/json");
        var response = await client.PatchAsync($"/api/PlayerProfile/{id}/softDelete", content);
        var body = await response.Content.ReadAsStringAsync();
        
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Equal("{\"message\":\"Profile not found\"}", body);
    }

    [Fact]
    public async Task Patch_PlayerProfileActiveTrue()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var id = "4c551a01-0559-4052-8d4c-92db28095dd4";
        var content = new StringContent(id, Encoding.UTF8, "application/json");
        var response = await client.PatchAsync($"/api/PlayerProfile/{id}/makeActive", content);
        var body = await response.Content.ReadAsStringAsync();
        
        PlayerProfile playerProfile = JsonSerializer.Deserialize<PlayerProfile>(body, _options)!;
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.True(playerProfile.Isactive);
    }

    [Fact]
    public async Task Patch_PlayerProfileActiveTrue_NotFound()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var id = "6c353fbd-42b2-4d6e-ace4-ce7c51c7fbf3";
        var content = new StringContent(id, Encoding.UTF8, "application/json");
        var response = await client.PatchAsync($"/api/PlayerProfile/{id}/makeActive", content);
        var body = await response.Content.ReadAsStringAsync();
        
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Equal("{\"message\":\"Profile not found\"}", body);
    }

    [Fact]
    public async Task Put_PlayerProfileBalance_UpdatesBalance()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var id = "6c363bbd-41b2-4c6e-bde4-ce7c61c7faf3";
        var content = new StringContent("{ 'playerId': '6c363bbd-41b2-4c6e-bde4-ce7c61c7faf3',  'balance': 300}", Encoding.UTF8, "application/json-patch+json");
        var response = await client.PutAsync($"/api/PlayerProfile/update/{id}", content);
        var body = await response.Content.ReadAsStringAsync();
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("Player balance updated successfully.", body);
        
    }

    [Fact]
    public async Task Put_PlayerProfileBalance_NotFound()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var id = "6c363bbd-41b2-4c6e-bde4-bd6d52a4faf3";
        var content = new StringContent("{ 'playerId': '6c363bbd-41b2-4c6e-bde4-bd6d52a4faf3',  'balance': 300}", Encoding.UTF8, "application/json-patch+json");
        var response = await client.PutAsync($"/api/PlayerProfile/update/{id}", content);
        var body = await response.Content.ReadAsStringAsync();
        
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Equal("{\"message\":\"Player not found\"}",body);
    }

    [Fact]
    public async Task Put_PlayerProfileBalance_BadRequest()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var id = "6c363bbd-41b2-4c6e-bde4-bd6d52a4faf3";
        var content = new StringContent("{ 'playerId': 'ae3a776e-2c5a-4b31-8a45-96fa220dfdec',  'balance': 200}", Encoding.UTF8, "application/json-patch+json");
        var response = await client.PutAsync($"/api/PlayerProfile/update/{id}", content);
        var body = await response.Content.ReadAsStringAsync();
        
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Equal("Player ID in URL does not match Player ID in request body.", body);
    }

    [Fact]
    public async Task Get_PlayerProfileBalance_ReturnsBalance()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var id = "4c551a01-0559-4052-8d4c-92db28095dd4";
        var response = await client.GetAsync($"/api/PlayerProfile/getBalance/{id}");
        var body = await response.Content.ReadAsStringAsync();
        
        PlayerProfile playerProfile = JsonSerializer.Deserialize<PlayerProfile>(body, _options)!;
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(playerProfile.Balance);

    }

    [Fact]
    public async Task Get_PlayerProfileBalance_NotFound()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var id = "6c363bbd-41b2-4c6e-bde4-bd6d52a4faf3";
        var response = await client.GetAsync($"/api/PlayerProfile/getBalance/{id}");
        var body = await response.Content.ReadAsStringAsync();
        
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Equal($"Player with ID {id} not found.", body);
    }
    
    //
    //Winner Tests
    //

    [Fact]
    public async Task Get_Winners_ReturnsWinners()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var response = await client.GetAsync("/api/Winner/GetAllWinners");
        var body = await response.Content.ReadAsStringAsync();
        
        List<Winner> winners = JsonSerializer.Deserialize<List<Winner>>(body, _options)!;
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(winners);
    }
    
    
    //
    //Game Tests
    //

    [Fact]
    public async Task Get_ActiveGame_ReturnsActiveGame()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var content = new StringContent("", Encoding.UTF8, "text/plain");
        var response = await client.PostAsync("/api/Game/ActiveGame", content);
        var body = await response.Content.ReadAsStringAsync();
        
        Game game = JsonSerializer.Deserialize<Game>(body, _options)!;
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(game);
        Assert.True(game.Isactive);
    }

    [Fact]
    public async Task Get_AllGames_ReturnsAllGames()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var response = await client.GetAsync("/api/Game/GetAllGames");
        var body = await response.Content.ReadAsStringAsync();
        
        List<Game> games = JsonSerializer.Deserialize<List<Game>>(body, _options)!;
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotEmpty(games);
    }

    [Fact]
    public async Task Patch_EndGame_EndsGame()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var id = "2c7e0ab3-86f8-478c-b4ec-bd6ff53bd308";
        var seq = "123";
        var response = await client.PatchAsync($"/api/Game/endGame?id={id}&finalSequence={seq}", null);
        var body = await response.Content.ReadAsStringAsync();
        
        Game game = JsonSerializer.Deserialize<Game>(body, _options)!;
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.False(game.Isactive);
    }

    [Fact]
    public async Task Patch_EndGame_NotFound()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var id = "d4e5ab18-9e30-45c6-8d5e-d55f8fdb2458";
        var seq = "123";
        var response = await client.PatchAsync($"/api/Game/endGame?id={id}&finalSequence={seq}", null);
        var body = await response.Content.ReadAsStringAsync();
        
        Game game = JsonSerializer.Deserialize<Game>(body, _options)!;
        
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Equal("{\"message\":\"Game not found\"}",body);
    }

    [Fact]
    public async Task Put_UpdatePrizepool_UpdatesPrizepool()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var id = "d4e5ab18-9e30-45c6-8d5e-d55f8fdd1458";
        var content = new StringContent("{'gameId': 'd4e5ab18-9e30-45c6-8d5e-d55f8fdd1458', 'prizepool': 1000}", Encoding.UTF8, "application/json-patch+json");
        var response = await client.PutAsync($"/api/Game/update/{id}", content);
        var body = await response.Content.ReadAsStringAsync();
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("Game prizepool updated successfully.", body);
    }

    [Fact]
    public async Task Put_UpdatePrizepool_BadRequest()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var id = "d4e5ab18-9e30-45c6-8d5e-d55f8fdb2458";
        var content = new StringContent("{'gameId': 'd4e5ab18-9e30-45c6-8d5e-d55f8fdd1458', 'prizepool': 1000}", Encoding.UTF8, "application/json-patch+json");
        var response = await client.PutAsync($"/api/Game/update/{id}", content);
        var body = await response.Content.ReadAsStringAsync();
        
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Equal("Game ID in URL does not match Game ID in request body.", body);
    }

    [Fact]
    public async Task Get_GameById_ReturnsGame()
    {
        var client = CreateClient();
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", GetAdminJwtToken());
        var id = "2c7e0ab3-86f8-478c-b4ec-bd6ff53bd308";
        var response = await client.GetAsync($"/api/Game/getGameById/{id}");
        var body = await response.Content.ReadAsStringAsync();
        
        Game game = JsonSerializer.Deserialize<Game>(body, _options)!;
        
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.NotNull(game);
    }
    
    
    //
    //Board Tests
    //
    
    
}