import { PublicNavbar } from '@/components/layout/PublicNavbar';

export function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300">
            <PublicNavbar />

            <div className="max-w-4xl mx-auto pt-32 pb-20 px-6">
                <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
                <p className="mb-8">Last Updated: January 29, 2025</p>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using HisaabOS, you agree to be bound by these Terms of Service. If you do not agree, do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Use of Service</h2>
                        <p>
                            HisaabOS grants you a limited, non-exclusive, non-transferable license to use our platform for your internal business purposes. You agree not to misuse the services or help anyone else do so.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Subscription & Payments</h2>
                        <p>
                            Some features require a paid subscription. You agree to pay all fees associated with your chosen plan. Failure to pay may result in suspension of your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Limitation of Liability</h2>
                        <p>
                            HisaabOS is provided "as is". We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Termination</h2>
                        <p>
                            We reserve the right to suspend or terminate your account if you violate these terms.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
