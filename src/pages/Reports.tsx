import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Package, MapPin, Briefcase } from 'lucide-react';

const COLORS = ['#10b981', '#0f172a', '#f59e0b', '#ef4444', '#8b5cf6'];

export function Reports() {
    const { products, orders, expenses, projects, getProjectProfitLoss } = useAppStore();
    const [selectedProjectId, setSelectedProjectId] = useState<string>('');

    // Calculate P&L
    const revenue = orders
        .filter(o => o.status === 'Cash Received' || o.status === 'Delivered')
        .reduce((sum, order) => sum + order.total, 0);

    const cogs = orders
        .filter(o => o.status === 'Cash Received' || o.status === 'Delivered')
        .reduce((sum, order) => {
            return sum + order.items.reduce((itemSum, item) => {
                const product = products.find(p => p.id === item.product_id);
                return itemSum + (product?.landed_cost || 0) * item.quantity;
            }, 0);
        }, 0);

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const netProfit = revenue - cogs - totalExpenses;

    // Calculate top-selling products
    const productSales = products.map(product => {
        const totalSold = orders
            .filter(o => o.status === 'Cash Received' || o.status === 'Delivered')
            .reduce((sum, order) => {
                const item = order.items.find(i => i.product_id === product.id);
                return sum + (item?.quantity || 0);
            }, 0);

        return {
            name: product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name,
            sold: totalSold
        };
    }).filter(p => p.sold > 0).sort((a, b) => b.sold - a.sold).slice(0, 5);

    // Calculate city-wise sales
    const citySales = orders
        .filter(o => o.status === 'Cash Received' || o.status === 'Delivered')
        .reduce((acc, order) => {
            acc[order.city] = (acc[order.city] || 0) + order.total;
            return acc;
        }, {} as Record<string, number>);

    const citySalesData = Object.entries(citySales).map(([city, value]) => ({
        name: city,
        value
    }));

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Financial Reports</h2>
                <p className="text-muted-foreground">Comprehensive business analytics</p>
            </div>

            {/* P&L Report */}
            <Card className="border-l-4 border-l-emerald-500">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        Profit & Loss Statement
                    </CardTitle>
                    <CardDescription>Financial performance overview</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                            <span className="font-medium">Total Revenue</span>
                            <span className="font-semibold text-lg">Rs. {revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                            <span className="font-medium">Cost of Goods Sold (COGS)</span>
                            <span className="font-semibold text-lg text-red-600">- Rs. {cogs.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                            <span className="font-medium">Operating Expenses</span>
                            <span className="font-semibold text-lg text-red-600">- Rs. {totalExpenses.toLocaleString()}</span>
                        </div>
                        <div className="border-t-2 border-slate-300 pt-3">
                            <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-lg">
                                <span className="font-bold text-lg">Net Profit</span>
                                <span className={`font-bold text-2xl ${netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                    Rs. {netProfit.toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                            <p>Profit Margin: {revenue > 0 ? ((netProfit / revenue) * 100).toFixed(1) : '0'}%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Selling Products */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="w-5 h-5 text-slate-600" />
                            Top Selling Products
                        </CardTitle>
                        <CardDescription>By quantity sold</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {productSales.length === 0 ? (
                            <div className="py-12 text-center text-muted-foreground">
                                <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p>No sales data available yet</p>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={productSales}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                    />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip />
                                    <Bar dataKey="sold" fill="#10b981" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                {/* City-wise Sales */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-slate-600" />
                            City-wise Sales Distribution
                        </CardTitle>
                        <CardDescription>Revenue by location</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {citySalesData.length === 0 ? (
                            <div className="py-12 text-center text-muted-foreground">
                                <MapPin className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                <p>No location data available yet</p>
                            </div>
                        ) : (
                            <div className="flex items-center gap-8">
                                <ResponsiveContainer width="60%" height={250}>
                                    <PieChart>
                                        <Pie
                                            data={citySalesData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {citySalesData.map((_entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number | undefined) => value ? `Rs. ${value.toLocaleString()}` : 'N/A'} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="flex-1 space-y-2">
                                    {citySalesData.map((city, index) => (
                                        <div key={city.name} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                                />
                                                <span className="font-medium">{city.name}</span>
                                            </div>
                                            <span className="text-muted-foreground">
                                                Rs. {city.value.toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Project P&L Report */}
            {projects.length > 0 && (
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Briefcase className="w-5 h-5" />
                            <CardTitle>Project Profitability</CardTitle>
                        </div>
                        <CardDescription>
                            Track income and expenses per project to see real-time profitability
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Select Project:</label>
                            <select
                                value={selectedProjectId}
                                onChange={(e) => setSelectedProjectId(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md bg-white"
                            >
                                <option value="">-- Choose a project --</option>
                                {projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name} ({project.client_name})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedProjectId && (() => {
                            const project = projects.find(p => p.id === selectedProjectId);
                            const profitLoss = getProjectProfitLoss(selectedProjectId);
                            const profitMargin = profitLoss.income > 0
                                ? ((profitLoss.profit / profitLoss.income) * 100).toFixed(1)
                                : '0.0';

                            // Get orders and expenses for this project
                            const projectOrders = orders.filter(o => o.project_id === selectedProjectId);
                            const projectExpenses = expenses.filter(e => e.project_id === selectedProjectId);

                            return (
                                <div className="space-y-4 border-t pt-4">
                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <h3 className="font-semibold text-lg mb-2">{project?.name}</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-muted-foreground">Client:</span>
                                                <p className="font-medium">{project?.client_name}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Status:</span>
                                                <p className="font-medium">
                                                    {project?.status === 'active' ? '🟢 Active' :
                                                        project?.status === 'completed' ? '✅ Completed' :
                                                            '⏸️ On Hold'}
                                                </p>
                                            </div>
                                            {project?.budget && (
                                                <div>
                                                    <span className="text-muted-foreground">Budget:</span>
                                                    <p className="font-medium">Rs. {project.budget.toLocaleString()}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Financial Summary */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                                            <p className="text-sm text-muted-foreground mb-1">Total Income</p>
                                            <p className="text-2xl font-bold text-emerald-600">
                                                Rs. {profitLoss.income.toLocaleString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                from {projectOrders.length} order(s)
                                            </p>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                                            <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                                            <p className="text-2xl font-bold text-red-600">
                                                Rs. {profitLoss.expenses.toLocaleString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                from {projectExpenses.length} expense(s)
                                            </p>
                                        </div>
                                        <div className={`p-4 rounded-lg border ${profitLoss.profit >= 0
                                            ? 'bg-blue-50 border-blue-200'
                                            : 'bg-orange-50 border-orange-200'
                                            }`}>
                                            <p className="text-sm text-muted-foreground mb-1">Net Profit</p>
                                            <p className={`text-2xl font-bold ${profitLoss.profit >= 0 ? 'text-blue-600' : 'text-orange-600'
                                                }`}>
                                                Rs. {profitLoss.profit.toLocaleString()}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {profitMargin}% profit margin
                                            </p>
                                        </div>
                                    </div>

                                    {/* Order List */}
                                    {projectOrders.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold mb-2">Orders Tagged to This Project:</h4>
                                            <div className="border rounded-lg overflow-hidden">
                                                <table className="w-full text-sm">
                                                    <thead className="bg-slate-50">
                                                        <tr>
                                                            <th className="text-left p-2">Invoice</th>
                                                            <th className="text-left p-2">Customer</th>
                                                            <th className="text-left p-2">Status</th>
                                                            <th className="text-right p-2">Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {projectOrders.map((order) => (
                                                            <tr key={order.id} className="border-t">
                                                                <td className="p-2">{order.invoice_number}</td>
                                                                <td className="p-2">{order.customer_name}</td>
                                                                <td className="p-2">
                                                                    <span className="text-xs px-2 py-1 bg-slate-100 rounded">
                                                                        {order.status}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2 text-right font-medium">
                                                                    Rs. {order.total.toLocaleString()}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}

                                    {/* Expense List */}
                                    {projectExpenses.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold mb-2">Expenses Tagged to This Project:</h4>
                                            <div className="border rounded-lg overflow-hidden">
                                                <table className="w-full text-sm">
                                                    <thead className="bg-slate-50">
                                                        <tr>
                                                            <th className="text-left p-2">Date</th>
                                                            <th className="text-left p-2">Description</th>
                                                            <th className="text-left p-2">Category</th>
                                                            <th className="text-right p-2">Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {projectExpenses.map((expense) => (
                                                            <tr key={expense.id} className="border-t">
                                                                <td className="p-2">
                                                                    {new Date(expense.date).toLocaleDateString('en-GB')}
                                                                </td>
                                                                <td className="p-2">{expense.description}</td>
                                                                <td className="p-2">
                                                                    <span className="text-xs px-2 py-1 bg-slate-100 rounded">
                                                                        {expense.category}
                                                                    </span>
                                                                </td>
                                                                <td className="p-2 text-right font-medium">
                                                                    Rs. {expense.amount.toLocaleString()}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}

                                    {projectOrders.length === 0 && projectExpenses.length === 0 && (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <Briefcase className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                            <p>No orders or expenses tagged to this project yet.</p>
                                            <p className="text-sm">
                                                Start assigning orders and expenses to see P&L breakdown.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })()}

                        {!selectedProjectId && (
                            <div className="text-center py-8 text-muted-foreground">
                                <Briefcase className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                <p>Select a project to view its profitability report</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
