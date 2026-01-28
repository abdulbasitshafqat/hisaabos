import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { FileText, Building2, Briefcase, Users, ArrowRight, ShieldCheck, BarChart3, Globe, Smartphone } from 'lucide-react';

export function FeaturesPage() {
    const navigate = useNavigate();

    const features = [
        {
            id: 'accounting',
            icon: <Building2 className="w-12 h-12 text-blue-400" />,
            title: "Double-Entry Accounting",
            description: "A complete professional accounting suite that's easy to use.",
            details: [
                "Automated journal entries",
                "Balance Sheet & Profit/Loss statements",
                "Bank reconciliation with major Pakistani banks",
                "Multi-currency support for importers",
                "Audit logs and history tracking"
            ],
            color: "bg-blue-600/10",
            borderColor: "hover:border-blue-600"
        },
        {
            id: 'tax',
            icon: <FileText className="w-12 h-12 text-emerald-400" />,
            title: "FBR & Tax Compliance",
            description: "Stay compliant with FBR without the headache.",
            details: [
                "Auto-generated Annex-C reports",
                "Sales Tax (GST) automated calculation",
                "Withholding tax tracking",
                "One-click tax return export",
                "Updated with latest fiscal year policies"
            ],
            color: "bg-emerald-600/10",
            borderColor: "hover:border-emerald-600"
        },
        {
            id: 'inventory',
            icon: <Briefcase className="w-12 h-12 text-purple-400" />,
            title: "Smart Inventory Management",
            description: "Track every item, every warehouse, every movement.",
            details: [
                "Real-time stock tracking",
                "Low stock alerts & auto-reordering",
                "Barcode scanning support",
                "Multi-warehouse management",
                "Product bundling and kitting"
            ],
            color: "bg-purple-600/10",
            borderColor: "hover:border-purple-600"
        },
        {
            id: 'crm',
            icon: <Users className="w-12 h-12 text-orange-400" />,
            title: "CRM & Smart Khata",
            description: "Manage your relationships with customers and vendors.",
            details: [
                "Digital customer ledgers",
                "WhatsApp payment reminders",
                "Vendor management & credit tracking",
                "Customer purchase history",
                "Credit limit management"
            ],
            color: "bg-orange-600/10",
            borderColor: "hover:border-orange-600"
        },
        {
            id: 'analytics',
            icon: <BarChart3 className="w-12 h-12 text-pink-400" />,
            title: "Advanced Analytics",
            description: "Make data-driven decisions with powerful insights.",
            details: [
                "Real-time business dashboard",
                "Cash flow forecasting",
                "Expense categorization & analysis",
                "Sales performance reports",
                "Profit margin analysis by product/service"
            ],
            color: "bg-pink-600/10",
            borderColor: "hover:border-pink-600"
        },
        {
            id: 'courier',
            icon: <Globe className="w-12 h-12 text-cyan-400" />,
            title: "Courier Integration",
            description: "Automate your shipping and logistics.",
            details: [
                "Integration with Trax, TCS, Leopards",
                "Bulk booking & airway bill generation",
                "Auto-tracking updates",
                "Cash on Delivery (COD) management",
                "Return management (RTO)"
            ],
            color: "bg-cyan-600/10",
            borderColor: "hover:border-cyan-600"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 font-sans selection:bg-emerald-500/30">
            <PublicNavbar />

            {/* Header */}
            <div className="pt-32 pb-16 px-6 text-center">
                <h1 className="text-5xl font-bold text-white mb-6">
                    Everything you need to <span className="text-emerald-400">succeed</span>
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    HisaabOS combines powerful accounting tools with modern automation to help Pakistani businesses grow faster.
                </p>
            </div>

            {/* Main Features Grid */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`p-8 rounded-2xl bg-slate-900 border border-slate-800 transition-all duration-300 ${feature.borderColor} hover:shadow-2xl hover:shadow-emerald-900/10 group`}
                        >
                            <div className={`w-20 h-20 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                            <p className="text-slate-400 text-lg mb-6">{feature.description}</p>
                            <ul className="space-y-3">
                                {feature.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-300">
                                        <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Application Mockup Section */}
            <section className="py-20 px-6 bg-slate-900/50 mt-12">
                <div className="max-w-7xl mx-auto items-center grid md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Manage your business from <span className="text-emerald-400">anywhere</span>
                        </h2>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            Whether you're at the office, warehouse, or on the go, HisaabOS keeps you connected. Our mobile-first design ensures you can check sales, approve invoices, and track inventory from your phone.
                        </p>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                                <Smartphone className="w-10 h-10 text-emerald-400" />
                                <div>
                                    <h4 className="text-white font-bold">Mobile App Included</h4>
                                    <p className="text-sm text-slate-400">Available on iOS and Android</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                                <ShieldCheck className="w-10 h-10 text-emerald-400" />
                                <div>
                                    <h4 className="text-white font-bold">Bank-Grade Security</h4>
                                    <p className="text-sm text-slate-400">256-bit encryption for your data</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-emerald-600/20 blur-3xl rounded-full"></div>
                        <div className="relative bg-gradient-to-tr from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-2 shadow-2xl skew-y-3 hover:skew-y-0 transition-all duration-700">
                            {/* Abstract Phone/Tablet Mockup */}
                            <div className="aspect-[4/3] bg-slate-950 rounded-lg overflow-hidden relative">
                                <div className="absolute top-0 w-full h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>
                                <div className="p-6 mt-6">
                                    <div className="flex justify-between items-end mb-8">
                                        <div>
                                            <div className="text-sm text-slate-400 mb-1">Total Revenue</div>
                                            <div className="text-3xl font-bold text-white">Rs. 4,250,000</div>
                                        </div>
                                        <div className="text-emerald-400 text-sm font-semibold">+12.5%</div>
                                    </div>
                                    <div className="flex items-end gap-2 h-32">
                                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                            <div key={i} className="flex-1 bg-emerald-600/20 hover:bg-emerald-500 transition-colors rounded-t-sm" style={{ height: `${h}%` }}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center px-6">
                <h2 className="text-4xl font-bold text-white mb-8">Ready to modernize your business?</h2>
                <Button onClick={() => navigate('/signup')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-6 text-xl rounded-full shadow-emerald-900/50 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    Get Started for Free <ArrowRight className="ml-2" />
                </Button>
            </section>
        </div>
    );
}
