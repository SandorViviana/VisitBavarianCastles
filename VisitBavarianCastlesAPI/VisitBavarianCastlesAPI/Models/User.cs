using System.ComponentModel.DataAnnotations;

namespace VisitBavarianCastlesAPI.Models
{
    public class User
    {
        public Guid? UserId { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
    }
}
