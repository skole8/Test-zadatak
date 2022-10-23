using Fakture.Data;
using Fakture.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fakture.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FakturaController : Controller
    {
        private readonly FaktureDbContext faktureDbContext;

        public FakturaController(FaktureDbContext faktureDbContext)
        {
            this.faktureDbContext = faktureDbContext;
        }

        //dohvatanje svih faktura
        [HttpGet]
        public async Task<IActionResult> GetAllFakture()
        {
            var fakture = await faktureDbContext.Fakture.ToListAsync();
            return Ok(fakture);
        }

        //dohvatanje jedne fakture
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetFaktura")]
        public async Task<IActionResult> GetFaktura([FromRoute] Guid id)
        {
            var faktura = await faktureDbContext.Fakture.FirstOrDefaultAsync(x => x.id_fakture == id);
            if (faktura != null)
                return Ok(faktura);

            return NotFound("Faktura nije pronadjena!");
        }

        //dodavanje fakture
        [HttpPost]
        public async Task<IActionResult> AddFaktura([FromBody] Faktura faktura)
        {
            faktura.id_fakture = Guid.NewGuid();
            await faktureDbContext.Fakture.AddAsync(faktura);
            await faktureDbContext.SaveChangesAsync();
            return Ok(faktura);
        }

        //update fakture
        [HttpPost]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateFaktura([FromRoute] Guid id, [FromBody] Faktura faktura)
        {
            var fakturaZaAzuriranje = await faktureDbContext.Fakture.FirstOrDefaultAsync(x => x.id_fakture == id);
            if (fakturaZaAzuriranje != null)
            {
                fakturaZaAzuriranje.PDV = faktura.PDV;
                fakturaZaAzuriranje.postoRabata = faktura.postoRabata;
                fakturaZaAzuriranje.iznostSaRabatomBezPDV = faktura.iznostSaRabatomBezPDV;
                fakturaZaAzuriranje.iznosBezPDV = faktura.iznosBezPDV;
                fakturaZaAzuriranje.partner = faktura.partner;
                fakturaZaAzuriranje.ukupno=faktura.ukupno;
                fakturaZaAzuriranje.Datum = faktura.Datum;
                fakturaZaAzuriranje.rabat = faktura.rabat;
                await faktureDbContext.SaveChangesAsync();
                return Ok(fakturaZaAzuriranje);
            }
            return NotFound("Faktura nije pronadjena!");
        }

        //Brisanje fakture
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteFaktura([FromRoute] Guid id)
        {
            var faktura = await faktureDbContext.Fakture.FirstOrDefaultAsync(x => x.id_fakture == id);
            if (faktura != null)
            {
                faktureDbContext.Remove(faktura);
                await faktureDbContext.SaveChangesAsync();
                return Ok(faktura);
            }
            return NotFound("Faktura nije pronadjena");
        }
    }
}
