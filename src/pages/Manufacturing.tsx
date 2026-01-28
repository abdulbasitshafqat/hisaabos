import { Factory } from 'lucide-react';

export function Manufacturing() {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-slate-500">
            <Factory className="w-16 h-16 mb-4 text-emerald-200" />
            <h2 className="text-2xl font-semibold text-slate-900">Manufacturing</h2>
            <p>Create recipes, BOMs, and track production.</p>
        </div>
    );
}
