import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Book, MessageCircle, FileText, Phone, Briefcase } from 'lucide-react';

export function HelpCenterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
            <PublicNavbar />

            {/* Search Hero */}
            <section className="pt-32 pb-20 px-6 text-center">
                <h1 className="text-4xl font-bold text-white mb-8">How can we help you?</h1>
                <div className="max-w-2xl mx-auto relative">
                    <Search className="absolute left-4 top-4 w-6 h-6 text-slate-400" />
                    <Input
                        placeholder="Search for articles (e.g. 'How to file tax', 'Add user')"
                        className="pl-14 py-8 text-lg bg-slate-800 border-slate-700 text-white rounded-full focus:ring-emerald-600"
                    />
                </div>
            </section>

            {/* Categories */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
                    {[
                        { icon: Book, title: 'Getting Started', desc: 'Account setup, importing data, and basics.' },
                        { icon: FileText, title: 'Invoicing & Sales', desc: 'Creating invoices, quotations, and returns.' },
                        { icon: Briefcase, title: 'FBR Compliance', desc: 'Understanding Annex-C and tax filing.' }, // Replaced Building with Briefcase as placeholder or import Building
                        { icon: Phone, title: 'Courier Integration', desc: 'Connecting Trax/TCS and booking shipments.' },
                        { icon: MessageCircle, title: 'Account Management', desc: 'Billing, passwords, and team roles.' },
                    ].map((cat, i) => (
                        <Card key={i} className="bg-slate-800/50 border-slate-700 hover:border-emerald-600 transition-colors cursor-pointer">
                            <CardHeader>
                                <cat.icon className="w-8 h-8 text-emerald-400 mb-4" />
                                <CardTitle className="text-white">{cat.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-400">{cat.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-20 px-6 bg-slate-900/50">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Still need help?</h2>
                    <p className="text-slate-300 mb-8">
                        Our support team is available Mon-Sat, 9am - 6pm PKT.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                            Chat on WhatsApp
                        </Button>
                        <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                            Email Support
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
