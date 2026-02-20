import { Award, Globe2, Clock } from 'lucide-react';

const TrustBar = () => {
    return (
        <section className="bg-white/5 border-y border-white/5 backdrop-blur-sm py-8 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center divide-y md:divide-y-0 md:divide-x divide-white/10">

                    {/* Stat 1 */}
                    <div className="p-4 group">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="p-3 rounded-full bg-bvm-blue/10 text-bvm-blue group-hover:scale-110 transition-transform duration-300">
                                <Globe2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-display font-bold text-white">12+</h3>
                        </div>
                        <p className="text-bvm-gray text-sm uppercase tracking-wider font-medium">Global Installations</p>
                    </div>

                    {/* Stat 2 */}
                    <div className="p-4 group">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="p-3 rounded-full bg-bvm-blue/10 text-bvm-blue group-hover:scale-110 transition-transform duration-300">
                                <Award className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-display font-bold text-white">ISO & CGMP</h3>
                        </div>
                        <p className="text-bvm-gray text-sm uppercase tracking-wider font-medium">Certified Excellence</p>
                    </div>

                    {/* Stat 3 */}
                    <div className="p-4 group">
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <div className="p-3 rounded-full bg-bvm-blue/10 text-bvm-blue group-hover:scale-110 transition-transform duration-300">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-3xl font-display font-bold text-white">24/7</h3>
                        </div>
                        <p className="text-bvm-gray text-sm uppercase tracking-wider font-medium">Technical Support</p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default TrustBar;
