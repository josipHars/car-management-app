using CarManagement.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace CarManagement.Data;

public sealed class CarDbContext(DbContextOptions<CarDbContext> options) : DbContext(options)
{
    public DbSet<Car> Cars => Set<Car>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var car = modelBuilder.Entity<Car>();

        car.ToTable("Cars");
        car.HasKey(item => item.Id);
        car.Property(item => item.Manufacturer).HasMaxLength(100).IsRequired();
        car.Property(item => item.Type).HasMaxLength(100).IsRequired();
        car.Property(item => item.FuelType).HasMaxLength(50).IsRequired();
        car.Property(item => item.ManufactureDate).HasColumnType("date");
        car.Property(item => item.NumberOfDoors).IsRequired();
        car.Property(item => item.DriveType).HasMaxLength(20).IsRequired();
    }
}
