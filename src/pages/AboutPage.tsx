import { Award, Users, Factory, Globe, CheckCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const stats = [
    { value: '8+', label: 'Years of Excellence', icon: Award },
    { value: '26-50', label: 'Team Members', icon: Users },
    { value: '5-25 Cr', label: 'Annual Turnover', icon: TrendingUp },
    { value: 'Pan India', label: 'Service Coverage', icon: Globe },
  ];

  const capabilities = [
    'Design and manufacturing of blow moulding machines',
    'BFS (Blow Fill Seal) moulds and tooling',
    'PET bottle moulds and preforms',
    'Ampoule filling machinery',
    'Hydraulic cylinders and manifold blocks',
    'Stainless steel filter housings',
    'Custom precision components',
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'Every product undergoes rigorous testing to ensure it meets industry standards and customer expectations.',
    },
    {
      title: 'Customer Focus',
      description: 'We work closely with our clients to understand their needs and deliver tailored solutions.',
    },
    {
      title: 'Innovation',
      description: 'Continuous improvement and adoption of latest technologies to enhance our product offerings.',
    },
    {
      title: 'Integrity',
      description: 'Transparent business practices and ethical conduct in all our dealings.',
    },
  ];

  return (
    <div className="page-container min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 px-4 sm:px-8 lg:px-[8vw] bg-bvm-navy-light">
        <div className="max-w-4xl">
          <div className="eyebrow mb-4">ABOUT US</div>
          <h1 className="headline-lg text-white mb-6">
            BVM Industries
          </h1>
          <p className="body-text text-lg max-w-2xl">
            A trusted manufacturer of precision-engineered machinery and moulds for aseptic packaging,
            pharmaceutical, healthcare, and industrial applications. Based in Baddi, Himachal Pradesh,
            we serve clients across India with reliable, cost-effective solutions.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 lg:py-16 px-4 sm:px-8 lg:px-[8vw] border-y border-white/10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-bvm-blue/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-bvm-blue" />
                </div>
                <div className="text-3xl lg:text-4xl font-display font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-bvm-gray text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 lg:py-24 px-4 sm:px-8 lg:px-[8vw]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="headline-md text-white mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-bvm-gray">
              <p>
                BVM Industries was established with a vision to serve the pharmaceutical
                and industrial sectors with high-quality machinery and precision components. Starting
                from a small facility in Baddi, Himachal Pradesh, we have grown into a trusted
                manufacturer serving clients across India.
              </p>
              <p>
                Our journey began with a focus on blow moulding machines and has expanded to include
                BFS moulds, PET bottle moulds, hydraulic systems, and filtration equipment. Today,
                we are recognized for our commitment to quality, timely delivery, and customer satisfaction.
              </p>
              <p>
                Under the proprietorship of Rahul Kumar Singh, we continue to invest in technology
                and talent to meet the evolving needs of our customers in the pharma, healthcare,
                and industrial sectors.
              </p>
            </div>
          </div>

          <div className="bg-bvm-navy-light rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Factory className="w-6 h-6 text-bvm-blue" />
              <h3 className="text-white font-semibold text-lg">Business Information</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-bvm-gray">Nature of Business</span>
                <span className="text-white font-medium">Manufacturer</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-bvm-gray">Proprietor</span>
                <span className="text-white font-medium">Rahul Kumar Singh</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-bvm-gray">Total Employees</span>
                <span className="text-white font-medium">26 - 50 People</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-bvm-gray">Annual Turnover</span>
                <span className="text-white font-medium">Rs. 5 - 25 Crore</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-bvm-gray">GST Number</span>
                <span className="text-white font-medium">02GNLPS7342F1ZS</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-bvm-gray">Location</span>
                <span className="text-white font-medium text-right">Baddi, Himachal Pradesh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-8 lg:px-[8vw] bg-bvm-navy-light">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="headline-md text-white mb-4">
            Our Capabilities
          </h2>
          <p className="text-bvm-gray">
            We offer a comprehensive range of products and services designed to meet
            the diverse needs of our customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <CheckCircle className="w-5 h-5 text-bvm-blue mt-0.5 flex-shrink-0" />
              <span className="text-white">{capability}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-8 lg:px-[8vw]">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="headline-md text-white mb-4">
            Our Values
          </h2>
          <p className="text-bvm-gray">
            The principles that guide our business and define our culture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-bvm-blue/30 transition-colors"
            >
              <h3 className="text-white font-semibold text-lg mb-3">{value.title}</h3>
              <p className="text-bvm-gray text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 px-4 sm:px-8 lg:px-[8vw] bg-bvm-blue/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="headline-md text-white mb-4">
            Partner With Us
          </h2>
          <p className="text-bvm-gray mb-8">
            Looking for reliable manufacturing partners? Get in touch with us to discuss
            your requirements and explore how we can help your business grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Contact Us
            </Link>
            <Link to="/products" className="btn-secondary">
              View Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
