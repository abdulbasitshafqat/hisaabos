import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Heart, Trophy } from 'lucide-react';

export function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
            <PublicNavbar />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Empowering <span className="text-emerald-400">Pakistani Business</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        We are on a mission to digitize the backbone of Pakistan's economy—the small and medium enterprises (SMEs).
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16 px-6 bg-slate-900/50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-8">Our Story</h2>
                    <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                        <p>
                            HisaabOS was born in a small office in Lahore in 2023. We noticed that Pakistani business owners were stuck between expensive foreign software like QuickBooks (which didn't understand our tax laws) and traditional paper "Khata" registers (which were prone to errors).
                        </p>
                        <p>
                            We asked a simple question: <span className="text-emerald-400 font-semibold">"Why isn't there a financial operating system built specifically for Pakistan?"</span>
                        </p>
                        <p>
                            Today, HisaabOS serves over 500 businesses across Karachi, Lahore, Islamabad, and Faisalabad. We handle everything from FBR Annex-C compliance to seamless courier integration with Trax and TCS.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: Users, title: 'Customer First', desc: 'We build what you need, not what we think is cool.' },
                            { icon: Target, title: 'Simplicity', desc: 'Accounting shouldn\'t be scary. We make it simple.' },
                            { icon: Heart, title: 'Integrity', desc: 'Your data is sacred. We protect it like our own.' },
                            { icon: Trophy, title: 'Excellence', desc: 'We aim for world-class quality, made in Pakistan.' }
                        ].map((val, i) => (
                            <Card key={i} className="bg-slate-800/50 border-slate-700 backdrop-blur-lg">
                                <CardContent className="pt-6 text-center">
                                    <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center mx-auto mb-4">
                                        <val.icon className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-2">{val.title}</h3>
                                    <p className="text-slate-400 text-sm">{val.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 px-6 bg-emerald-900/20 border-y border-emerald-900/30">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-emerald-400 mb-2">500+</div>
                        <div className="text-slate-300">Businesses Onboarded</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-emerald-400 mb-2">Rs. 1B+</div>
                        <div className="text-slate-300">Transactions Processed</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-emerald-400 mb-2">24/7</div>
                        <div className="text-slate-300">Local Support</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
