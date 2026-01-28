import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function PublicNavbar() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-xl">
                        H
                    </div>
                    <span className="text-2xl font-bold text-white">HisaabOS</span>
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/features')}
                        className={`text-slate-300 hover:text-white transition-colors hover:bg-transparent ${location.pathname === '/features' ? 'text-white' : ''}`}
                    >
                        Features
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/pricing')}
                        className={`text-slate-300 hover:text-white transition-colors hover:bg-transparent ${location.pathname === '/pricing' ? 'text-white' : ''}`}
                    >
                        Pricing
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/testimonials')}
                        className={`text-slate-300 hover:text-white transition-colors hover:bg-transparent ${location.pathname === '/testimonials' ? 'text-white' : ''}`}
                    >
                        Testimonials
                    </Button>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={() => navigate('/login')} className="hidden sm:flex border-slate-700 text-white hover:bg-slate-800">
                        Login
                    </Button>
                    <Button onClick={() => navigate('/signup')} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        Get Started
                    </Button>
                </div>
            </div>
        </nav>
    );
}
