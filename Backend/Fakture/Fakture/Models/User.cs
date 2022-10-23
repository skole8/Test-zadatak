using System.ComponentModel.DataAnnotations;

namespace Fakture.Models
{
    public class User
    {
        [Key]
        public string email { get; set; }

        public string password { get; set; }
    }
}
