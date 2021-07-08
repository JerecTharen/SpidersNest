using SpidersNestNetCore.Controllers;
using System;
using Xunit;

namespace SpidersNestTest
{
    public class WeatherForecastTests
    {
        [Fact]
        public void GetRandomMinMax_DoesNotThrowExceptionForJustMin()
        {
            //Arrange
            int? min = 3;
            bool ranWithoutException = true;

            //Act
            try
            {
                int result = WeatherForecastController.GetRandomMinMax(new Random(), null, min);
            }
            catch (Exception)
            {
                ranWithoutException = false;
            }

            //Assert
            Assert.True(ranWithoutException);
        }
    }
}
