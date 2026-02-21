const clientLogos = [
    '/clients/Picture2.png',
    '/clients/Picture3.png',
    '/clients/Picture4.png',
    '/clients/Picture5.png',
    '/clients/Picture6.png',
    '/clients/Picture7.png',
    '/clients/Picture8.png',
    '/clients/Picture9.png',
    '/clients/Picture10.png',
    '/clients/Picture11.png',
    '/clients/Picture12.png',
    '/clients/Picture13.png',
    '/clients/Picture14.png',
    '/clients/Picture15.png',
];

const ClientStripSection = () => {
    return (
        <section className="bg-bvm-navy overflow-hidden py-8 sm:py-12 border-y border-white/5 z-20 relative">
            <div className="w-full flex space-x-12 sm:space-x-24 animate-marquee group">
                {[...clientLogos, ...clientLogos].map((logo, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 flex items-center justify-center h-12 sm:h-16 lg:h-20 transition-all duration-500 cursor-pointer"
                    >
                        <img
                            src={logo}
                            alt={`BVM Client Partner ${index + 1}`}
                            className="h-full w-auto object-contain max-w-[200px]"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ClientStripSection;
