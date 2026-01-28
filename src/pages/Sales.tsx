import { useState } from 'react';
import { useAppStore, type OrderStatus, type CourierService } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrackingDialog } from '@/components/TrackingDialog';
import { BulkBookingDialog } from '@/components/BulkBookingDialog';
import { ShoppingCart, MapPin, Eye, Package, Truck, AlertTriangle, ShieldAlert } from 'lucide-react';

const statusColors: Record<OrderStatus, string> = {
    'Pending': 'bg-slate-100 text-slate-700',
    'Confirmed': 'bg-blue-100 text-blue-700',
    'In Transit': 'bg-orange-100 text-orange-700',
    'Delivered': 'bg-emerald-100 text-emerald-700',
    'Cash Received': 'bg-emerald-200 text-emerald-800',
    'Returned (RTO)': 'bg-red-100 text-red-700'
};

const courierServices: CourierService[] = ['Trax', 'Leopards', 'TCS', 'Call Courier', 'PostEx', 'M&P'];
const orderStatuses: OrderStatus[] = ['Pending', 'Confirmed', 'In Transit', 'Delivered', 'Cash Received', 'Returned (RTO)'];

export function Sales() {
    const { orders, updateOrder, updatePerson, people } = useAppStore();
    const [trackingOrder, setTrackingOrder] = useState<typeof orders[0] | null>(null);
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    const [bulkBookingOpen, setBulkBookingOpen] = useState(false);

    const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
        const order = orders.find(o => o.id === orderId);
        if (!order) return;

        updateOrder(orderId, { status: newStatus });

        // If status changed to RTO, increment customer's return count
        if (newStatus === 'Returned (RTO)') {
            const customer = people.find(p => p.phone === order.customer_phone);
            if (customer) {
                updatePerson(customer.id, {
                    return_count: (customer.return_count || 0) + 1
                });
            }
        }
    };

    const handleCourierChange = (orderId: string, courier: CourierService) => {
        updateOrder(orderId, { courier });
    };

    const toggleOrderSelection = (orderId: string) => {
        setSelectedOrders(prev =>
            prev.includes(orderId)
                ? prev.filter(id => id !== orderId)
                : [...prev, orderId]
        );
    };

    const toggleSelectAll = () => {
        if (selectedOrders.length === orders.length) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(orders.map(o => o.id));
        }
    };

    const getSelectedOrdersData = () => {
        return orders.filter(o => selectedOrders.includes(o.id));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Sales & Orders</h2>
                    <p className="text-muted-foreground">Track orders through Pakistani courier lifecycle</p>
                </div>
                <div className="flex gap-2">
                    {selectedOrders.length > 0 && (
                        <Button
                            variant="emerald"
                            className="gap-2"
                            onClick={() => setBulkBookingOpen(true)}
                        >
                            <Truck className="w-4 h-4" />
                            Bulk Book ({selectedOrders.length})
                        </Button>
                    )}
                    <Button variant="emerald" className="gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        New Order
                    </Button>
                </div>
            </div>

            {/* High Risk Orders Alert */}
            {orders.some(o => o.is_high_risk) && (
                <Card className="border-l-4 border-l-red-500 bg-red-50">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <ShieldAlert className="w-5 h-5 text-red-600" />
                            <div>
                                <p className="font-semibold text-red-800">High Risk Orders Detected</p>
                                <p className="text-sm text-red-700">
                                    {orders.filter(o => o.is_high_risk).length} order(s) are from customers with previous returns or blacklisted numbers
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr className="border-b">
                                    <th className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedOrders.length === orders.length && orders.length > 0}
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4"
                                        />
                                    </th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Invoice #</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">City</th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold">Amount</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Source</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Courier</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={9} className="px-4 py-12 text-center text-muted-foreground">
                                            <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                            <p>No orders yet.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr
                                            key={order.id}
                                            className={`border-b hover:bg-slate-50 ${order.is_high_risk ? 'bg-red-50/30' : ''
                                                }`}
                                        >
                                            <td className="px-4 py-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedOrders.includes(order.id)}
                                                    onChange={() => toggleOrderSelection(order.id)}
                                                    className="w-4 h-4"
                                                />
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="font-mono text-sm font-medium">{order.invoice_number}</div>
                                                {order.tracking_id && (
                                                    <div className="text-xs text-muted-foreground">{order.tracking_id}</div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div>
                                                        <div className="font-medium">{order.customer_name}</div>
                                                        <div className="text-xs text-muted-foreground">{order.customer_phone}</div>
                                                    </div>
                                                    {order.is_high_risk && (
                                                        <div className="group relative">
                                                            <AlertTriangle className="w-4 h-4 text-red-600" />
                                                            <div className="absolute left-0 top-6 hidden group-hover:block bg-black text-white text-xs p-2 rounded whitespace-nowrap z-10">
                                                                ⚠️ {order.risk_reason}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3 h-3 text-muted-foreground" />
                                                    <span className="text-sm">{order.city}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="font-semibold">Rs. {order.total.toLocaleString()}</div>
                                                <div className="text-xs text-muted-foreground">{order.items.length} item(s)</div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`text-xs px-2 py-1 rounded-full ${order.source === 'shopify' ? 'bg-emerald-100 text-emerald-700' :
                                                        order.source === 'woocommerce' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-slate-100 text-slate-700'
                                                    }`}>
                                                    {order.source || 'manual'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <select
                                                    value={order.courier || ''}
                                                    onChange={(e) => handleCourierChange(order.id, e.target.value as CourierService)}
                                                    className="text-sm border rounded px-2 py-1 bg-white"
                                                >
                                                    <option value="">Select Courier</option>
                                                    {courierServices.map((courier) => (
                                                        <option key={courier} value={courier}>{courier}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-4 py-3">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                                    className={`text-xs px-2 py-1 rounded-full font-medium border-0 ${statusColors[order.status]}`}
                                                >
                                                    {orderStatuses.map((status) => (
                                                        <option key={status} value={status}>{status}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => setTrackingOrder(order)}
                                                    >
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        Track
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <TrackingDialog
                open={!!trackingOrder}
                onClose={() => setTrackingOrder(null)}
                order={trackingOrder}
            />

            <BulkBookingDialog
                open={bulkBookingOpen}
                onClose={() => {
                    setBulkBookingOpen(false);
                    setSelectedOrders([]);
                }}
                selectedOrders={getSelectedOrdersData()}
            />
        </div>
    );
}
