
import { type Order, type OrderStatus, type CourierService } from '@/store/appStore';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Package, MapPin, CheckCircle2, XCircle } from 'lucide-react';

interface TrackingDialogProps {
    open: boolean;
    onClose: () => void;
    order: Order | null;
}

const generateTimeline = (status: OrderStatus, courier?: CourierService) => {
    const baseTimeline = [
        { status: 'Pending', icon: Package, color: 'text-slate-400', time: '10:30 AM', location: 'Order Placed' },
        { status: 'Confirmed', icon: CheckCircle2, color: 'text-blue-500', time: '11:15 AM', location: 'Order Confirmed - Payment Verified' },
    ];

    if (status === 'Pending') return [baseTimeline[0]];
    if (status === 'Confirmed') return baseTimeline;

    const transitTimeline = [
        ...baseTimeline,
        { status: 'In Transit', icon: MapPin, color: 'text-orange-500', time: '02:45 PM', location: `Picked up - ${courier || 'Courier'} Hub` },
    ];

    if (status === 'In Transit') return transitTimeline;

    if (status === 'Returned (RTO)') {
        return [
            ...transitTimeline,
            { status: 'Returned', icon: XCircle, color: 'text-red-500', time: '05:30 PM', location: 'Customer Refused / RTO Initiated' },
        ];
    }

    const deliveredTimeline = [
        ...transitTimeline,
        { status: 'In Transit', icon: MapPin, color: 'text-orange-500', time: '09:20 AM (Next Day)', location: 'Arrived at Destination City Hub' },
        { status: 'Delivered', icon: CheckCircle2, color: 'text-emerald-500', time: '03:15 PM', location: 'Delivered to Customer' },
    ];

    if (status === 'Delivered') return deliveredTimeline;

    if (status === 'Cash Received') {
        return [
            ...deliveredTimeline,
            { status: 'Cash Received', icon: CheckCircle2, color: 'text-emerald-700', time: '05:00 PM', location: 'Cash Collected & Deposited' },
        ];
    }

    return baseTimeline;
};

export function TrackingDialog({ open, onClose, order }: TrackingDialogProps) {
    if (!order) return null;

    const timeline = generateTimeline(order.status, order.courier);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Track Order: {order.invoice_number}</DialogTitle>
                    <DialogDescription>
                        Tracking ID: {order.tracking_id || 'N/A'} • Courier: {order.courier || 'Not Assigned'}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-muted-foreground">Customer</p>
                                <p className="font-medium">{order.customer_name}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Destination</p>
                                <p className="font-medium">{order.city}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Order Value</p>
                                <p className="font-medium text-emerald-600">Rs. {order.total.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-muted-foreground">Status</p>
                                <p className={`font-medium ${order.status === 'Cash Received' ? 'text-emerald-600' :
                                    order.status === 'Returned (RTO)' ? 'text-red-600' :
                                        'text-slate-900'
                                    }`}>
                                    {order.status}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm">Shipment Timeline</h3>
                        <div className="relative pl-8 space-y-6">
                            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200" />

                            {timeline.map((event, index) => {
                                const Icon = event.icon;
                                return (
                                    <div key={index} className="relative">
                                        <div className={`absolute -left-8 w-6 h-6 rounded-full bg-white border-2 flex items-center justify-center ${index === timeline.length - 1 ? 'border-current' : 'border-slate-300'
                                            }`}>
                                            <Icon className={`w-3 h-3 ${index === timeline.length - 1 ? event.color : 'text-slate-400'}`} />
                                        </div>
                                        <div>
                                            <p className={`font-medium text-sm ${index === timeline.length - 1 ? event.color : 'text-slate-600'}`}>
                                                {event.location}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {order.status === 'Cash Received' && (
                        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                            <p className="text-sm font-medium text-emerald-800">
                                ✅ Cash Collection Complete! Amount: Rs. {order.total.toLocaleString()}
                            </p>
                        </div>
                    )}

                    {order.status === 'Returned (RTO)' && (
                        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                            <p className="text-sm font-medium text-red-800">
                                ⚠️ Order Returned. Please contact customer for re-delivery or refund.
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
