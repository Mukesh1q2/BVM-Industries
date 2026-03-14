import React from 'react';

export default function FloatingWhatsApp() {
    // Use the verified business number
    const whatsappNumber = "917018231499";

    // Pre-fill message so it's easy for the customer to just click send
    const message = encodeURIComponent("Hello! I'm interested in BVM Industries' BFS and FFS machines. Could you provide some more information?");

    return (
        <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 lg:bottom-10 right-6 lg:right-10 z-[9999] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300 group"
            aria-label="Contact us on WhatsApp"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
            >
                <path d="M12.001 2.001A10 10 0 0 0 2 12c0 1.956.551 3.784 1.493 5.341L2 22l4.802-1.423A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10s-4.477-10-10-10Zm.002 18.232c-1.558 0-3.04-.396-4.341-1.109l-3.078.913.928-2.984A8.252 8.252 0 0 1 3.75 12c0-4.556 3.705-8.261 8.261-8.261 4.557 0 8.26 3.705 8.26 8.261 0 4.557-3.703 8.261-8.26 8.261Zm4.621-5.91c-.253-.127-1.498-.74-1.73-.824-.233-.085-.4-.127-.568.127-.168.253-.654.824-.801.993-.148.169-.295.19-.548.063-.254-.127-1.07-.395-2.039-1.259-.753-.672-1.26-1.503-1.408-1.757-.148-.254-.015-.39.111-.517.114-.114.254-.296.38-.444.127-.148.169-.253.253-.423.085-.169.043-.316-.02-.444-.064-.127-.569-1.373-.78-1.88-.205-.494-.413-.427-.568-.435-.148-.007-.317-.008-.485-.008-.169 0-.443.063-.675.316-.233.254-.887.866-.887 2.112 0 1.246.908 2.45 1.035 2.62.127.169 1.786 2.766 4.364 3.864.613.261 1.092.417 1.465.534.615.196 1.175.168 1.616.102.493-.074 1.498-.612 1.709-1.204.212-.592.212-1.098.148-1.204-.064-.106-.233-.169-.486-.296Z" />
            </svg>
            {/* Tooltip on hover */}
            <span className="absolute right-16 px-3 py-1.5 bg-bvm-navy text-white text-sm font-semibold rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-xl border border-white/10 hidden md:block">
                Chat on WhatsApp
            </span>
        </a>
    );
}
