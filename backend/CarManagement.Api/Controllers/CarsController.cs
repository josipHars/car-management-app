using CarManagement.Core.Contracts;
using CarManagement.Core.Models;
using CarManagement.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarManagement.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class CarsController(CarDbContext dbContext) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Car>>> GetCars(CancellationToken cancellationToken)
    {
        var cars = await dbContext.Cars
            .AsNoTracking()
            .OrderBy(car => car.Manufacturer)
            .ThenBy(car => car.Type)
            .ToListAsync(cancellationToken);

        return Ok(cars);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Car>> GetCar(int id, CancellationToken cancellationToken)
    {
        var car = await dbContext.Cars
            .AsNoTracking()
            .FirstOrDefaultAsync(item => item.Id == id, cancellationToken);

        return car is null ? NotFound() : Ok(car);
    }

    [HttpPost]
    public async Task<ActionResult<Car>> CreateCar(
        [FromBody] SaveCarRequest request,
        CancellationToken cancellationToken)
    {
        var car = MapToCar(request);

        dbContext.Cars.Add(car);
        await dbContext.SaveChangesAsync(cancellationToken);

        return CreatedAtAction(nameof(GetCar), new { id = car.Id }, car);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<Car>> UpdateCar(
        int id,
        [FromBody] SaveCarRequest request,
        CancellationToken cancellationToken)
    {
        var car = await dbContext.Cars.FirstOrDefaultAsync(item => item.Id == id, cancellationToken);

        if (car is null)
        {
            return NotFound();
        }

        car.Manufacturer = request.Manufacturer;
        car.Type = request.Type;
        car.FuelType = request.FuelType;
        car.ManufactureDate = request.ManufactureDate;
        car.NumberOfDoors = request.NumberOfDoors;
        car.DriveType = request.DriveType;

        await dbContext.SaveChangesAsync(cancellationToken);

        return Ok(car);
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteCar(int id, CancellationToken cancellationToken)
    {
        var car = await dbContext.Cars.FirstOrDefaultAsync(item => item.Id == id, cancellationToken);

        if (car is null)
        {
            return NotFound();
        }

        dbContext.Cars.Remove(car);
        await dbContext.SaveChangesAsync(cancellationToken);

        return NoContent();
    }

    private static Car MapToCar(SaveCarRequest request) =>
        new()
        {
            Manufacturer = request.Manufacturer,
            Type = request.Type,
            FuelType = request.FuelType,
            ManufactureDate = request.ManufactureDate,
            NumberOfDoors = request.NumberOfDoors,
            DriveType = request.DriveType
        };
}
