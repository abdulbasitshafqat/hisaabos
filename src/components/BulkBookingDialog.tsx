import { useState } from 'react';
import { useAppStore, type Order, type CourierService } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { getCourierAPI } from '@/lib/api/couriers';
import { Truck, Download, CheckCircle, Loader2 } from 'lucide-react';

interface BulkBookingDialogProps {
    open: boolean;
    onClose: () => void;
    selectedOrders: Order[];
}

export function BulkBookingDialog({ open, onClose, selectedOrders }: BulkBookingDialogProps) {
    const { integrations, updateOrder } = useAppStore();
    const [selectedCourier, setSelectedCourier] = useState<CourierService>('Trax');
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState<{
        success: boolean;
        message: string;
        pdfUrl?: string;
    } | null>(null);

    const availableCouriers: CourierService[] = ['Trax', 'Leopards', 'TCS', 'PostEx', 'M&P'];

    const handleBulkBooking = async () => {
        setProcessing(true);
        setResult(null);

        try {
            // Get courier API instance
            const courierAPI = getCourierAPI(selectedCourier, {
                trax: integrations.courier.trax_api_key,
                leopards: integrations.courier.leopards_api_key,
                tcs: integrations.courier.tcs_api_key,
                postex: integrations.courier.postex_api_key,
                mp: integrations.courier.mp_api_key
            });

            if (!courierAPI) {
                throw new Error(`${selectedCourier} API key not configured`);
            }

            // Prepare payload
            const payload = {
                orders: selectedOrders.map(order => ({
                    orderId: order.id,
                    customerName: order.customer_name,
                    phone: order.customer_phone,
                    address: order.customer_address,
                    city: order.city,
                    amount: order.total,
                    items: order.items.map(i => `${i.product_name} x${i.quantity}`).join(', ')
                }))
            };

            // Make API call
            const response = await courierAPI.bulkBooking(payload);

            if (response.success) {
                // Update orders with tracking numbers
                for (const tracking of response.trackingNumbers) {
                    const order = selectedOrders.find(o => o.id === tracking.orderId);
                    if (order) {
                        updateOrder(order.id, {
                            tracking_id: tracking.trackingId,
                            courier: selectedCourier,
                            status: 'Confirmed'
                        });
                    }
                }

                setResult({
                    success: true,
                    message: `✅ Successfully booked ${response.trackingNumbers.length} shipments!`,
                    pdfUrl: response.pdfUrl
                });
            } else {
                throw new Error('Bulk booking failed');
            }
        } catch (error) {
            setResult({
                success: false,
                message: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`
            });
        } finally {
            setProcessing(false);
        }
    };

    const handleDownloadPDF = () => {
        if (result?.pdfUrl) {
            window.open(result.pdfUrl, '_blank');
        }
    };

    const handleClose = () => {
        setResult(null);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-emerald-600" />
                        Bulk Courier Booking
                    </DialogTitle>
                    <DialogDescription>
                        Generate load sheet and tracking numbers for {selectedOrders.length} orders
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Order Summary */}
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Order Summary</h3>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                                <p className="text-muted-foreground">Total Orders</p>
                                <p className="text-2xl font-bold">{selectedOrders.length}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Total COD</p>
                                <p className="text-2xl font-bold text-emerald-600">
                                    Rs. {selectedOrders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Cities</p>
                                <p className="text-2xl font-bold">
                                    {new Set(selectedOrders.map(o => o.city)).size}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Courier Selection */}
                    <div>
                        <Label htmlFor="courier">Select Courier Service *</Label>
                        <select
                            id="courier"
                            value={selectedCourier}
                            onChange={(e) => setSelectedCourier(e.target.value as CourierService)}
                            className="w-full mt-1 px-3 py-2 border rounded-md bg-white"
                            disabled={processing}
                        >
                            {availableCouriers.map((courier) => (
                                <option key={courier} value={courier}>
                                    {courier}
                                </option>
                            ))}
                        </select>
                        <p className="text-xs text-muted-foreground mt-1">
                            Make sure you have configured the API key for this courier in Integrations
                        </p>
                    </div>

                    {/* PostEx Factoring Notice */}
                    {selectedCourier === 'PostEx' && integrations.courier.postex_factoring_enabled && (
                        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                            <p className="text-sm font-medium text-blue-800">
                                💰 PostEx Factoring Enabled
                            </p>
                            <p className="text-xs text-blue-700 mt-1">
                                You will receive upfront payment minus {integrations.courier.postex_service_fee || 3}% service fee
                            </p>
                        </div>
                    )}

                    {/* Result Display */}
                    {result && (
                        <div className={`p-4 rounded-lg border-l-4 ${result.success
                                ? 'bg-emerald-50 border-emerald-500'
                                : 'bg-red-50 border-red-500'
                            }`}>
                            <div className="flex items-center gap-2 mb-2">
                                {result.success ? (
                                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                                ) : (
                                    <div className="w-5 h-5 text-red-600">❌</div>
                                )}
                                <p className="font-medium">{result.message}</p>
                            </div>
                            {result.success && result.pdfUrl && (
                                <Button
                                    onClick={handleDownloadPDF}
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 mt-2"
                                >
                                    <Download className="w-4 h-4" />
                                    Download Load Sheet PDF
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Order List Preview */}
                    {!result && (
                        <div className="border rounded-lg max-h-64 overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-slate-50 sticky top-0">
                                    <tr>
                                        <th className="px-3 py-2 text-left">Invoice</th>
                                        <th className="px-3 py-2 text-left">Customer</th>
                                        <th className="px-3 py-2 text-left">City</th>
                                        <th className="px-3 py-2 text-right">COD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedOrders.map((order) => (
                                        <tr key={order.id} className="border-t">
                                            <td className="px-3 py-2 font-mono">{order.invoice_number}</td>
                                            <td className="px-3 py-2">{order.customer_name}</td>
                                            <td className="px-3 py-2">{order.city}</td>
                                            <td className="px-3 py-2 text-right font-medium">
                                                Rs. {order.total.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={handleClose} disabled={processing}>
                        {result ? 'Close' : 'Cancel'}
                    </Button>
                    {!result && (
                        <Button
                            onClick={handleBulkBooking}
                            variant="emerald"
                            disabled={processing || selectedOrders.length === 0}
                            className="gap-2"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Truck className="w-4 h-4" />
                                    Generate Load Sheet
                                </>
                            )}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
