"use client";
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { CONTACT_INFO } from '@/config/site';

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

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Enquiry sent! We will get back to you within 1–2 business days.');
        setFormData({ name: '', company: '', email: '', phone: '', productInterest: '', message: '' });
      } else {
        const data = await res.json();
        toast.error(data.error || 'Something went wrong. Please call us at +91 7018231499.');
      }
    } catch {
      toast.error('Could not send message. Please email us directly at sales@mybvm.in');
    } finally {
      setIsSubmitting(false);
    }
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
                href={`mailto:${CONTACT_INFO.email.sales}`}
                className="flex items-center gap-3 text-bvm-gray hover:text-bvm-blue transition-colors"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <span>{CONTACT_INFO.email.sales}</span>
              </a>

              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 text-bvm-gray hover:text-bvm-blue transition-colors"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <span>{CONTACT_INFO.phone}</span>
              </a>

              <div className="flex items-center gap-3 text-bvm-gray">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="max-w-[280px]">{CONTACT_INFO.address.split(',')[0]}, {CONTACT_INFO.address.split(',').splice(-1)[0].trim()}</span>
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className="lg:flex-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6 lg:p-8 shadow-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-bvm-navy border border-white/10 rounded-lg text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-bvm-navy border border-white/10 rounded-lg text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                    placeholder="Your company"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-bvm-navy border border-white/10 rounded-lg text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-bvm-navy border border-white/10 rounded-lg text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                    placeholder="+91..."
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-white text-sm font-medium mb-2">
                  Product Interest
                </label>
                <select
                  name="productInterest"
                  value={formData.productInterest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bvm-navy border border-white/10 rounded-lg text-white focus:outline-none focus:border-bvm-blue transition-colors appearance-none"
                >
                  <option value="" className="bg-bvm-navy">Select a product</option>
                  <option value="blow-moulding" className="bg-bvm-navy">Blow Moulding Machines</option>
                  <option value="bfs-moulds" className="bg-bvm-navy">BFS Moulds</option>
                  <option value="pet-moulds" className="bg-bvm-navy">PET Bottle Moulds</option>
                  <option value="ampoule" className="bg-bvm-navy">Ampoule Filling Machines</option>
                  <option value="hydraulic" className="bg-bvm-navy">Hydraulic Cylinders</option>
                  <option value="filtration" className="bg-bvm-navy">SS Filter Housings</option>
                  <option value="other" className="bg-bvm-navy">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-white text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-bvm-navy border border-white/10 rounded-lg text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors resize-none"
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
