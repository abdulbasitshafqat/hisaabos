import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, Chrome } from 'lucide-react';

export function LoginPage() {
    const navigate = useNavigate();
    const { setIsOnboarded } = useStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login - in production, validate with backend
        setIsOnboarded(true);
        navigate('/');
    };

    const handleGoogleLogin = () => {
        // Mock Google OAuth
        setIsOnboarded(true);
        navigate('/');
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2">
            {/* Left Side - Abstract Art */}
            <div className="hidden md:flex bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-emerald-600 flex items-center justify-center font-bold text-white text-4xl mb-6 mx-auto">
                        H
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">HisaabOS</h1>
                    <p className="text-xl text-slate-300">
                        The Financial Operating System<br />for Pakistani Businesses
                    </p>
                    <div className="mt-12 space-y-4 text-left max-w-md">
                        {[
                            '✓ Trusted by 500+ businesses',
                            '✓ FBR-compliant reporting',
                            '✓ Pakistani courier integration',
                            '✓ Bank reconciliation in seconds'
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-slate-300">
                                <div className="w-6 h-6 rounded-full bg-emerald-600/20 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                </div>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h2>
                        <p className="text-slate-600">Log in to your HisaabOS account</p>
                    </div>

                    <Button
                        onClick={handleGoogleLogin}
                        variant="outline"
                        className="w-full py-6 mb-6 text-lg border-2 hover:bg-slate-50"
                    >
                        <Chrome className="w-5 h-5 mr-2" />
                        Continue with Google
                    </Button>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-slate-500">Or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <Label htmlFor="email" className="text-slate-700">Email</Label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 py-6 text-lg"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <Label htmlFor="password" className="text-slate-700">Password</Label>
                                <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 py-6 text-lg"
                                    required
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 py-6 text-lg">
                            Log In
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-600">
                        Don't have an account?{' '}
                        <button
                            onClick={() => navigate('/signup')}
                            className="text-emerald-600 hover:text-emerald-700 font-semibold"
                        >
                            Sign up for free
                        </button>
                    </p>

                    <p className="mt-8 text-center text-xs text-slate-500">
                        By continuing, you agree to our{' '}
                        <a href="#" className="underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="underline">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
