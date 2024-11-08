using DeshawnsDogWalking.Models;
using DeshawnsDogWalking.Models.DTOs;


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
    return dogs.Select(dog => {
        return new DogDTO
        {
           Id = dog.Id,
           Name = dog.Name,
           CityId = dog.CityId,
           WalkerId = dog.WalkerId
        };
    });

});


app.Run();
