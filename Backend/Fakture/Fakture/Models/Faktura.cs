using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace Fakture.Models
{
    public class Faktura
    {
        [Key]
        public Guid id_fakture { get; set; }

        public DateTime Datum { get; set; }
        public string partner { get; set; }

        public float iznosBezPDV { get; set; }
        public float postoRabata { get; set; }
        public float rabat { get; set; }
        public float iznostSaRabatomBezPDV { get; set; }
        public float PDV { get; set; }
        public float ukupno { get; set; }

    }
}
