using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using AstroGearsV2Data.Models;

namespace AstroGearsV2Data.DataAccess
{
    public class EnteredCharts
    {
        public static async Task<dynamic> GetEnteredChartsListing(dynamic args)
        {
            var db = new AstroGearsEntities1();

            var pageNumber = (int)args.PageNumber > 0 ? (int)args.PageNumber : 1;
            var entriesPerPage = (int)args.EntriesPerPage > 0 ? (int)args.EntriesPerPage : 10;

            var enteredCharts = db.EnteredCharts.Include(chart => chart.ChartType).Include(chart => chart.ChartObjects);

            var page =
                await Task.Run(() => enteredCharts.OrderBy(x => x.ChartType.ChartTypeId)
                    .ThenBy(x => x.SubjectName)
                    .ThenBy(x => x.OriginDateTimeUnknown)
                    .ThenBy(x => x.OriginDateTime)
                    .Select(x => x)
                    .Skip((pageNumber - 1) * entriesPerPage)
                    .Take(entriesPerPage)
                    .GroupBy(x => new { Total = enteredCharts.Count() })
                    .FirstOrDefault());

            var total = page?.Key.Total ?? 0;

            var listing = await Task.Run(() => page?.Select(
                chart =>
                    new
                    {
                        chart.SubjectName,
                        chart.SubjectLocation,
                        chart.OriginDateTimeString,
                        chart.OriginDateTime,
                        chart.OriginDateTimeUnknown,
                        chart.ChartType.ChartTypeName,
                        chart.ChartTypeId,
                        chart.EnteredChartId,
                        NumberOfChartObjects = chart.ChartObjects.Count
                    }));

            return new {Listing = listing, TotalPages = Math.Ceiling((decimal) total/entriesPerPage)};
        }

        public static async Task<dynamic> GetEnteredChart(dynamic args)
        {
            var db = new AstroGearsEntities1();

            var id = (int)args.Id;

            var enteredChart = await Task.Run(() => db.EnteredCharts.Include(chart => chart.ChartType).Include(chart => chart.ChartObjects).Where(chart => chart.EnteredChartId == id));

            var thisChart = (await enteredChart.ToListAsync()).Select(
                chart =>
                    new
                    {
                        chart.SubjectName,
                        chart.SubjectLocation,
                        chart.OriginDateTimeString,
                        chart.OriginDateTime,
                        chart.OriginDateTimeUnknown,
                        chart.ChartType.ChartTypeName,
                        chart.ChartTypeId,
                        chart.EnteredChartId,
                        NumberOfChartObjects = chart.ChartObjects.Count
                    }
                ).FirstOrDefault();

            return new {Chart = thisChart};
        }

        public static async Task<dynamic> AddNewChart(dynamic args)
        {
            var db = new AstroGearsEntities1();

            var newChart = new EnteredChart
            {
                SubjectName = args.SubjectName,
                SubjectLocation = args.SubjectLocation,
                OriginDateTime = DateTime.Parse((string)args.OriginDateTime),
                ChartTypeId = byte.Parse((string)args.ChartTypeId),
                OriginDateTimeUnknown = (bool)args.OriginDateTimeUnknown
            };

            await Task.Run(() => db.EnteredCharts.Add(newChart));
            await db.SaveChangesAsync();
            return new {Message = $"New Chart for {newChart.SubjectName} has been successfully added."};
        }

        public static async Task<dynamic> EditChart(dynamic args)
        {
            var db = new AstroGearsEntities1();

            var id = (int) args.EnteredChartId;

            var editChart = await db.EnteredCharts.FindAsync(id);

            editChart.SubjectName = args.SubjectName;
            editChart.SubjectLocation = args.SubjectLocation;
            editChart.OriginDateTime = DateTime.Parse((string) args.OriginDateTime);
            editChart.ChartTypeId = byte.Parse((string) args.ChartTypeId);
            editChart.OriginDateTimeUnknown = (bool) args.OriginDateTimeUnknown;

            await db.SaveChangesAsync();
            return new { Message = $"Update for {editChart.SubjectName} was successful." };
        }
    }
}
