using DeshawnsDogWalking.Models;
using DeshawnsDogWalking.Models.DTOs;
using Microsoft.AspNetCore.Mvc;


List<Dog> dogs = new List<Dog> 
{
     new Dog 
    { 
        Id = 1, 
        Name = "Buddy", 
        CityId = 2, 
        WalkerId = 1 
    },
    new Dog 
    { 
        Id = 2, 
        Name = "Bella", 
        CityId = 1, 
        WalkerId = 3 
    },
    new Dog 
    { 
        Id = 3, 
        Name = "Charlie", 
        CityId = 3, 
        WalkerId = 2 
    },
    new Dog 
    { 
        Id = 4, 
        Name = "Luna", 
        CityId = 2, 
        WalkerId = 1 
    },
    new Dog 
    { 
        Id = 5, 
        Name = "Max", 
        CityId = 3, 
        WalkerId = 2 
    }
};

List<Walker> walkers = new List<Walker>
{
    new Walker 
    { 
        Id = 1, 
        Name = "Alex" 
    },
    new Walker 
    { 
        Id = 2, 
        Name = "Jordan" 
    },
    new Walker 
    { 
        Id = 3, 
        Name = "Taylor" 
    },
    new Walker 
    { 
        Id = 4, 
        Name = "Morgan" 
    },
    new Walker 
    { 
        Id = 5, 
        Name = "Casey" 
    }
};

List<City> cities = new List<City>
{
    new City 
    { 
        Id = 1, 
        Name = "New York" 
    },
    new City 
    { 
        Id = 2, 
        Name = "Los Angeles" 
    },
    new City 
    { 
        Id = 3, 
        Name = "Chicago" 
    },
    new City 
    { 
        Id = 4, 
        Name = "Houston" 
    },
    new City 
    { 
        Id = 5, 
        Name = "Phoenix" 
    }
};

List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new WalkerCity
    {
        Id = 1,
        WalkerId = 1, // Alex
        CityId = 2    // Los Angeles
    },
    new WalkerCity
    {
        Id = 2,
        WalkerId = 1, // Alex
        CityId = 3    // Chicago
    },
    new WalkerCity
    {
        Id = 3,
        WalkerId = 2, // Jordan
        CityId = 1    // New York
    },
    new WalkerCity
    {
        Id = 4,
        WalkerId = 3, // Taylor
        CityId = 4    // Houston
    },
    new WalkerCity
    {
        Id = 5,
        WalkerId = 4, // Morgan
        CityId = 5    // Phoenix
    },
    new WalkerCity
    {
        Id = 6,
        WalkerId = 3,
        CityId = 5
    }
};





var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});


app.MapGet("api/dogs", ()=> 
{

    foreach (Dog dog in dogs)
    {
        dog.Walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
        dog.City = cities.FirstOrDefault(c => c.Id == dog.CityId);  
    }


    return dogs.Select(dog => {
        return new DogDTO
        {
           Id = dog.Id,
           Name = dog.Name,
           CityId = dog.CityId,
           WalkerId = dog.WalkerId,
           Walker = dog.Walker != null ? new WalkerDTO
           {
            Id = dog.Walker.Id,
            Name = dog.Walker.Name
            } : null,
           City = new CityDTO
           {
            Id = dog.CityId,
            Name = dog.City.Name
           }
         

        };
    });

});


app.MapPost("api/dogs", (Dog dog) => 
{


dog.Walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
dog.City = cities.FirstOrDefault(c => c.Id == dog.CityId);

 if (dog.City == null)
    {
        return Results.BadRequest("Invalid walker or city ID. Please select a valid option.");
    }

    dog.Id = dogs.Max(d => d.Id) + 1;
    dogs.Add(dog);


return Results.Created($"/api/dogs/{dog.Id}", new DogDTO 
{
    Id = dog.Id,
    Name = dog.Name,
    CityId = dog.CityId,
    City = new CityDTO
    {
        Id = dog.City.Id,
        Name = dog.City.Name
    },
    WalkerId = dog.WalkerId,
    Walker = dog.Walker != null ? new WalkerDTO
    {
        Id = dog.Walker.Id,
        Name = dog.Walker.Name
    } : null
});

});

app.MapGet("api/dogs/{id}", (int id)=>{
    Dog foundDog = dogs.FirstOrDefault(dog => dog.Id == id);
    if (foundDog == null)
    {
        return Results.NotFound();
    }

    return Results.Ok(new DogDTO 
    {
        Id = foundDog.Id,
        Name = foundDog.Name,
        CityId = foundDog.CityId,
        City = new CityDTO
        {
            Id = foundDog.City.Id,
            Name = foundDog.City.Name
        },
        WalkerId = foundDog.WalkerId,
        Walker = foundDog.Walker != null ? new WalkerDTO
        {
            Id = foundDog.Walker.Id,
            Name = foundDog.Walker.Name
        }: null

    });



});






app.MapGet("api/walkers", () => {
    foreach (WalkerCity wc in walkerCities)
    {
        wc.City = cities.FirstOrDefault(city => city.Id == wc.CityId);
    }
    return walkers.Select(walker => {
        // Get all cities for the current walker
        var citiesForWalker = walkerCities
            .Where(wc => wc.WalkerId == walker.Id)  // Find all entries where this walker is referenced
            .Select(wc => wc.City != null ? new CityDTO               // Project each associated city into a CityDTO
            {
                Id = wc.City.Id,
                Name = wc.City.Name
            }:null)
            .ToList();

        // Create the WalkerDTO including the list of cities
        return new WalkerDTO
        {
            Id = walker.Id,
            Name = walker.Name,
            Cities = citiesForWalker  // Assign the list of CityDTOs to the Cities property
        };
    }).ToList();  // Convert the final result to a list
});









app.MapGet("api/cities", ()=> {
    return cities.Select(city => {
        return new CityDTO
        {
            Id = city.Id,
            Name = city.Name
        };
    });

});


app.MapDelete("api/dogs/{id}", (int id)=>{
    Dog foundDog = dogs.FirstOrDefault(dog => dog.Id == id);

    if (foundDog == null)
    {
        return Results.NotFound();
    }

    dogs.Remove(foundDog);

    return Results.NoContent();

});




app.Run();
