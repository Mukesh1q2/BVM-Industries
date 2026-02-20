import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    productInterest: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Thank you for your enquiry! We will get back to you soon.');
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      productInterest: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      id="contact"
      className="relative bg-bvm-navy py-20 lg:py-32"
    >
      <div className="px-4 sm:px-8 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left text block */}
          <div className="lg:w-[36vw]">
            <h2 className="headline-md text-white mb-6">
              Request a Quote
            </h2>
            <p className="body-text mb-8">
              Tell us what you're packaging. We'll recommend the right machine,
              mould, or integration for your specific needs.
            </p>

            {/* Contact details */}
            <div className="space-y-4">
              <a
                href="mailto:sales@bvmindustries.com"
                className="flex items-center gap-3 text-bvm-gray hover:text-bvm-blue transition-colors"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <span>sales@bvmindustries.com</span>
              </a>

              <a
                href="tel:+917949303163"
                className="flex items-center gap-3 text-bvm-gray hover:text-bvm-blue transition-colors"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span>+91-79493-03163</span>
              </a>

              <div className="flex items-center gap-3 text-bvm-gray">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span>Baddi, Himachal Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className="lg:flex-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl p-6 lg:p-8 shadow-card"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-bvm-navy text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-bvm-light border border-transparent rounded-lg text-bvm-navy placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-bvm-navy text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-bvm-light border border-transparent rounded-lg text-bvm-navy placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-bvm-navy text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-bvm-light border border-transparent rounded-lg text-bvm-navy placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-bvm-navy text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-bvm-light border border-transparent rounded-lg text-bvm-navy placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                    placeholder="+91..."
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-bvm-navy text-sm font-medium mb-2">
                  Product Interest
                </label>
                <select
                  name="productInterest"
                  value={formData.productInterest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bvm-light border border-transparent rounded-lg text-bvm-navy focus:outline-none focus:border-bvm-blue transition-colors"
                >
                  <option value="">Select a product</option>
                  <option value="blow-moulding">Blow Moulding Machines</option>
                  <option value="bfs-moulds">BFS Moulds</option>
                  <option value="pet-moulds">PET Bottle Moulds</option>
                  <option value="ampoule">Ampoule Filling Machines</option>
                  <option value="hydraulic">Hydraulic Cylinders</option>
                  <option value="filtration">SS Filter Housings</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-bvm-navy text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-bvm-light border border-transparent rounded-lg text-bvm-navy placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors resize-none"
                  placeholder="Tell us about your requirements..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Enquiry
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
