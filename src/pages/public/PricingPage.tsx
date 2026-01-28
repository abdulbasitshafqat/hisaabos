import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export function PricingPage() {
    const navigate = useNavigate();

    const plans = [
        {
            name: 'Dukaan',
            price: 0,
            period: 'Forever Free',
            description: 'Perfect for small shops and startups',
            features: [
                '1 User',
                'Manual Khata (Ledger)',
                'Basic POS & Invoicing',
                'Up to 100 Products',
                'Mobile App Access',
                'Email Support'
            ],
            cta: 'Start Free',
            popular: false,
            gradient: 'from-slate-800 to-slate-900'
        },
        {
            name: 'Karobar',
            price: 2500,
            period: 'per month',
            description: 'For growing businesses ready to scale',
            features: [
                'Unlimited Users',
                'Unlimited Products',
                'Courier Integration (Trax/TCS/Leopards)',
                'WhatsApp Invoicing',
                'Shopify & WooCommerce Sync',
                'RTO Shield & Blacklist',
                'Ad Spend Tracking',
                'Priority Support'
            ],
            cta: 'Start 14-Day Trial',
            popular: true,
            gradient: 'from-emerald-600 to-emerald-700'
        },
        {
            name: 'Empire',
            price: 5000,
            period: 'per month',
            description: 'Enterprise-grade financial control',
            features: [
                'Everything in Karobar, plus:',
                'Full Accounting Module',
                'Bank Reconciliation (Meezan/HBL/UBL)',
                'FBR Tax Compliance (Annex-C)',
                'Sales Tax (GST) Auto-Calculation',
                'Manufacturing BOM & Assembly',
                'Project Accounting & Costing',
                'Multi-Branch Support',
                'Dedicated Account Manager'
            ],
            cta: 'Contact Sales',
            popular: false,
            gradient: 'from-purple-600 to-purple-700'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-xl">
                            H
                        </div>
                        <span className="text-2xl font-bold text-white">HisaabOS</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" onClick={() => navigate('/login')} className="border-slate-700 text-white hover:bg-slate-800">
                            Login
                        </Button>
                        <Button onClick={() => navigate('/signup')} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            Get Started
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 pb-12 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-block px-4 py-2 bg-emerald-600/10 border border-emerald-600/20 rounded-full text-emerald-400 text-sm mb-6">
                        💰 Transparent Pricing, No Hidden Fees
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        From chai ka paisa to corporate empires—we've got a plan that fits your business perfectly.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
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
                                            ⭐ Most Popular
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
                                        </div>
                                        <p className="text-slate-300 text-sm mt-2">{plan.period}</p>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                                <span className="text-slate-200">{feature}</span>
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

                                    {plan.price === 0 && (
                                        <p className="text-center text-xs text-slate-400">
                                            No credit card required
                                        </p>
                                    )}
                                    {plan.price > 0 && plan.price < 5000 && (
                                        <p className="text-center text-xs text-slate-400">
                                            14-day free trial • Cancel anytime
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6 bg-slate-900/50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: 'Can I switch plans later?',
                                a: 'Absolutely! You can upgrade or downgrade your plan anytime from your dashboard. Changes take effect immediately.'
                            },
                            {
                                q: 'What payment methods do you accept?',
                                a: 'We accept all major Pakistani cards (Debit/Credit), JazzCash, Easypaisa, and bank transfers.'
                            },
                            {
                                q: 'Is my data secure?',
                                a: 'Yes! We use bank-grade encryption and daily backups. Your data is stored on Pakistani servers with full compliance.'
                            },
                            {
                                q: 'Do you offer custom enterprise plans?',
                                a: 'Yes! For businesses with 10+ users or special requirements, contact us for a custom quote.'
                            }
                        ].map((faq, i) => (
                            <Card key={i} className="bg-slate-800/50 border-slate-700 backdrop-blur-lg">
                                <CardContent className="pt-6">
                                    <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                                    <p className="text-slate-300">{faq.a}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-slate-950 border-t border-slate-800">
                <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
                    © 2024 HisaabOS. Made with ❤️ in Pakistan 🇵🇰
                </div>
            </footer>
        </div>
    );
}
