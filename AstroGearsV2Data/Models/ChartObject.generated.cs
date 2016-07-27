//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AstroGearsV2Data.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ChartObject
    {
        public int ChartObjectId { get; set; }
        public int CelestialObjectId { get; set; }
        public int EnteredChartID { get; set; }
        public byte SignId { get; set; }
        public byte Degrees { get; set; }
        public byte Minutes { get; set; }
        public byte Seconds { get; set; }
        public byte OrientationId { get; set; }
    
        public virtual CelestialObject CelestialObject { get; set; }
        public virtual EnteredChart EnteredChart { get; set; }
        public virtual Orientation Orientation { get; set; }
        public virtual Sign Sign { get; set; }
    }
}