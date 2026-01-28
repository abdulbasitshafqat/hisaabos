import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductFormDialog } from '@/components/ProductFormDialog';
import { Package, PlusCircle, AlertTriangle, Pencil, Trash2 } from 'lucide-react';

export function Inventory() {
    const { products, deleteProduct } = useAppStore();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<typeof products[0] | undefined>();

    const lowStockProducts = products.filter(p => p.stock_level <= p.alert_threshold);

    const handleEdit = (product: typeof products[0]) => {
        setEditingProduct(product);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEditingProduct(undefined);
    };

    const calculateMargin = (retail: number, landed: number) => {
        if (retail === 0) return 0;
        return ((retail - landed) / retail * 100).toFixed(1);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Smart Inventory Engine</h2>
                    <p className="text-muted-foreground">Manage stock with landed cost analysis</p>
                </div>
                <Button
                    variant="emerald"
                    className="gap-2"
                    onClick={() => setDialogOpen(true)}
                >
                    <PlusCircle className="w-4 h-4" />
                    Add Product
                </Button>
            </div>

            {lowStockProducts.length > 0 && (
                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-600">
                            <AlertTriangle className="w-5 h-5" />
                            Low Stock Alert ({lowStockProducts.length} items)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {lowStockProducts.map(p => (
                                <div key={p.id} className="flex items-center justify-between text-sm">
                                    <span className="font-medium">{p.name}</span>
                                    <span className="text-orange-600">Only {p.stock_level} units left!</span>
                                </div>
                            ))}
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
                                    <th className="px-4 py-3 text-left text-sm font-semibold">SKU</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold">Product Name</th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold">Landed Cost</th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold">Retail Price</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold">Margin %</th>
                                    <th className="px-4 py-3 text-center text-sm font-semibold">Stock</th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                                            <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                            <p>No products yet. Click "Add Product" to get started.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => {
                                        const margin = calculateMargin(product.retail_price, product.landed_cost);
                                        const isLowStock = product.stock_level <= product.alert_threshold;

                                        return (
                                            <tr key={product.id} className="border-b hover:bg-slate-50">
                                                <td className="px-4 py-3 text-sm font-mono text-slate-600">{product.sku}</td>
                                                <td className="px-4 py-3">
                                                    <div>
                                                        <div className="font-medium">{product.name}</div>
                                                        {product.category && (
                                                            <div className="text-xs text-muted-foreground">{product.category}</div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-right text-sm">
                                                    <div className="font-medium">Rs. {product.landed_cost.toLocaleString()}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        ({product.purchase_price} + {product.shipping_cost} + {product.packaging_cost})
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-right font-semibold">
                                                    Rs. {product.retail_price.toLocaleString()}
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${Number(margin) >= 40 ? 'bg-emerald-100 text-emerald-800' :
                                                            Number(margin) >= 20 ? 'bg-yellow-100 text-yellow-800' :
                                                                'bg-red-100 text-red-800'
                                                        }`}>
                                                        {margin}%
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <div className={`font-medium ${isLowStock ? 'text-orange-600' : ''}`}>
                                                        {product.stock_level}
                                                        {isLowStock && (
                                                            <AlertTriangle className="w-4 h-4 inline ml-1" />
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => handleEdit(product)}
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => {
                                                                if (confirm(`Delete ${product.name}?`)) {
                                                                    deleteProduct(product.id);
                                                                }
                                                            }}
                                                        >
                                                            <Trash2 className="w-4 h-4 text-red-600" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <ProductFormDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                product={editingProduct}
            />
        </div>
    );
}
