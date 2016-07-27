using System.Linq;
using System.Threading.Tasks;
using AstroGearsV2Data.Models;

namespace AstroGearsV2Data.DataAccess
{
    public class ChartTypes
    {
        public static async Task<dynamic> GetChartTypesList()
        {
            var db = new AstroGearsEntities1();

            return await Task.Run(() => new {ChartTypes = db.ChartTypes.Select(chartType => new {chartType.ChartTypeId, chartType.ChartTypeName})});
        }
    }
}
