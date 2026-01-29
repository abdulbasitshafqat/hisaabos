import { PublicNavbar } from '@/components/layout/PublicNavbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Briefcase } from 'lucide-react';

export function CareersPage() {
    const openings = [
        {
            title: 'Senior React Developer',
            department: 'Engineering',
            location: 'Remote / Lahore',
            type: 'Full-time'
        },
        {
            title: 'Sales Manager (Karachi Region)',
            department: 'Sales',
            location: 'Karachi',
            type: 'Full-time'
        },
        {
            title: 'Customer Success Specialist',
            department: 'Support',
            location: 'Islamabad',
            type: 'Full-time'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
            <PublicNavbar />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6 text-center">
                <h1 className="text-5xl font-bold text-white mb-6">
                    Join the <span className="text-emerald-400">Revolution</span>
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                    Help us build the financial operating system for the next generation of Pakistani businesses.
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
                    View Open Positions
                </Button>
            </section>

            {/* Perks */}
            <section className="py-16 px-6 bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-12 text-center">Why Work With Us?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: 'Competitive Salary', desc: 'Market-leading salaries pegged to USD.' },
                            { title: 'Remote First', desc: 'Work from anywhere in Pakistan, or our Lahore hub.' },
                            { title: 'Health Insurance', desc: 'Comprehensive coverage for you and your family.' }
                        ].map((perk, i) => (
                            <div key={i} className="text-center p-6 rounded-lg bg-slate-800/30 border border-slate-700">
                                <h3 className="text-white font-bold mb-2">{perk.title}</h3>
                                <p className="text-slate-400">{perk.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Openings */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-12">Open Positions</h2>
                    <div className="space-y-4">
                        {openings.map((job, i) => (
                            <Card key={i} className="bg-slate-800/50 border-slate-700 hover:border-emerald-600 transition-colors cursor-pointer group">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-xl text-white group-hover:text-emerald-400 transition-colors">
                                        {job.title}
                                    </CardTitle>
                                    <Button variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600 hover:text-white">
                                        Apply
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-6 text-slate-400 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="w-4 h-4" /> {job.department}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" /> {job.location}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" /> {job.type}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
