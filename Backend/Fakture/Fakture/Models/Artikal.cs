using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fakture.Models
{
    public class Artikal
    {
        [Key]
        public Guid id_artikla { get; set; }
        public string naziv_artikla { get; set; }
        public int kolicina { get; set; }
        public float cijena { get; set; }
        public float iznosBezPDV { get; set; }
        public float postoRabata { get; set; }
        public float rabat { get; set; }
        public float iznostSaRabatomBezPDV { get; set; }
        public float PDV { get; set; }
        public float ukupno { get; set; }
        public Guid id_fakture { get; set; }

        [ForeignKey("id_fakture")]
        public virtual Faktura? Faktura { get; set; }
    }
}
