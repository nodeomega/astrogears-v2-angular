//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AstroGearsV2.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Sign
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Sign()
        {
            this.ChartAngles = new HashSet<ChartAngle>();
            this.ChartHouses = new HashSet<ChartHouse>();
            this.ChartObjects = new HashSet<ChartObject>();
            this.RelocatedChartAngles = new HashSet<RelocatedChartAngle>();
            this.RelocatedChartHouses = new HashSet<RelocatedChartHous>();
        }
    
        public byte SignId { get; set; }
        public string SignName { get; set; }
        public string SignAbbreviation { get; set; }
        public byte ElementId { get; set; }
        public byte QualityId { get; set; }
        public Nullable<int> TraditionalRulerId { get; set; }
        public Nullable<int> ModernRulerId { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChartAngle> ChartAngles { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChartHouse> ChartHouses { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ChartObject> ChartObjects { get; set; }
        public virtual Element Element { get; set; }
        public virtual Quality Quality { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RelocatedChartAngle> RelocatedChartAngles { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<RelocatedChartHous> RelocatedChartHouses { get; set; }
    }
}