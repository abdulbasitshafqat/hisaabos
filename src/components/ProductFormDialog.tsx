import { useState } from 'react';
import { useAppStore, type Product } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';


interface ProductFormDialogProps {
    open: boolean;
    onClose: () => void;
    product?: Product;
}

export function ProductFormDialog({ open, onClose, product }: ProductFormDialogProps) {
    const { addProduct, updateProduct } = useAppStore();
    const [formData, setFormData] = useState({
        name: product?.name || '',
        purchase_price: product?.purchase_price || 0,
        shipping_cost: product?.shipping_cost || 0,
        packaging_cost: product?.packaging_cost || 0,
        retail_price: product?.retail_price || 0,
        stock_level: product?.stock_level || 0,
        alert_threshold: product?.alert_threshold || 5,
        category: product?.category || ''
    });

    const landedCost = formData.purchase_price + formData.shipping_cost + formData.packaging_cost;
    const marginPercent = formData.retail_price > 0
        ? ((formData.retail_price - landedCost) / formData.retail_price * 100).toFixed(1)
        : '0';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name) {
            alert('Product name is required');
            return;
        }

        if (product) {
            updateProduct(product.id, formData);
        } else {
            addProduct(formData);
        }

        onClose();
        setFormData({
            name: '',
            purchase_price: 0,
            shipping_cost: 0,
            packaging_cost: 0,
            retail_price: 0,
            stock_level: 0,
            alert_threshold: 5,
            category: ''
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    <DialogDescription>
                        Enter complete product details including landed cost components.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <Label htmlFor="name">Product Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g., Premium Cotton T-Shirt"
                            />
                        </div>

                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Input
                                id="category"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="e.g., Apparel"
                            />
                        </div>

                        <div>
                            <Label htmlFor="stock_level">Stock Level</Label>
                            <Input
                                id="stock_level"
                                type="number"
                                value={formData.stock_level}
                                onChange={(e) => setFormData({ ...formData, stock_level: Number(e.target.value) })}
                            />
                        </div>

                        <div className="col-span-2 border-t pt-4">
                            <h3 className="text-sm font-semibold mb-3">Cost Breakdown (Landed Cost Calculator)</h3>
                        </div>

                        <div>
                            <Label htmlFor="purchase_price">Purchase Price (Rs.)</Label>
                            <Input
                                id="purchase_price"
                                type="number"
                                value={formData.purchase_price}
                                onChange={(e) => setFormData({ ...formData, purchase_price: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="shipping_cost">China Shipping (Rs.)</Label>
                            <Input
                                id="shipping_cost"
                                type="number"
                                value={formData.shipping_cost}
                                onChange={(e) => setFormData({ ...formData, shipping_cost: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="packaging_cost">Packaging Cost (Rs.)</Label>
                            <Input
                                id="packaging_cost"
                                type="number"
                                value={formData.packaging_cost}
                                onChange={(e) => setFormData({ ...formData, packaging_cost: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <Label className="text-emerald-600 font-semibold">Landed Cost (Auto)</Label>
                            <div className="h-10 px-3 py-2 rounded-md border bg-emerald-50 flex items-center font-semibold text-emerald-700">
                                Rs. {landedCost.toLocaleString()}
                            </div>
                        </div>

                        <div className="col-span-2 border-t pt-4">
                            <h3 className="text-sm font-semibold mb-3">Pricing & Margins</h3>
                        </div>

                        <div>
                            <Label htmlFor="retail_price">Retail Price (Rs.)</Label>
                            <Input
                                id="retail_price"
                                type="number"
                                value={formData.retail_price}
                                onChange={(e) => setFormData({ ...formData, retail_price: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <Label className={Number(marginPercent) < 20 ? 'text-red-600' : 'text-emerald-600'}>
                                Profit Margin %
                            </Label>
                            <div className={`h-10 px-3 py-2 rounded-md border flex items-center font-semibold ${Number(marginPercent) < 20 ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'
                                }`}>
                                {marginPercent}%
                            </div>
                        </div>

                        <div className="col-span-2">
                            <Label htmlFor="alert_threshold">Alert Threshold (Low Stock Warning)</Label>
                            <Input
                                id="alert_threshold"
                                type="number"
                                value={formData.alert_threshold}
                                onChange={(e) => setFormData({ ...formData, alert_threshold: Number(e.target.value) })}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                You'll be alerted when stock falls below this level
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" variant="emerald">
                            {product ? 'Update Product' : 'Add Product'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
