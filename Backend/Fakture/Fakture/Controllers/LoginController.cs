using Fakture.Data;
using Fakture.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Fakture.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly FaktureDbContext faktureDbContext;
  
        public LoginController(FaktureDbContext faktureDbContext)
        {
            this.faktureDbContext = faktureDbContext;
        }

        [HttpPost]  //dodavanje korisnika
        public async Task<IActionResult> addUser([FromBody] User user)
        {
            user.password = BCrypt.Net.BCrypt.HashPassword(user.password);
            await faktureDbContext.User.AddAsync(user);
            await faktureDbContext.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPost]  //provjera login podataka
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var korisnik = await faktureDbContext.User.FirstOrDefaultAsync(x => x.email == user.email);
            var key = Encoding.UTF8.GetBytes("1234567890123456");
            if (korisnik!=null && BCrypt.Net.BCrypt.Verify(user.password,korisnik.password)==true)
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("User",korisnik.email.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            return BadRequest(new { message = "Username or password is incorrect." });
        }

    }
}
