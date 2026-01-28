import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Lock, User, Building2, Chrome } from 'lucide-react';

export function SignupPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        businessName: '',
        password: ''
    });

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock signup - redirect to onboarding
        navigate('/onboarding');
    };

    const handleGoogleSignup = () => {
        // Mock Google OAuth - redirect to onboarding
        navigate('/onboarding');
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2">
            {/* Left Side - Abstract Art */}
            <div className="hidden md:flex bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl"></div>
                </div>
                <div className="relative z-10 text-center">
                    <div className="w-20 h-20 rounded-2xl bg-emerald-600 flex items-center justify-center font-bold text-white text-4xl mb-6 mx-auto">
                        H
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">Start Your Free Trial</h1>
                    <p className="text-xl text-slate-300 mb-12">
                        Join 500+ businesses automating their finances
                    </p>
                    <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                        {[
                            { icon: '🚀', text: 'Setup in 2 minutes' },
                            { icon: '💳', text: 'No credit card' },
                            { icon: '⏱️', text: '14-day free trial' },
                            { icon: '❌', text: 'Cancel anytime' }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-lg rounded-lg p-4 text-center border border-white/10">
                                <div className="text-3xl mb-2">{item.icon}</div>
                                <div className="text-sm text-slate-300">{item.text}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex items-center justify-center p-8 bg-white overflow-y-auto">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Create your account</h2>
                        <p className="text-slate-600">Get started with HisaabOS today</p>
                    </div>

                    <Button
                        onClick={handleGoogleSignup}
                        variant="outline"
                        className="w-full py-6 mb-6 text-lg border-2 hover:bg-slate-50"
                    >
                        <Chrome className="w-5 h-5 mr-2" />
                        Sign up with Google
                    </Button>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-slate-500">Or sign up with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <Label htmlFor="name" className="text-slate-700">Full Name</Label>
                            <div className="relative mt-1">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Ahmed Khan"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="pl-10 py-6 text-lg"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="email" className="text-slate-700">Email</Label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="pl-10 py-6 text-lg"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="businessName" className="text-slate-700">Business Name</Label>
                            <div className="relative mt-1">
                                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    id="businessName"
                                    type="text"
                                    placeholder="Your Business Name"
                                    value={formData.businessName}
                                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                    className="pl-10 py-6 text-lg"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="password" className="text-slate-700">Password</Label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="pl-10 py-6 text-lg"
                                    required
                                />
                            </div>
                            <p className="text-xs text-slate-500 mt-1">Must be at least 8 characters</p>
                        </div>

                        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 py-6 text-lg">
                            Create Account
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-emerald-600 hover:text-emerald-700 font-semibold"
                        >
                            Log in
                        </button>
                    </p>

                    <p className="mt-8 text-center text-xs text-slate-500">
                        By signing up, you agree to our{' '}
                        <a href="#" className="underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="underline">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
