import { Briefcase } from 'lucide-react';

export function Services() {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-slate-500">
            <Briefcase className="w-16 h-16 mb-4 text-emerald-200" />
            <h2 className="text-2xl font-semibold text-slate-900">Services Module</h2>
            <p>Track project hours and retainer fees.</p>
        </div>
    );
}
