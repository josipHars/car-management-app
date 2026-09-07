using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CarManagement.Data;

public static class DependencyInjection
{
    public static IServiceCollection AddCarManagementData(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("CarManagementDatabase")
            ?? throw new InvalidOperationException("Connection string 'CarManagementDatabase' was not found.");

        services.AddDbContext<CarDbContext>(options => options.UseSqlServer(connectionString));

        return services;
    }
}
