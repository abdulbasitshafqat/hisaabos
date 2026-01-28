import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Settings as SettingsIcon, Save } from 'lucide-react';

export function Settings() {
    const { settings, updateSettings } = useAppStore();
    const [formData, setFormData] = useState(settings);

    const handleSave = () => {
        updateSettings(formData);
        alert('Settings saved successfully!');
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Business Settings</h2>
                <p className="text-muted-foreground">Configure your business information for invoices</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <SettingsIcon className="w-5 h-5" />
                        Business Information
                    </CardTitle>
                    <CardDescription>
                        This information will appear on all invoices and official documents
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <Label htmlFor="businessName">Business Name *</Label>
                            <Input
                                id="businessName"
                                value={formData.businessName}
                                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                placeholder="e.g., Karachi Textiles Co."
                            />
                        </div>

                        <div>
                            <Label htmlFor="ntn">NTN (National Tax Number)</Label>
                            <Input
                                id="ntn"
                                value={formData.ntn}
                                onChange={(e) => setFormData({ ...formData, ntn: e.target.value })}
                                placeholder="e.g., 1234567-8"
                            />
                        </div>

                        <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="e.g., 0300-1234567"
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="e.g., info@yourbusiness.com"
                            />
                        </div>

                        <div>
                            <Label htmlFor="address">Business Address</Label>
                            <Input
                                id="address"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="e.g., Shop 12, Saddar, Karachi"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button onClick={handleSave} variant="emerald" className="gap-2">
                            <Save className="w-4 h-4" />
                            Save Settings
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
