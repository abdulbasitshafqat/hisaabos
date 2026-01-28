import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { Star, Quote, Play } from 'lucide-react';

export function TestimonialsPage() {
    const navigate = useNavigate();

    const testimonials = [
        {
            name: "Ahmed Khan",
            role: "CEO",
            company: "Gulberg Textiles",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
            quote: "HisaabOS saved me Rs. 50,000/month on accounting fees. The automatic FBR report generation is a lifesaver. I used to spend days on manual entry, now it's all automated.",
            rating: 5
        },
        {
            name: "Fatima Ali",
            role: "Founder",
            company: "Luxe Fashion Online",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
            quote: "The courier integration is genius. I book 100+ orders in 5 minutes with Trax directly from the dashboard. It has completely streamlined our dispatch process.",
            rating: 5
        },
        {
            name: "Usman Sheikh",
            role: "Director",
            company: "Tech Solutions Pvt Ltd",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Usman",
            quote: "Project costing helped us identify which clients were actually profitable. Before HisaabOS, we were losing money on big projects without realizing it due to hidden overheads.",
            rating: 5
        },
        {
            name: "Sana Mir",
            role: "Operations Manager",
            company: "Organic Mart",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sana",
            quote: "Inventory management for perishable goods was a nightmare. The expiration tracking and low stock alerts have reduced our wastage by 40%.",
            rating: 4
        },
        {
            name: "Bilal Waris",
            role: "Owner",
            company: "Waris Electronics",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bilal",
            quote: "I love the mobile app. I can check today's sales and approve purchase orders while I'm travelling. It gives me complete peace of mind.",
            rating: 5
        },
        {
            name: "Zainab Malik",
            role: "Finance Lead",
            company: "Creative Agency X",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab",
            quote: "The user interface is so beautiful and easy to understand. My staff learned how to use it in one day without any formal training.",
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-emerald-500/30">
            <PublicNavbar />

            {/* Header */}
            <div className="pt-32 pb-16 px-6 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm mb-6">
                    <Star className="w-4 h-4 fill-yellow-400" />
                    <span>Trusted by 500+ Businesses</span>
                </div>
                <h1 className="text-5xl font-bold text-white mb-6">
                    Don't just take our word for it
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    Hear from Pakistani business owners who have transformed their operations with HisaabOS.
                </p>
            </div>

            {/* Video Testimonial Placeholder */}
            <section className="max-w-7xl mx-auto px-6 mb-20">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-video md:aspect-[21/9] group cursor-pointer">
                    <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center group-hover:bg-slate-900/40 transition-colors">
                        <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center pl-1 shadow-lg shadow-emerald-900/50 group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-slate-950/90 to-transparent">
                        <h3 className="text-2xl font-bold text-white mb-2">Success Story: How RetailKings grew 300% in one year</h3>
                        <p className="text-slate-300">Watch the full interview with Mr. Abdullah, CEO of RetailKings</p>
                    </div>
                    {/* Placeholder Background Pattern */}
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 opacity-50"></div>
                </div>
            </section>

            {/* Testimonials Grid */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <Card key={i} className="bg-slate-900 border-slate-800 hover:border-emerald-600/50 transition-colors duration-300">
                            <CardContent className="pt-8 px-6 pb-8">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star
                                            key={idx}
                                            className={`w-4 h-4 ${idx < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-700'}`}
                                        />
                                    ))}
                                </div>

                                <Quote className="w-8 h-8 text-emerald-600/20 mb-4 rotate-180" />

                                <p className="text-slate-300 text-lg mb-6 leading-relaxed min-h-[120px]">
                                    "{t.quote}"
                                </p>

                                <div className="flex items-center gap-4 pt-6 border-t border-slate-800">
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        className="w-12 h-12 rounded-full bg-slate-800"
                                    />
                                    <div>
                                        <h4 className="text-white font-bold">{t.name}</h4>
                                        <p className="text-slate-400 text-sm">{t.role}, {t.company}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <section className="py-20 bg-emerald-900/10 border-y border-emerald-900/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">500+</div>
                            <div className="text-emerald-400">Happy Clients</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">Rs. 1B+</div>
                            <div className="text-emerald-400">Invoices Processed</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">99.9%</div>
                            <div className="text-emerald-400">Uptime</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-white mb-2">24/7</div>
                            <div className="text-emerald-400">Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-24 text-center px-6">
                <h2 className="text-3xl font-bold text-white mb-8">Join the growing family of HisaabOS</h2>
                <Button onClick={() => navigate('/signup')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-6 text-xl rounded-lg">
                    Start Your Success Story
                </Button>
            </section>
        </div>
    );
}
