using AstroGearsV2Data.Models;
using AstroGearsV2Data.DataAccess;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace AstroGearsV2Api.Controllers
{
    public class EnteredChartsApiController : ApiController
    {
        public AstroGearsEntities1 Db { get; } = new AstroGearsEntities1();

        [ActionName("GetEnteredChartsListing")]
        [HttpPost]
        public async Task<dynamic> GetEnteredChartsListing([FromBody] dynamic args)
        {
            return await EnteredCharts.GetEnteredChartsListing(args);
        }

        [ActionName("GetEnteredChart")]
        [HttpPost]
        public async Task<dynamic> GetEnteredChart([FromBody] dynamic args)
        {
            return await EnteredCharts.GetEnteredChart(args);
        }

        [ActionName("AddNewChart")]
        [HttpPost]
        public async Task<dynamic> AddNewChart([FromBody] dynamic args)
        {
            return await EnteredCharts.AddNewChart(args);
        }

        [ActionName("EditChart")]
        [HttpPost]
        public async Task<dynamic> EditChart([FromBody] dynamic args)
        {
            return await EnteredCharts.EditChart(args);
        }
    }
}
