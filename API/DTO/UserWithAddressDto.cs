using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class UserWithAddressDto
    {
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? Judet { get; set; }
        public string? ZipCode { get; set; }
    }
}