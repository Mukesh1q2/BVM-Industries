"use client";
import { X, Check, Mail, Phone, ArrowRight } from 'lucide-react';
import type { Product } from '../data/products';

import { useRouter } from 'next/navigation';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailModal = ({ product, onClose }: ProductDetailModalProps) => {
  const navigate = useRouter();

  const handleEnquiry = () => {
    onClose();
    navigate.push('/contact');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-bvm-navy-light rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col lg:flex-row overflow-y-auto max-h-[90vh]">
          {/* Image Section */}
          <div className="lg:w-1/2 h-64 lg:h-auto relative">
            <img
              src={product.image}
              alt={product.name}
              width={600}
              height={400}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bvm-navy-light/50 lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-bvm-navy-light to-transparent lg:hidden" />

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-4 py-1.5 bg-bvm-blue text-white text-sm font-medium rounded-full">
                {product.category}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 p-6 lg:p-8">
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-white mb-4">
              {product.name}
            </h2>

            <p className="text-bvm-gray mb-6 leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-bvm-blue" />
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-bvm-blue mt-0.5 flex-shrink-0" />
                    <span className="text-bvm-gray text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="mb-8">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span className="w-6 h-px bg-bvm-blue" />
                Technical Specifications
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="bg-white/5 rounded-lg p-3">
                    <div className="text-bvm-gray text-xs mb-1">{key}</div>
                    <div className="text-white text-sm font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleEnquiry}
                className="btn-primary flex-1"
              >
                Request Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <a
                href="tel:+917949303163"
                className="btn-secondary flex-1"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </div>

            {/* Contact Info */}
            <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap gap-4 text-sm">
              <a
                href="mailto:sales@bvmindustries.com"
                className="flex items-center gap-2 text-bvm-gray hover:text-bvm-blue transition-colors"
              >
                <Mail className="w-4 h-4" />
                sales@bvmindustries.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
