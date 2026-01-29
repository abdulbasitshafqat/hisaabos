import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, Plus, Users, DollarSign, Clock, CheckCircle2 } from 'lucide-react';

export function Services() {
    const services = [
        { id: 1, name: 'Web Development', hourlyRate: 5000, activeProjects: 3, team: 'Dev Team A' },
        { id: 2, name: 'SEO Consultation', hourlyRate: 3500, activeProjects: 5, team: 'Marketing' },
        { id: 3, name: 'UI/UX Design', hourlyRate: 4500, activeProjects: 2, team: 'Design Studio' },
    ];

    const activeJobs = [
        { client: 'Alpha Corp', service: 'Web Development', deadline: 'Today', status: 'Urgent', amount: 150000 },
        { client: 'Beta Retail', service: 'SEO Consultation', deadline: 'Tomorrow', status: 'On Track', amount: 45000 },
        { client: 'Gamma Foods', service: 'UI/UX Design', deadline: 'Next Week', status: 'On Track', amount: 85000 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Services & Projects</h1>
                    <p className="text-slate-500 mt-1">Manage client bookings, retainers, and project milestones.</p>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4 mr-2" /> New Service Booking
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-100 opacity-90">Total Revenue (This Month)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold flex items-center">
                            Rs. 450,000
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium text-slate-500">Active Jobs</CardTitle>
                        <Briefcase className="w-4 h-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">8</div>
                        <p className="text-xs text-slate-500 mt-1">2 high priority</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-sm font-medium text-slate-500">Billable Hours</CardTitle>
                        <Clock className="w-4 h-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">142h</div>
                        <p className="text-xs text-slate-500 mt-1">Last 7 days</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Active Jobs List */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-emerald-600" />
                            Active Service Jobs
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {activeJobs.map((job, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100 hover:border-emerald-200 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                                            {job.client.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900">{job.client}</h4>
                                            <p className="text-sm text-slate-500">{job.service}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium text-slate-900">Rs. {job.amount.toLocaleString()}</div>
                                        <div className="flex items-center justify-end gap-2 mt-1">
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${job.status === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                {job.deadline}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Service Catalog */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-purple-600" />
                            Service Catalog
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {services.map((svc) => (
                                <div key={svc.id} className="group cursor-pointer">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-medium text-slate-700 group-hover:text-emerald-600 transition-colors">{svc.name}</span>
                                        <span className="text-sm font-semibold text-slate-900">Rs. {svc.hourlyRate}/hr</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-slate-500">
                                        <span>{svc.team}</span>
                                        <span className="flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                            {svc.activeProjects} Active
                                        </span>
                                    </div>
                                    <div className="h-px bg-slate-100 mt-3 group-last:hidden"></div>
                                </div>
                            ))}
                            <Button variant="outline" className="w-full mt-4 border-dashed">
                                <Plus className="w-4 h-4 mr-2" /> Add New Service
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
