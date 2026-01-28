import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, User, Building2, Phone, MessageCircle, Eye, Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export function People() {
    const { people } = useAppStore();
    const [activeTab, setActiveTab] = useState<'customer' | 'vendor'>('customer');
    const [selectedPerson, setSelectedPerson] = useState<typeof people[0] | null>(null);

    const filteredPeople = people.filter(p => p.type === activeTab);

    const sendWhatsAppReminder = (person: typeof people[0]) => {
        if (person.balance <= 0) {
            alert('No pending balance to remind about.');
            return;
        }

        const message = encodeURIComponent(
            `السلام علیکم ${person.name},\n\nThis is a friendly reminder that your balance of Rs. ${person.balance.toLocaleString()} is due.\n\nJazakAllah Khair!\n\nBest regards,\nTeam HisaabOS`
        );
        const phone = person.phone.replace(/[^0-9]/g, '');
        const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Khata (People Management)</h2>
                    <p className="text-muted-foreground">Track customer & vendor ledgers</p>
                </div>
                <Button variant="emerald" className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Person
                </Button>
            </div>

            <div className="flex gap-2 border-b">
                <button
                    onClick={() => setActiveTab('customer')}
                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === 'customer'
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <User className="w-4 h-4 inline mr-2" />
                    Customers
                </button>
                <button
                    onClick={() => setActiveTab('vendor')}
                    className={`px-4 py-2 font-medium border-b-2 transition-colors ${activeTab === 'vendor'
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                        }`}
                >
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Vendors / Suppliers
                </button>
            </div>

            <div className="grid gap-4">
                {filteredPeople.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center text-muted-foreground">
                            <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>No {activeTab}s yet.</p>
                        </CardContent>
                    </Card>
                ) : (
                    filteredPeople.map((person) => (
                        <Card key={person.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                                            {person.type === 'customer' ? (
                                                <User className="w-6 h-6 text-slate-600" />
                                            ) : (
                                                <Building2 className="w-6 h-6 text-slate-600" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{person.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                                <Phone className="w-3 h-3" />
                                                <span>{person.phone}</span>
                                            </div>
                                            <div className="mt-2">
                                                <span className="text-xs text-muted-foreground">Balance: </span>
                                                <span className={`font-semibold ${person.balance > 0 ? 'text-emerald-600' :
                                                    person.balance < 0 ? 'text-red-600' :
                                                        'text-slate-600'
                                                    }`}>
                                                    Rs. {Math.abs(person.balance).toLocaleString()}
                                                    {person.balance > 0 && ' (Receivable)'}
                                                    {person.balance < 0 && ' (Payable)'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        {person.type === 'customer' && person.balance > 0 && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => sendWhatsAppReminder(person)}
                                                className="gap-1"
                                            >
                                                <MessageCircle className="w-4 h-4 text-emerald-600" />
                                                Send Reminder
                                            </Button>
                                        )}
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setSelectedPerson(person)}
                                            className="gap-1"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View Ledger
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Ledger Dialog */}
            <Dialog open={!!selectedPerson} onOpenChange={() => setSelectedPerson(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Ledger: {selectedPerson?.name}</DialogTitle>
                        <DialogDescription>
                            Complete transaction history
                        </DialogDescription>
                    </DialogHeader>

                    {selectedPerson && (
                        <div className="space-y-4">
                            <div className="bg-slate-50 p-4 rounded-lg grid grid-cols-3 gap-4 text-sm">
                                <div>
                                    <p className="text-muted-foreground">Phone</p>
                                    <p className="font-medium">{selectedPerson.phone}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Type</p>
                                    <p className="font-medium capitalize">{selectedPerson.type}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Current Balance</p>
                                    <p className={`font-semibold ${selectedPerson.balance > 0 ? 'text-emerald-600' :
                                        selectedPerson.balance < 0 ? 'text-red-600' :
                                            'text-slate-600'
                                        }`}>
                                        Rs. {Math.abs(selectedPerson.balance).toLocaleString()}
                                        {selectedPerson.balance > 0 && ' (Receivable)'}
                                        {selectedPerson.balance < 0 && ' (Payable)'}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-3">Transaction History</h3>
                                <div className="border rounded-lg overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
                                                <th className="px-4 py-2 text-left text-sm font-semibold">Description</th>
                                                <th className="px-4 py-2 text-right text-sm font-semibold">Debit</th>
                                                <th className="px-4 py-2 text-right text-sm font-semibold">Credit</th>
                                                <th className="px-4 py-2 text-right text-sm font-semibold">Balance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedPerson.ledger.length === 0 ? (
                                                <tr>
                                                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                                        No transactions yet
                                                    </td>
                                                </tr>
                                            ) : (
                                                selectedPerson.ledger.map((entry) => (
                                                    <tr key={entry.id} className="border-t">
                                                        <td className="px-4 py-2 text-sm">{entry.date}</td>
                                                        <td className="px-4 py-2 text-sm">{entry.description}</td>
                                                        <td className="px-4 py-2 text-sm text-right">
                                                            {entry.debit > 0 && (
                                                                <span className="text-emerald-600 font-medium">
                                                                    Rs. {entry.debit.toLocaleString()}
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-sm text-right">
                                                            {entry.credit > 0 && (
                                                                <span className="text-slate-600 font-medium">
                                                                    Rs. {entry.credit.toLocaleString()}
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-2 text-sm text-right font-semibold">
                                                            Rs. {Math.abs(entry.balance).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
