using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p =>p.id).IsRequired();
            builder.Property(p =>p.Name).IsRequired();
            builder.Property(p =>p.Description).IsRequired();
            builder.Property(p =>p.Price).HasColumnType("decimal(18,2)");
            builder.Property(p =>p.PictureUrl).IsRequired();

            builder.HasOne(b=>b.ProductBrand).WithMany().HasForeignKey(p => p.BrandId);
            builder.HasOne(b=>b.ProductType).WithMany().HasForeignKey(p => p.ProductTypeId);
            
        }
    }
}