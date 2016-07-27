using System;

namespace AstroGearsV2Api.Helpers
{
    public static class ExtensionMethods
    {
        public static int? ToNullableInt(this string str)
        {
            decimal parseResult;
            if (decimal.TryParse(str, out parseResult))
                return (int)parseResult;

            return null;
        }

        public static decimal? ToNullableDecimal(this string str)
        {
            decimal parseResult;
            if (decimal.TryParse(str, out parseResult))
                return parseResult;

            return null;
        }

        public static bool? ToNullableBool(this string str)
        {
            bool parseResult;
            if (bool.TryParse(str, out parseResult))
                return parseResult;

            return null;
        }

        public static DateTime? ToNullableDateTime(this string str)
        {
            DateTime parseResult;
            if (DateTime.TryParse(str, out parseResult))
                return parseResult;

            return null;
        }

        public static DateTimeOffset? ToNullableDateTimeOffset(this string str)
        {
            DateTimeOffset parseResult;
            if (DateTimeOffset.TryParse(str, out parseResult))
                return parseResult;

            return null;
        }
    }
}