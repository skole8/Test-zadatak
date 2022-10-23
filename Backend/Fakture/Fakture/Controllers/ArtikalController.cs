using Fakture.Data;
using Fakture.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fakture.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArtikalController : Controller
    {
        private readonly FaktureDbContext faktureDbContext;

        public ArtikalController(FaktureDbContext faktureDbContext)
        {
            this.faktureDbContext = faktureDbContext;
        }

        //dohvatanje svih artikala
        [HttpGet]
        public async Task<IActionResult> GetAllArtikli()
        {
            var artikli = await faktureDbContext.Artikal.ToListAsync();
            return Ok(artikli);
        }

        //dohvatanje jednog artikla
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetArtikal")]
        public async Task<IActionResult> GetArtikal([FromRoute] Guid id)
        {
            var artikal = await faktureDbContext.Artikal.FirstOrDefaultAsync(x => x.id_artikla == id);
            if (artikal != null)
                return Ok(artikal);

            return NotFound("Artikal nije pronadjen!");
        }

        //update artikla
        [HttpPost]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateArtikal([FromRoute] Guid id, [FromBody] Artikal artikal)
        {
            var artikalZaAzuriranje = await faktureDbContext.Artikal.FirstOrDefaultAsync(x => x.id_artikla == id);
            if (artikalZaAzuriranje != null)
            {
                artikalZaAzuriranje.PDV = artikal.PDV;
                artikalZaAzuriranje.ukupno = artikal.ukupno;
                artikalZaAzuriranje.id_fakture = artikal.id_fakture;
                artikalZaAzuriranje.kolicina = artikal.kolicina;
                artikalZaAzuriranje.naziv_artikla = artikal.naziv_artikla;
                artikalZaAzuriranje.cijena = artikal.cijena;
                artikalZaAzuriranje.iznosBezPDV = artikal.iznosBezPDV;
                artikalZaAzuriranje.iznostSaRabatomBezPDV = artikal.iznostSaRabatomBezPDV;
                artikalZaAzuriranje.rabat = artikal.rabat;
                artikalZaAzuriranje.postoRabata = artikal.postoRabata;
                
                await faktureDbContext.SaveChangesAsync();
                return Ok(artikalZaAzuriranje);
            }
            return NotFound("Artikal nije pronadjen!");
        }

        //dodavanje artikla
        [HttpPost]
        public async Task<IActionResult> AddArtikal([FromBody] Artikal artikal)
        {
            artikal.id_artikla = Guid.NewGuid();
            await faktureDbContext.Artikal.AddAsync(artikal);
            await faktureDbContext.SaveChangesAsync();
            return Ok(artikal);
        }

        //Brisanje fakture
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteArtikal([FromRoute] Guid id)
        {
            var artikal = await faktureDbContext.Artikal.FirstOrDefaultAsync(x => x.id_artikla == id);
            if (artikal != null)
            {
                faktureDbContext.Remove(artikal);
                await faktureDbContext.SaveChangesAsync();
                return Ok(artikal);
            }
            return NotFound("Artikal nije pronadjen");
        }
    }
}
