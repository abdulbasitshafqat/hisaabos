import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, type BusinessType } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Store, Factory, Briefcase, Upload, CheckCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export function Onboarding() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        businessName: '',
        businessType: null as BusinessType | null,
        isFiler: null as boolean | null,
    });
    const { completeOnboarding } = useStore();

    const handleNext = () => setStep((s) => s + 1);
    const handleBack = () => setStep((s) => s - 1);

    const finishOnboarding = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Slight delay to enjoy confetti
        setTimeout(() => {
            if (formData.businessType && formData.isFiler !== null) {
                completeOnboarding({
                    businessName: formData.businessName,
                    businessType: formData.businessType,
                    isFiler: formData.isFiler
                });
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="mb-8 text-center space-y-2">
                    <h1 className="text-3xl font-bold text-white tracking-tight">Welcome to HisaabOS</h1>
                    <p className="text-slate-400">Let's set up your Financial Operating System.</p>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <Card className="bg-slate-800 border-slate-700">
                                <CardContent className="p-6 space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-slate-200">What is your Business Name?</Label>
                                        <Input
                                            placeholder="e.g. Karachi Textiles"
                                            className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
                                            value={formData.businessName}
                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-slate-200">What do you do?</Label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {[
                                                { id: 'retail', label: 'Retail / E-com', icon: Store },
                                                { id: 'manufacturing', label: 'Factory / Mfg', icon: Factory },
                                                { id: 'agency', label: 'Service / Agency', icon: Briefcase },
                                            ].map((type) => (
                                                <button
                                                    key={type.id}
                                                    onClick={() => setFormData({ ...formData, businessType: type.id as BusinessType })}
                                                    className={`flex flex-col items-center justify-center p-4 rounded-lg border transition-all ${formData.businessType === type.id
                                                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-850 hover:border-slate-600'
                                                        }`}
                                                >
                                                    <type.icon className="w-8 h-8 mb-2" />
                                                    <span className="text-sm font-medium">{type.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-slate-200">Tax Status?</Label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {[
                                                { value: true, label: 'Filer (Active)' },
                                                { value: false, label: 'Non-Filer' }
                                            ].map((option) => (
                                                <button
                                                    key={String(option.value)}
                                                    onClick={() => setFormData({ ...formData, isFiler: option.value })}
                                                    className={`p-4 rounded-lg border text-center transition-all ${formData.isFiler === option.value
                                                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                                                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-850 hover:border-slate-600'
                                                        }`}
                                                >
                                                    <span className="text-sm font-medium">{option.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex justify-end">
                                <Button
                                    variant="emerald"
                                    size="lg"
                                    onClick={handleNext}
                                    disabled={!formData.businessName || !formData.businessType || formData.isFiler === null}
                                >
                                    Next <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <Card className="bg-slate-800 border-slate-700">
                                <CardContent className="p-8 text-center space-y-6">
                                    <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                                        <Upload className="w-8 h-8 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">Import Existing Data</h3>
                                        <p className="text-slate-400 mt-2 text-sm">
                                            Drag and drop your Excel files here to auto-migrate.
                                            We'll fuzzy-match your headers.
                                        </p>
                                    </div>

                                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-10 bg-slate-900/50 hover:bg-slate-900 transition-colors cursor-pointer">
                                        <p className="text-slate-500">Drop files here or click to browse</p>
                                        <p className="text-xs text-slate-600 mt-2">Supports .xlsx, .csv</p>
                                    </div>

                                    <div className=" bg-slate-900/50 p-4 rounded text-left text-sm text-slate-400 border border-slate-700/50">
                                        <p className="font-mono text-emerald-400 mb-1">Simulated Intelligence:</p>
                                        <ul className="space-y-1 list-disc list-inside">
                                            <li>Auto-cleaning "Rs." currency symbols...</li>
                                            <li>Mapping "Party Name" to "Customer"...</li>
                                            <li>Detecting Tax Columns...</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="flex justify-between">
                                <Button variant="ghost" onClick={handleBack} className="text-slate-400 hover:text-white">
                                    Back
                                </Button>
                                <Button
                                    variant="emerald"
                                    size="lg"
                                    onClick={finishOnboarding}
                                >
                                    Finish Setup <CheckCircle className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
