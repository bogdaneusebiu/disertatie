using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class Address
    {
        public Address()
        {
        }

        public Address(string? firstName, string? lastName, string? street, string? city, string? judet, string? zipCode)
        {
            FirstName = firstName;
            LastName = lastName;
            Street = street;
            City = city;
            Judet = judet;
            ZipCode = zipCode;
        }

        [Required]
        public  string? FirstName { get; set; }
        [Required]
        public  string? LastName { get; set; }
        [Required]
        public  string? Street { get; set; }
        [Required]
        public  string? City { get; set; }
        [Required]
        public  string? Judet { get; set; }
        [Required]
        public  string? ZipCode { get; set; }
    }
}