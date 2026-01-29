import { PublicNavbar } from '@/components/layout/PublicNavbar';

export function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300">
            <PublicNavbar />

            <div className="max-w-4xl mx-auto pt-32 pb-20 px-6">
                <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
                <p className="mb-8">Last Updated: January 29, 2025</p>

                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                        <p>
                            HisaabOS ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Account Information:</strong> Name, email address, phone number, and business details.</li>
                            <li><strong>Financial Data:</strong> Invoices, expenses, and transaction records you input into the system.</li>
                            <li><strong>Usage Data:</strong> Information about how you navigate and use our platform.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Data</h2>
                        <p>
                            We use your data to provide, maintain, and improve our services, including generating financial reports, creating backups, and offering customer support. **We do not sell your data to third parties.**
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
                        <p>
                            We employ industry-standard encryption (AES-256) and security protocols to protect your data. Your data is stored on secure cloud servers with restricted access.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
                        <p>
                            If you have questions about this policy, please contact us at privacy@hisaabos.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
