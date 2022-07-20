using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        // Password should contain numbers, lowercase and uppercase chars and nonalphanumeric char
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=[A-Z]).{4,8}$", ErrorMessage = "Password must be complex")]
        public string Password { get; set; }
        public string UserName { get; set; }
    }
}
