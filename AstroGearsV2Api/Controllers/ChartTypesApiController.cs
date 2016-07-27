using System.Threading.Tasks;
using System.Web.Http;
using AstroGearsV2Data.DataAccess;

namespace AstroGearsV2Api.Controllers
{
    public class ChartTypesApiController : ApiController
    {
        [ActionName("GetChartTypesList")]
        [HttpPost]
        public async Task<dynamic> GetChartTypesList()
        {
            return await ChartTypes.GetChartTypesList();
        }
    }
}
