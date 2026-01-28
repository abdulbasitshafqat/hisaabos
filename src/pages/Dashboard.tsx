import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TrendingUp, AlertCircle, DollarSign, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AddTransactionDialog } from '@/components/AddTransactionDialog';
import { useAppStore } from '@/store/appStore';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

const data = [
    { name: '1', revenue: 4000, profit: 2400 },
    { name: '5', revenue: 3000, profit: 1398 },
    { name: '10', revenue: 2000, profit: 9800 },
    { name: '15', revenue: 2780, profit: 3908 },
    { name: '20', revenue: 1890, profit: 4800 },
    { name: '25', revenue: 2390, profit: 3800 },
    { name: '30', revenue: 3490, profit: 4300 },
];

export function Dashboard() {
    const { orders, products, expenses, addAdSpend, getTotalAdSpend } = useAppStore();
    const [adSpendDialogOpen, setAdSpendDialogOpen] = useState(false);
    const [adSpendData, setAdSpendData] = useState({
        platform: 'Facebook' as 'Facebook' | 'TikTok' | 'Google' | 'Other',
        amount: 0,
        notes: ''
    });

    // Calculate metrics
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

    // NEW: Include Ad Spend in calculation
    const totalAdSpend = getTotalAdSpend();
    const netProfit = revenue - cogs - totalExpenses - totalAdSpend;

    const cashReceived = orders
        .filter(o => o.status === 'Cash Received')
        .reduce((sum, order) => sum + order.total, 0);

    const cashStuck = orders
        .filter(o => o.status === 'Delivered' || o.status === 'In Transit')
        .reduce((sum, order) => sum + order.total, 0);

    const returnedOrders = orders.filter(o => o.status === 'Returned (RTO)').length;
    const totalOrders = orders.length;
    const returnRate = totalOrders > 0 ? ((returnedOrders / totalOrders) * 100).toFixed(1) : '0';

    // Recent activity
    const recentOrders = [...orders]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 3);

    const handleAddAdSpend = () => {
        if (adSpendData.amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        addAdSpend({
            date: new Date().toISOString().split('T')[0],
            platform: adSpendData.platform,
            amount: adSpendData.amount,
            notes: adSpendData.notes
        });

        setAdSpendDialogOpen(false);
        setAdSpendData({
            platform: 'Facebook',
            amount: 0,
            notes: ''
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">CFO Command Center</h2>
                    <div className="text-sm text-muted-foreground">Live financial dashboard</div>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setAdSpendDialogOpen(true)}
                        className="gap-2"
                    >
                        <TrendingDown className="w-4 h-4" />
                        Log Ad Spend
                    </Button>
                    <AddTransactionDialog />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-l-4 border-l-emerald-500 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">True Net Profit</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Rs. {netProfit.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            After COGS, Expenses & Ad Spend
                        </p>
                        {totalAdSpend > 0 && (
                            <p className="text-xs text-orange-600 mt-1">
                                Marketing: -Rs. {totalAdSpend.toLocaleString()}
                            </p>
                        )}
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Cash Reconciliation</CardTitle>
                        <DollarSign className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-2xl font-bold">Rs. {cashReceived.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">In Hand</p>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-semibold text-orange-500">Rs. {cashStuck.toLocaleString()}</div>
                                <p className="text-xs text-muted-foreground">Stuck with Courier</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-rose-500 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Return Rate %</CardTitle>
                        <AlertCircle className="h-4 w-4 text-rose-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{returnRate}%</div>
                        <p className="text-xs text-muted-foreground">
                            {returnedOrders} out of {totalOrders} orders
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ad Spend (Total)</CardTitle>
                        <TrendingDown className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600">Rs. {totalAdSpend.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            Total marketing investment
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-7">
                <Card className="col-span-4 shadow-sm">
                    <CardHeader>
                        <CardTitle>Financial Performance</CardTitle>
                        <CardDescription>30-Day Trend: Revenue vs. Net Profit</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `Rs${value}`} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <Tooltip />
                                <Area type="monotone" dataKey="revenue" stroke="#0f172a" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                                <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" name="Net Profit" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="col-span-3 shadow-sm">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest orders and transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {recentOrders.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
                            ) : (
                                recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">{order.invoice_number}</p>
                                            <p className="text-sm text-muted-foreground">{order.customer_name}</p>
                                        </div>
                                        <div className={`ml-auto font-medium ${order.status === 'Cash Received' ? 'text-emerald-600' :
                                                order.status === 'Returned (RTO)' ? 'text-red-600' :
                                                    'text-slate-600'
                                            }`}>
                                            {order.status === 'Returned (RTO)' ? '-' : '+'}Rs. {order.total.toLocaleString()}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Ad Spend Dialog */}
            <Dialog open={adSpendDialogOpen} onOpenChange={setAdSpendDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Log Ad Spend</DialogTitle>
                        <DialogDescription>
                            Track your marketing investment for accurate profitability
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="platform">Platform</Label>
                            <select
                                id="platform"
                                value={adSpendData.platform}
                                onChange={(e) => setAdSpendData({ ...adSpendData, platform: e.target.value as any })}
                                className="w-full mt-1 px-3 py-2 border rounded-md bg-white"
                            >
                                <option value="Facebook">Facebook Ads</option>
                                <option value="TikTok">TikTok Ads</option>
                                <option value="Google">Google Ads</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <Label htmlFor="amount">Amount (Rs.)</Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="5000"
                                value={adSpendData.amount || ''}
                                onChange={(e) => setAdSpendData({ ...adSpendData, amount: parseFloat(e.target.value) || 0 })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="notes">Notes (Optional)</Label>
                            <Input
                                id="notes"
                                placeholder="Campaign name or description"
                                value={adSpendData.notes}
                                onChange={(e) => setAdSpendData({ ...adSpendData, notes: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAdSpendDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="emerald" onClick={handleAddAdSpend}>
                            Add Ad Spend
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
