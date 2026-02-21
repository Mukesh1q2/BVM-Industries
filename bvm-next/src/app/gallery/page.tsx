"use client";
import { useState } from 'react';
import { X, ZoomIn, Grid, List, Check } from 'lucide-react';
import { products, type Product } from '../../data/products';
import ProductDetailModal from '../../components/ProductDetailModal';

type ViewMode = 'grid' | 'list';

const GalleryPage = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="page-container min-h-screen">
            {/* Header Section */}
            <section className="relative py-20 lg:py-28 px-4 sm:px-8 lg:px-[8vw] bg-bvm-navy-light pt-32">
                <div className="max-w-4xl">
                    <div className="eyebrow mb-4">PRODUCT GALLERY</div>
                    <h1 className="headline-lg text-white mb-6">
                        Photos
                    </h1>
                    <p className="body-text text-lg max-w-2xl">
                        Browse our complete product range. Click on any product to view detailed
                        specifications, features, and technical information.
                    </p>
                </div>
            </section>

            {/* Filters & View Toggle */}
            <section className="sticky top-[88px] z-30 bg-bvm-navy/95 backdrop-blur-md border-y border-white/10 py-4 px-4 sm:px-8 lg:px-[8vw]">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
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

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-bvm-blue text-white' : 'text-bvm-gray hover:text-white'
                                }`}
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-bvm-blue text-white' : 'text-bvm-gray hover:text-white'
                                }`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-12 lg:py-20 px-4 sm:px-8 lg:px-[8vw]">
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                className="group relative aspect-square bg-white/5 rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-bvm-blue/50 transition-all duration-300"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    width={400}
                                    height={400}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-bvm-navy via-bvm-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-bvm-blue text-xs font-medium mb-1">{product.category}</span>
                                    <h3 className="text-white font-semibold text-sm">{product.name}</h3>
                                </div>

                                {/* Zoom Icon */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-bvm-blue/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                                    <ZoomIn className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                className="group flex flex-col sm:flex-row gap-6 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-bvm-blue/50 cursor-pointer transition-all duration-300"
                            >
                                {/* Image */}
                                <div className="w-full sm:w-48 h-48 sm:h-32 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        width={192}
                                        height={128}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-3 py-1 bg-bvm-blue/20 text-bvm-blue text-xs font-medium rounded-full">
                                            {product.category}
                                        </span>
                                    </div>
                                    <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-bvm-blue transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-bvm-gray text-sm mb-3 line-clamp-2">
                                        {product.shortDescription}
                                    </p>

                                    {/* Features Preview */}
                                    <div className="flex flex-wrap gap-2">
                                        {product.features.slice(0, 3).map((feature, idx) => (
                                            <span key={idx} className="flex items-center gap-1 text-xs text-bvm-gray">
                                                <Check className="w-3 h-3 text-bvm-blue" />
                                                {feature.split(' ').slice(0, 3).join(' ')}...
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="hidden sm:flex items-center">
                                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-bvm-blue transition-colors">
                                        <ZoomIn className="w-4 h-4 text-bvm-gray group-hover:text-white" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <X className="w-8 h-8 text-bvm-gray" />
                        </div>
                        <h3 className="text-white text-xl font-semibold mb-2">No products found</h3>
                        <p className="text-bvm-gray">Try selecting a different category</p>
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

export default GalleryPage;
