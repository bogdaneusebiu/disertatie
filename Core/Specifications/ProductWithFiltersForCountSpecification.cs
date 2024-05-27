using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecification(ProductSpecParams productParams)
        : base(x =>
                (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search))&&  
                (!productParams.BrandId.HasValue || x.BrandId == productParams.BrandId) &&
                (!productParams.Typeid.HasValue || x.ProductTypeId == productParams.Typeid)
            )
        {
            
        }
    }
}