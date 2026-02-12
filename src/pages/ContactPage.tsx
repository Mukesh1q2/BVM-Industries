import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, Clock, Globe, User, Building } from 'lucide-react';
import { toast } from 'sonner';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    productInterest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        access_key: 'af13ac37-e44c-49ce-8fbd-ea80932a48a8',
        subject: `New Enquiry from ${formData.name} — BVM Website`,
        from_name: formData.name,
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        product_interest: formData.productInterest,
        message: formData.message,
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Thank you for your enquiry! We will get back to you within 24 hours.');
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          productInterest: '',
          message: '',
        });
      } else {
        toast.error('Something went wrong. Please email us directly at sales@bvmindustries.com');
      }
    } catch {
      toast.error('Network error. Please email us directly at sales@bvmindustries.com');
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

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91-79493-03163'],
      href: 'tel:+917949303163',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['sales@bvmindustries.com'],
      href: 'mailto:sales@bvmindustries.com',
    },
    {
      icon: MapPin,
      title: 'Address',
      details: [
        'Ground Floor, Khasra No. 929/565/280',
        'Sai Road, Near Affy Parenterals Gularwala',
        'Baddi, Solan - 173205',
        'Himachal Pradesh, India'
      ],
      href: '#',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Saturday: 9:00 AM - 6:00 PM'],
      href: '#',
    },
  ];

  return (
    <div className="page-container min-h-screen">
      {/* Header Section */}
      <section className="relative py-20 lg:py-28 px-4 sm:px-8 lg:px-[8vw] bg-bvm-navy-light">
        <div className="max-w-4xl">
          <div className="eyebrow mb-4">GET IN TOUCH</div>
          <h1 className="headline-lg text-white mb-6">
            Contact Us
          </h1>
          <p className="body-text text-lg max-w-2xl">
            Have a question or need a quote? Reach out to us and our team will be happy
            to assist you with your requirements.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 lg:py-16 px-4 sm:px-8 lg:px-[8vw] border-y border-white/10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <a
                key={index}
                href={info.href}
                className="group p-6 bg-white/5 rounded-xl border border-white/10 hover:border-bvm-blue/50 transition-all"
              >
                <div className="w-12 h-12 bg-bvm-blue/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-bvm-blue/20 transition-colors">
                  <Icon className="w-6 h-6 text-bvm-blue" />
                </div>
                <h3 className="text-white font-semibold mb-2">{info.title}</h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-bvm-gray text-sm">{detail}</p>
                ))}
              </a>
            );
          })}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 px-4 sm:px-8 lg:px-[8vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-6">
              Send Us an Enquiry
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors"
                    placeholder="+91..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  <Globe className="w-4 h-4 inline mr-2" />
                  Product Interest
                </label>
                <select
                  name="productInterest"
                  value={formData.productInterest}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-bvm-blue transition-colors"
                >
                  <option value="" className="bg-bvm-navy">Select a product</option>
                  <option value="blow-moulding" className="bg-bvm-navy">Automatic Blow Moulding Machine</option>
                  <option value="pet-mould" className="bg-bvm-navy">100 ml PET Bottle Mould</option>
                  <option value="bfs-machine" className="bg-bvm-navy">50 ml BFS Mould Machine</option>
                  <option value="ss-filter" className="bg-bvm-navy">SS Filter Housing</option>
                  <option value="hydraulic-cylinder" className="bg-bvm-navy">Hydraulic Cylinders</option>
                  <option value="extrusion-machine" className="bg-bvm-navy">Extrusion Blow Moulding Machine</option>
                  <option value="manifold" className="bg-bvm-navy">Hydraulic Manifold Block</option>
                  <option value="ampoule" className="bg-bvm-navy">Ampoule Filling Machine</option>
                  <option value="respules" className="bg-bvm-navy">Respules Mould</option>
                  <option value="compression" className="bg-bvm-navy">Compression Block</option>
                  <option value="injection-mould" className="bg-bvm-navy">Injection Mould Die</option>
                  <option value="power-pack" className="bg-bvm-navy">Hydraulic Power Pack</option>
                  <option value="other" className="bg-bvm-navy">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-bvm-gray focus:outline-none focus:border-bvm-blue transition-colors resize-none"
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

          {/* Map Section */}
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-6">
              Our Location
            </h2>

            <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3426.7265075426!2d76.8103!3d30.9578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ffb1e0c0b0b0b%3A0x0!2zMzDCsDU3JzI4LjEiTiA3NsKwNDgnMzcuMSJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '300px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BVM Industries Location"
                />
              </div>

              <div className="p-6">
                <h3 className="text-white font-semibold mb-3">BVM Industries</h3>
                <div className="space-y-2 text-bvm-gray text-sm">
                  <p>Ground Floor, Khasra No. 929/565/280</p>
                  <p>Sai Road, Near Affy Parenterals Gularwala</p>
                  <p>Baddi, Solan - 173205</p>
                  <p>Himachal Pradesh, India</p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-bvm-blue" />
                    <span className="text-bvm-gray">GST: </span>
                    <span className="text-white">02GNLPS7342F1ZS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
