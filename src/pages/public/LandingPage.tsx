import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, FileText, Building2, Briefcase, Users, ArrowRight, Star } from 'lucide-react';

import { PublicNavbar } from '@/components/layout/PublicNavbar';

export function LandingPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleGetStarted = () => {
        navigate('/signup');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
            {/* Navigation */}
            <PublicNavbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block px-4 py-2 bg-emerald-600/10 border border-emerald-600/20 rounded-full text-emerald-400 text-sm mb-6">
                                🇵🇰 Built for Pakistani Businesses
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                Run your Pakistani Business on <span className="text-emerald-400">Autopilot</span>
                            </h1>
                            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                                From Manufacturing to E-commerce—HisaabOS is the financial brain you were missing.
                                Automate invoicing, track expenses, and stay FBR-compliant with zero hassle.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="px-6 py-4 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-600"
                                />
                                <Button onClick={handleGetStarted} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                            <p className="text-sm text-slate-400">✓ No credit card required • ✓ 14-day free trial • ✓ Cancel anytime</p>
                        </div>

                        {/* Dashboard Mockup */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-emerald-600/20 blur-3xl rounded-full"></div>
                            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700 transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                                <div className="aspect-video bg-slate-950 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-8 bg-emerald-600/20 rounded"></div>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="h-16 bg-slate-800 rounded"></div>
                                            <div className="h-16 bg-slate-800 rounded"></div>
                                            <div className="h-16 bg-slate-800 rounded"></div>
                                        </div>
                                        <div className="h-32 bg-slate-800 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section id="features" className="py-20 px-6 bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Why Pakistani Businesses Choose HisaabOS</h2>
                        <p className="text-xl text-slate-300">Everything you need to run a profitable business in Pakistan</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-lg hover:border-emerald-600 transition-colors group">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-lg bg-emerald-600/10 flex items-center justify-center mb-4 group-hover:bg-emerald-600/20 transition-colors">
                                    <FileText className="w-7 h-7 text-emerald-400" />
                                </div>
                                <CardTitle className="text-white text-xl">One-Click FBR Returns</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-300">
                                    Generate Annex-C and Sales Tax reports instantly. Stay compliant without hiring an accountant.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-lg hover:border-emerald-600 transition-colors group">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-lg bg-blue-600/10 flex items-center justify-center mb-4 group-hover:bg-blue-600/20 transition-colors">
                                    <Building2 className="w-7 h-7 text-blue-400" />
                                </div>
                                <CardTitle className="text-white text-xl">Bank Sync</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-300">
                                    Reconcile Meezan, HBL, and UBL statements in seconds. Never lose track of cash flow again.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-lg hover:border-emerald-600 transition-colors group">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-lg bg-purple-600/10 flex items-center justify-center mb-4 group-hover:bg-purple-600/20 transition-colors">
                                    <Briefcase className="w-7 h-7 text-purple-400" />
                                </div>
                                <CardTitle className="text-white text-xl">Project Costing</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-300">
                                    Know exactly how much profit you made on that one Client Project. Track every rupee, every expense.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-lg hover:border-emerald-600 transition-colors group">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-lg bg-orange-600/10 flex items-center justify-center mb-4 group-hover:bg-orange-600/20 transition-colors">
                                    <Users className="w-7 h-7 text-orange-400" />
                                </div>
                                <CardTitle className="text-white text-xl">Smart Khata (CRM)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-300">
                                    Digital ledgers for every customer and vendor. Send WhatsApp payment reminders with one click.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-lg hover:border-emerald-600 transition-colors group">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-lg bg-red-600/10 flex items-center justify-center mb-4 group-hover:bg-red-600/20 transition-colors">
                                    <CheckCircle className="w-7 h-7 text-red-400" />
                                </div>
                                <CardTitle className="text-white text-xl">Courier Integration</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-300">
                                    Book Trax, TCS, Leopards in bulk. Download load sheets. Track every shipment from one dashboard.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-lg hover:border-emerald-600 transition-colors group">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-lg bg-emerald-600/10 flex items-center justify-center mb-4 group-hover:bg-emerald-600/20 transition-colors">
                                    <Star className="w-7 h-7 text-emerald-400" />
                                </div>
                                <CardTitle className="text-white text-xl">True Profit Calculator</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-300">
                                    Includes COGS, shipping, ad spend, and every hidden cost. Know your real profit margin.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-2 bg-emerald-600/10 border border-emerald-600/20 rounded-full text-emerald-400 text-sm mb-4">
                            ⭐⭐⭐⭐⭐ Rated 4.9/5
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-4">Trusted by 500+ Businesses</h2>
                        <p className="text-xl text-slate-300">in Lahore, Karachi, and Islamabad</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Ahmed Khan', business: 'Gulberg Textiles', quote: 'HisaabOS saved me Rs. 50,000/month on accounting fees. The FBR reports are a lifesaver!' },
                            { name: 'Fatima Ali', business: 'Luxe Fashion Online', quote: 'Courier integration is genius. I book 100 orders in 5 minutes with Trax. Game changer.' },
                            { name: 'Usman Sheikh', business: 'Tech Solutions Pvt Ltd', quote: 'Project costing helped us identify which clients were actually profitable. Eye-opening!' }
                        ].map((testimonial, i) => (
                            <Card key={i} className="bg-slate-800/50 border-slate-700 backdrop-blur-lg">
                                <CardContent className="pt-6">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                                        ))}
                                    </div>
                                    <p className="text-slate-300 mb-4 italic">"{testimonial.quote}"</p>
                                    <div>
                                        <p className="text-white font-semibold">{testimonial.name}</p>
                                        <p className="text-slate-400 text-sm">{testimonial.business}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 px-6 bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-xl text-slate-300">Choose the plan that fits your business stage</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: 'The Freelancer',
                                price: 2999,
                                description: 'For solopreneurs and small retailers',
                                features: ['Digital Khata (100 customers)', 'One-Click FBR Annex-C', 'Basic Invoicing', 'Bank Reconciliation (1 Account)'],
                                cta: 'Start Free Trial',
                                popular: false,
                                gradient: 'from-slate-800 to-slate-900'
                            },
                            {
                                name: 'The Growth',
                                price: 7499,
                                description: 'For scaling E-commerce brands',
                                features: ['Everything in Freelancer', 'Unlimited Invoicing', 'Full Courier Integration', 'WhatsApp Reminders', 'True Profit Calculator'],
                                cta: 'Start Free Trial',
                                popular: true,
                                gradient: 'from-emerald-600 to-emerald-700'
                            },
                            {
                                name: 'The Enterprise',
                                price: 19999,
                                description: 'For manufacturers & agencies',
                                features: ['Everything in Growth', 'Full Project Costing', 'Multi-user access', 'Priority FBR Support', 'API Access'],
                                cta: 'Contact Sales',
                                popular: false,
                                gradient: 'from-purple-600 to-purple-700'
                            }
                        ].map((plan, index) => (
                            <Card
                                key={index}
                                className={`relative backdrop-blur-lg border-2 ${plan.popular
                                    ? 'border-emerald-600 shadow-2xl shadow-emerald-600/20 scale-105'
                                    : 'border-slate-700'
                                    } transition-all hover:scale-105 bg-gradient-to-br ${plan.gradient} bg-opacity-50`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                        <div className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                            ⭐ MOST POPULAR
                                        </div>
                                    </div>
                                )}

                                <CardHeader className="text-center pb-8">
                                    <CardTitle className="text-3xl font-bold text-white mb-2">{plan.name}</CardTitle>
                                    <CardDescription className="text-slate-300">{plan.description}</CardDescription>
                                    <div className="mt-6">
                                        <div className="flex items-baseline justify-center gap-2">
                                            <span className="text-5xl font-bold text-white">
                                                Rs. {plan.price.toLocaleString()}
                                            </span>
                                            <span className="text-slate-400">/mo</span>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                                <span className="text-slate-200 text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Button
                                        onClick={() => navigate('/signup')}
                                        className={`w-full py-6 text-lg ${plan.popular
                                            ? 'bg-white text-emerald-600 hover:bg-slate-100'
                                            : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-600'
                                            }`}
                                    >
                                        {plan.cta}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <a href="#" className="text-emerald-400 hover:text-emerald-300 underline text-sm">
                            Need a custom enterprise plan? Contact Sales to discuss.
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: 'Is my financial data secure?',
                                a: 'Yes. We use bank-grade 256-bit encryption and store data on secure cloud servers with daily backups. Your privacy is our top priority.'
                            },
                            {
                                q: 'How does FBR compliance work?',
                                a: 'HisaabOS automatically generates Annex-C reports based on your invoices and expenses. You can download the report and upload it directly to the FBR portal.'
                            },
                            {
                                q: 'Which couriers do you support?',
                                a: 'We natively integrate with Trax, TCS, and Leopards Courier. You can bulk book orders and print shipping labels directly from the dashboard.'
                            },
                            {
                                q: 'Can I upgrade my plan later?',
                                a: 'Absolutely. You can start with the Freelancer plan and upgrade to Growth or Enterprise as your business expands. Changes apply immediately.'
                            }
                        ].map((faq, i) => (
                            <Card key={i} className="bg-slate-800/50 border-slate-700 backdrop-blur-lg">
                                <CardContent className="pt-6">
                                    <h3 className="text-white font-semibold mb-2 text-lg">{faq.q}</h3>
                                    <p className="text-slate-300 leading-relaxed">{faq.a}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-emerald-600 to-emerald-700">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Automate Your Business?
                    </h2>
                    <p className="text-xl text-emerald-100 mb-8">
                        Join 500+ Pakistani businesses who trust HisaabOS
                    </p>
                    <Button onClick={handleGetStarted} className="bg-white text-emerald-600 hover:bg-slate-100 px-8 py-6 text-lg">
                        Start Your Free Trial
                        <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-slate-950 border-t border-slate-800">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white">
                                    H
                                </div>
                                <span className="text-xl font-bold text-white">HisaabOS</span>
                            </div>
                            <p className="text-slate-400 text-sm">
                                The Financial Operating System for Pakistani Businesses
                            </p>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-3">Product</h3>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><a href="#features" className="hover:text-white">Features</a></li>
                                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                                <li><a href="#" className="hover:text-white">Integrations</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-3">Company</h3>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-white">About</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                                <li><a href="#" className="hover:text-white">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold mb-3">Support</h3>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-white">Help Center</a></li>
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-400 text-sm">
                        © 2024 HisaabOS. Made with ❤️ in Pakistan 🇵🇰
                    </div>
                </div>
            </footer>
        </div>
    );
}
