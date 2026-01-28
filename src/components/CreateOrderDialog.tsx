import { useState, useMemo } from 'react';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Search, Loader2, Plus, Trash2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CreateOrderDialogProps {
    open: boolean;
    onClose: () => void;
}

interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
}

export function CreateOrderDialog({ open, onClose }: CreateOrderDialogProps) {
    const { products, people, addOrder, checkOrderRisk } = useAppStore();

    // Form State
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
    const [loading, setLoading] = useState(false);

    // Derived State
    const customers = useMemo(() => people.filter(p => p.type === 'customer'), [people]);

    // Handle phone input & auto-fill
    const handlePhoneChange = (phone: string) => {
        setCustomerPhone(phone);
        const existingCustomer = customers.find(c => c.phone === phone);
        if (existingCustomer) {
            setCustomerName(existingCustomer.name);
            // In a real app we might auto-fill address from last order
        }
    };

    const addItem = (productId: string) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = selectedItems.find(i => i.productId === productId);
        if (existingItem) {
            setSelectedItems(selectedItems.map(i =>
                i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
            ));
        } else {
            setSelectedItems([
                ...selectedItems,
                { productId: product.id, productName: product.name, quantity: 1, price: product.retail_price }
            ]);
        }
    };

    const removeItem = (productId: string) => {
        setSelectedItems(selectedItems.filter(i => i.productId !== productId));
    };

    const updateQuantity = (productId: string, delta: number) => {
        setSelectedItems(selectedItems.map(i => {
            if (i.productId === productId) {
                const newQty = Math.max(1, i.quantity + delta);
                return { ...i, quantity: newQty };
            }
            return i;
        }));
    };

    const calculateTotal = () => {
        return selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const handleSubmit = async () => {
        if (!customerName || !customerPhone || selectedItems.length === 0) return;

        setLoading(true);
        try {
            const { isHighRisk, reason } = checkOrderRisk(customerPhone);

            await addOrder({
                customer_name: customerName,
                customer_phone: customerPhone,
                customer_address: address,
                city: city || 'Unknown City',
                items: selectedItems.map(i => ({
                    product_id: i.productId,
                    product_name: i.productName,
                    quantity: i.quantity,
                    price: i.price
                })),
                total: calculateTotal(),
                status: 'Pending',
                source: 'manual',
                is_high_risk: isHighRisk,
                risk_reason: reason
            });

            // Reset
            setCustomerName('');
            setCustomerPhone('');
            setAddress('');
            setCity('');
            setSelectedItems([]);
            onClose();
        } catch (error) {
            console.error('Failed to create order', error);
            alert('Failed to create order. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Order</DialogTitle>
                    <DialogDescription>Enter customer details and add products to cart.</DialogDescription>
                </DialogHeader>

                <div className="grid md:grid-cols-2 gap-6 py-4">
                    {/* Customer Details */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">Customer Details</h3>
                        <div className="grid gap-2">
                            <Label>Phone Number</Label>
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="0300-1234567"
                                    className="pl-8"
                                    value={customerPhone}
                                    onChange={(e) => handlePhoneChange(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Full Name</Label>
                            <Input
                                placeholder="Customer Name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="grid gap-2">
                                <Label>City</Label>
                                <Select onValueChange={setCity} value={city}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select City" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Lahore">Lahore</SelectItem>
                                        <SelectItem value="Karachi">Karachi</SelectItem>
                                        <SelectItem value="Islamabad">Islamabad</SelectItem>
                                        <SelectItem value="Rawalpindi">Rawalpindi</SelectItem>
                                        <SelectItem value="Faisalabad">Faisalabad</SelectItem>
                                        <SelectItem value="Multan">Multan</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label>Address</Label>
                                <Input
                                    placeholder="Street Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider">Order Items</h3>
                            <Link to="/inventory" onClick={onClose} className="text-xs text-emerald-600 hover:underline flex items-center gap-1">
                                <Plus className="w-3 h-3" /> Add New Product
                            </Link>
                        </div>

                        {/* Product Selector */}
                        {products.length === 0 ? (
                            <div className="border border-dashed border-red-300 bg-red-50 p-4 rounded-md text-center text-sm text-red-600">
                                <AlertCircle className="w-5 h-5 mx-auto mb-2" />
                                No products found in inventory. <br />
                                <Link to="/inventory" onClick={onClose} className="font-semibold underline">Go to Inventory</Link> to create your first product.
                            </div>
                        ) : (
                            <Select onValueChange={addItem}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Product to Add..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {products.map(p => (
                                        <SelectItem key={p.id} value={p.id}>
                                            {p.name} - Rs. {p.retail_price}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                        {/* Cart Items */}
                        <div className="bg-slate-50 rounded-lg p-4 min-h-[200px] space-y-3">
                            {selectedItems.length === 0 ? (
                                <div className="text-center text-slate-400 py-8">
                                    <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p className="text-sm">Cart is empty</p>
                                </div>
                            ) : (
                                selectedItems.map(item => (
                                    <div key={item.productId} className="flex items-center justify-between bg-white p-2 rounded border shadow-sm">
                                        <div className="flex-1 min-w-0 mr-2">
                                            <p className="text-sm font-medium truncate">{item.productName}</p>
                                            <p className="text-xs text-slate-500">Rs. {item.price}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.productId, -1)}>-</Button>
                                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                                            <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.productId, 1)}>+</Button>
                                            <Button size="icon" variant="ghost" className="h-6 w-6 text-red-500" onClick={() => removeItem(item.productId)}>
                                                <Trash2 className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Total */}
                        <div className="flex items-center justify-between pt-4 border-t">
                            <span className="font-bold text-lg">Total Amount</span>
                            <span className="font-bold text-xl text-emerald-600">Rs. {calculateTotal().toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
                    <Button
                        onClick={handleSubmit}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        disabled={selectedItems.length === 0 || !customerName || loading}
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Create Order
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
