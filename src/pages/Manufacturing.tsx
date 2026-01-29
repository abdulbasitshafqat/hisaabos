import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Factory, Plus, Zap, Package, Clock, Settings } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

export function Manufacturing() {
    const [activeTab, setActiveTab] = useState<'orders' | 'bom'>('orders');

    // Mock Data for UI demonstration
    const productionOrders = [
        { id: 'MO-2024-001', product: 'Cotton Shirt (L, Blue)', quantity: 500, status: 'In Progress', progress: 65, dueDate: '2024-02-15' },
        { id: 'MO-2024-002', product: 'Denim Jeans (32, Black)', quantity: 200, status: 'Pending', progress: 0, dueDate: '2024-02-20' },
        { id: 'MO-2024-003', product: 'Silk Scarf (Red)', quantity: 150, status: 'Completed', progress: 100, dueDate: '2024-02-10' },
    ];

    const boms = [
        { name: 'Standard Cotton Shirt', variants: 5, cost: 450, materials: 4 },
        { name: 'Denim Jeans Premium', variants: 3, cost: 850, materials: 6 },
        { name: 'Leather Wallet', variants: 2, cost: 300, materials: 3 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Manufacturing</h1>
                    <p className="text-slate-500 mt-1">Manage production cycles, recipes, and work centers.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Settings className="w-4 h-4 mr-2" /> Settings</Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="w-4 h-4 mr-2" /> New Production Order
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                        <Factory className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-slate-500">3 due this week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Production Efficency</CardTitle>
                        <Zap className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">94%</div>
                        <p className="text-xs text-slate-500">+2% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Raw Materials</CardTitle>
                        <Package className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Healthy</div>
                        <p className="text-xs text-slate-500">2 items low stock</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Cycle Time</CardTitle>
                        <Clock className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3.2 Days</div>
                        <p className="text-xs text-slate-500">-4h from average</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs & Content */}
            <div className="flex gap-4 border-b border-slate-200 mb-6">
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'orders' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Production Orders
                </button>
                <button
                    onClick={() => setActiveTab('bom')}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'bom' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Bill of Materials (Recipes)
                </button>
            </div>

            {activeTab === 'orders' ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Current Production Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {productionOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.id}</TableCell>
                                        <TableCell>{order.product}</TableCell>
                                        <TableCell>{order.quantity}</TableCell>
                                        <TableCell>
                                            <div className="w-full bg-slate-100 rounded-full h-2.5">
                                                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${order.progress}%` }}></div>
                                            </div>
                                            <span className="text-xs text-slate-500 mt-1 inline-block">{order.progress}%</span>
                                        </TableCell>
                                        <TableCell>{order.dueDate}</TableCell>
                                        <TableCell>
                                            <Badge variant={order.status === 'Completed' ? 'default' : order.status === 'In Progress' ? 'secondary' : 'outline'}
                                                className={order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100' : order.status === 'In Progress' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : ''}
                                            >
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">Manage</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {boms.map((bom, index) => (
                        <Card key={index} className="hover:border-emerald-600 transition-colors cursor-pointer">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-bold text-slate-800">{bom.name}</CardTitle>
                                <Settings className="w-4 h-4 text-slate-400" />
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Estimated Cost</span>
                                        <span className="font-bold text-emerald-600">Rs. {bom.cost}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Raw Materials</span>
                                        <span className="font-medium">{bom.materials} Items</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Variant Recipes</span>
                                        <Badge variant="outline">{bom.variants}</Badge>
                                    </div>
                                    <Button variant="outline" className="w-full mt-4">Edit Recipe</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 text-slate-400 hover:border-emerald-600 hover:text-emerald-600 transition-colors cursor-pointer min-h-[200px]">
                        <Plus className="w-8 h-8 mb-2" />
                        <span className="font-medium">Create New Recipe</span>
                    </Card>
                </div>
            )}
        </div>
    );
}
