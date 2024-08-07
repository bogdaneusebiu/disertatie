using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class AddressDto
    {
        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? Street { get; set; }
        [Required]
        public string? City { get; set; }
        [Required]
        public string? Judet { get; set; }
        [Required]
        public string? ZipCode { get; set; }
    }
}