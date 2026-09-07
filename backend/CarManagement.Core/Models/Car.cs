using System.ComponentModel.DataAnnotations;

namespace CarManagement.Core.Models;

public class Car
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Manufacturer { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Type { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string FuelType { get; set; } = string.Empty;

    public DateOnly ManufactureDate { get; set; }

    [Range(1, 20)]
    public int NumberOfDoors { get; set; }

    [Required]
    [MaxLength(20)]
    public string DriveType { get; set; } = string.Empty;
}
