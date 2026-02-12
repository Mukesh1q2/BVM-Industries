import { useState } from 'react';
import { ArrowRight, Search, Filter, X, Check } from 'lucide-react';
import { products, productCategories, type Product } from '../data/products';
import ProductDetailModal from '../components/ProductDetailModal';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page-container min-h-screen">
      {/* Header Section */}
      <section className="relative py-20 lg:py-28 px-4 sm:px-8 lg:px-[8vw] bg-bvm-navy-light">
        <div className="max-w-4xl">
          <div className="eyebrow mb-4">OUR PRODUCTS</div>
          <h1 className="headline-lg text-white mb-6">
            Products & Services
          </h1>
          <p className="body-text text-lg max-w-2xl">
            BVM Industries manufactures a comprehensive range of blow moulding machines,
            BFS moulds, PET bottle moulds, hydraulic components, and precision engineering solutions
            for pharmaceutical, healthcare, and industrial applications.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-20 z-30 bg-bvm-navy/95 backdrop-blur-md border-y border-white/10 py-4 px-4 sm:px-8 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {productCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                  ? 'bg-bvm-blue text-white'
                  : 'bg-white/5 text-bvm-gray hover:bg-white/10 hover:text-white'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bvm-gray" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-bvm-gray hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 lg:py-20 px-4 sm:px-8 lg:px-[8vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-bvm-blue/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={192}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bvm-navy via-transparent to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-bvm-blue/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-white font-display font-semibold text-lg mb-2 group-hover:text-bvm-blue transition-colors">
                  {product.name}
                </h3>
                <p className="text-bvm-gray text-sm mb-4 line-clamp-2">
                  {product.shortDescription}
                </p>

                {/* Features Preview */}
                <div className="space-y-1 mb-4">
                  {product.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-bvm-blue mt-0.5 flex-shrink-0" />
                      <span className="text-bvm-gray text-xs">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-bvm-blue text-sm font-medium group-hover:gap-3 transition-all">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Filter className="w-16 h-16 text-bvm-gray mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">No products found</h3>
            <p className="text-bvm-gray">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
