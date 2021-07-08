using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpidersNestNetCore.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = GetRandomMinMax(rng, -20, 55),
                Summary = Summaries[GetRandomMinMax(rng, Summaries.Length)]
            })
            .ToArray();
        }

        public static int GetRandomMinMax(Random seed, int? max = null, int? min = null)
        {
            if (max.HasValue && min.HasValue)
                return seed.Next(min.Value, max.Value);
            else if (max.HasValue)
                return seed.Next(max.Value);
            else return seed.Next();
        }
    }
}
