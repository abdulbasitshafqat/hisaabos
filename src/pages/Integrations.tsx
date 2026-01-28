import { useState } from 'react';
import { useAppStore, type ShopifyConfig, type WooCommerceConfig, type CourierConfig } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShopifyAPI, transformShopifyOrder, checkDuplicateOrder } from '@/lib/api/shopify';
import { WooCommerceAPI, transformWooCommerceOrder } from '@/lib/api/woocommerce';
import { Store, Package, Truck, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

export function Integrations() {
    const { integrations, updateIntegrations, orders, addOrder, people, addPerson, checkOrderRisk } = useAppStore();
    const [shopifyConfig, setShopifyConfig] = useState<ShopifyConfig>(
        integrations.shopify || { shop_url: '', api_key: '', access_token: '', enabled: false }
    );
    const [wooConfig, setWooConfig] = useState<WooCommerceConfig>(
        integrations.woocommerce || { store_url: '', consumer_key: '', consumer_secret: '', enabled: false }
    );
    const [courierConfig, setCourierConfig] = useState<CourierConfig>(integrations.courier || {});
    const [syncing, setSyncing] = useState(false);
    const [syncStatus, setSyncStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleSaveShopify = () => {
        updateIntegrations({ shopify: shopifyConfig });
        alert('Shopify settings saved!');
    };

    const handleSaveWooCommerce = () => {
        updateIntegrations({ woocommerce: wooConfig });
        alert('WooCommerce settings saved!');
    };

    const handleSaveCourier = () => {
        updateIntegrations({ courier: courierConfig });
        alert('Courier settings saved!');
    };

    const handleSyncShopify = async () => {
        if (!shopifyConfig.enabled || !shopifyConfig.shop_url || !shopifyConfig.access_token) {
            setSyncStatus({ type: 'error', message: 'Please configure Shopify credentials first' });
            return;
        }

        setSyncing(true);
        setSyncStatus(null);

        try {
            const api = new ShopifyAPI(shopifyConfig);
            const shopifyOrders = await api.fetchUnfulfilledOrders();

            let imported = 0;
            let skipped = 0;

            for (const shopifyOrder of shopifyOrders) {
                // Check for duplicates
                if (checkDuplicateOrder(shopifyOrder.id, orders)) {
                    skipped++;
                    continue;
                }

                // Transform order
                const orderData = transformShopifyOrder(shopifyOrder);

                // Check if customer exists
                let customer = people.find(p => p.phone === shopifyOrder.customer.phone);
                if (!customer) {
                    // Create new customer
                    addPerson({
                        name: `${shopifyOrder.customer.first_name} ${shopifyOrder.customer.last_name}`,
                        phone: shopifyOrder.customer.phone,
                        type: 'customer'
                    });
                }

                // Check RTO risk
                const riskCheck = checkOrderRisk(shopifyOrder.customer.phone);

                // Add order
                addOrder({
                    ...orderData,
                    is_high_risk: riskCheck.isHighRisk,
                    risk_reason: riskCheck.reason
                });

                imported++;
            }

            setSyncStatus({
                type: 'success',
                message: `✅ Sync complete! Imported: ${imported}, Skipped (duplicates): ${skipped}`
            });

            // Update last sync time
            updateIntegrations({
                shopify: { ...shopifyConfig, last_sync: new Date().toISOString() }
            });
        } catch (error) {
            setSyncStatus({
                type: 'error',
                message: `❌ Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            });
        } finally {
            setSyncing(false);
        }
    };

    const handleSyncWooCommerce = async () => {
        if (!wooConfig.enabled || !wooConfig.store_url) {
            setSyncStatus({ type: 'error', message: 'Please configure WooCommerce credentials first' });
            return;
        }

        setSyncing(true);
        setSyncStatus(null);

        try {
            const api = new WooCommerceAPI(wooConfig);
            const wooOrders = await api.fetchPendingOrders();

            let imported = 0;
            let skipped = 0;

            for (const wooOrder of wooOrders) {
                const externalId = `woo-${wooOrder.id}`;

                if (checkDuplicateOrder(externalId, orders)) {
                    skipped++;
                    continue;
                }

                const orderData = transformWooCommerceOrder(wooOrder);

                let customer = people.find(p => p.phone === wooOrder.billing.phone);
                if (!customer) {
                    addPerson({
                        name: `${wooOrder.billing.first_name} ${wooOrder.billing.last_name}`,
                        phone: wooOrder.billing.phone,
                        type: 'customer'
                    });
                }

                const riskCheck = checkOrderRisk(wooOrder.billing.phone);

                addOrder({
                    ...orderData,
                    is_high_risk: riskCheck.isHighRisk,
                    risk_reason: riskCheck.reason
                });

                imported++;
            }

            setSyncStatus({
                type: 'success',
                message: `✅ Sync complete! Imported: ${imported}, Skipped (duplicates): ${skipped}`
            });

            updateIntegrations({
                woocommerce: { ...wooConfig, last_sync: new Date().toISOString() }
            });
        } catch (error) {
            setSyncStatus({
                type: 'error',
                message: `❌ Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            });
        } finally {
            setSyncing(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
                <p className="text-muted-foreground">Connect your e-commerce stores and courier services</p>
            </div>

            {syncStatus && (
                <Card className={`border-l-4 ${syncStatus.type === 'success' ? 'border-l-emerald-500 bg-emerald-50' : 'border-l-red-500 bg-red-50'
                    }`}>
                    <CardContent className="p-4 flex items-center gap-3">
                        {syncStatus.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                        ) : (
                            <AlertCircle className="w-5 h-5 text-red-600" />
                        )}
                        <p className="text-sm font-medium">{syncStatus.message}</p>
                    </CardContent>
                </Card>
            )}

            {/* Shopify Integration */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Store className="w-5 h-5 text-emerald-600" />
                        Shopify Integration
                    </CardTitle>
                    <CardDescription>
                        Connect your Shopify store to sync orders automatically
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="shopify_url">Shop URL</Label>
                            <Input
                                id="shopify_url"
                                placeholder="your-store.myshopify.com"
                                value={shopifyConfig.shop_url}
                                onChange={(e) => setShopifyConfig({ ...shopifyConfig, shop_url: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="shopify_key">API Key</Label>
                            <Input
                                id="shopify_key"
                                placeholder="shpat_xxxxxxxxxxxxx"
                                value={shopifyConfig.api_key}
                                onChange={(e) => setShopifyConfig({ ...shopifyConfig, api_key: e.target.value })}
                            />
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="shopify_token">Access Token</Label>
                            <Input
                                id="shopify_token"
                                type="password"
                                placeholder="shpat_xxxxxxxxxxxxx"
                                value={shopifyConfig.access_token}
                                onChange={(e) => setShopifyConfig({ ...shopifyConfig, access_token: e.target.value })}
                            />
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="shopify_enabled"
                                checked={shopifyConfig.enabled}
                                onChange={(e) => setShopifyConfig({ ...shopifyConfig, enabled: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <Label htmlFor="shopify_enabled" className="cursor-pointer">Enable Shopify Integration</Label>
                        </div>
                    </div>
                    {shopifyConfig.last_sync && (
                        <p className="text-xs text-muted-foreground">
                            Last synced: {new Date(shopifyConfig.last_sync).toLocaleString()}
                        </p>
                    )}
                    <div className="flex gap-2">
                        <Button onClick={handleSaveShopify} variant="outline">
                            Save Settings
                        </Button>
                        <Button onClick={handleSyncShopify} variant="emerald" disabled={syncing} className="gap-2">
                            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                            {syncing ? 'Syncing...' : 'Sync Orders Now'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* WooCommerce Integration */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-blue-600" />
                        WooCommerce Integration
                    </CardTitle>
                    <CardDescription>
                        Connect your WooCommerce store to import orders
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <Label htmlFor="woo_url">Store URL</Label>
                            <Input
                                id="woo_url"
                                placeholder="https://yourstore.com"
                                value={wooConfig.store_url}
                                onChange={(e) => setWooConfig({ ...wooConfig, store_url: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="woo_key">Consumer Key</Label>
                            <Input
                                id="woo_key"
                                placeholder="ck_xxxxxxxxxxxxxxxx"
                                value={wooConfig.consumer_key}
                                onChange={(e) => setWooConfig({ ...wooConfig, consumer_key: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="woo_secret">Consumer Secret</Label>
                            <Input
                                id="woo_secret"
                                type="password"
                                placeholder="cs_xxxxxxxxxxxxxxxx"
                                value={wooConfig.consumer_secret}
                                onChange={(e) => setWooConfig({ ...wooConfig, consumer_secret: e.target.value })}
                            />
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="woo_enabled"
                                checked={wooConfig.enabled}
                                onChange={(e) => setWooConfig({ ...wooConfig, enabled: e.target.checked })}
                                className="w-4 h-4"
                            />
                            <Label htmlFor="woo_enabled" className="cursor-pointer">Enable WooCommerce Integration</Label>
                        </div>
                    </div>
                    {wooConfig.last_sync && (
                        <p className="text-xs text-muted-foreground">
                            Last synced: {new Date(wooConfig.last_sync).toLocaleString()}
                        </p>
                    )}
                    <div className="flex gap-2">
                        <Button onClick={handleSaveWooCommerce} variant="outline">
                            Save Settings
                        </Button>
                        <Button onClick={handleSyncWooCommerce} variant="emerald" disabled={syncing} className="gap-2">
                            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                            {syncing ? 'Syncing...' : 'Sync Orders Now'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Courier Configuration */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-orange-600" />
                        Pakistani Courier Services
                    </CardTitle>
                    <CardDescription>
                        Configure API keys for bulk booking and label generation
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="trax_key">Trax API Key</Label>
                            <Input
                                id="trax_key"
                                type="password"
                                placeholder="Enter Trax API key"
                                value={courierConfig.trax_api_key || ''}
                                onChange={(e) => setCourierConfig({ ...courierConfig, trax_api_key: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="leopards_key">Leopards API Key</Label>
                            <Input
                                id="leopards_key"
                                type="password"
                                placeholder="Enter Leopards API key"
                                value={courierConfig.leopards_api_key || ''}
                                onChange={(e) => setCourierConfig({ ...courierConfig, leopards_api_key: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="tcs_key">TCS API Key</Label>
                            <Input
                                id="tcs_key"
                                type="password"
                                placeholder="Enter TCS API key"
                                value={courierConfig.tcs_api_key || ''}
                                onChange={(e) => setCourierConfig({ ...courierConfig, tcs_api_key: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="postex_key">PostEx API Key</Label>
                            <Input
                                id="postex_key"
                                type="password"
                                placeholder="Enter PostEx API key"
                                value={courierConfig.postex_api_key || ''}
                                onChange={(e) => setCourierConfig({ ...courierConfig, postex_api_key: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="mp_key">M&P API Key</Label>
                            <Input
                                id="mp_key"
                                type="password"
                                placeholder="Enter M&P API key"
                                value={courierConfig.mp_api_key || ''}
                                onChange={(e) => setCourierConfig({ ...courierConfig, mp_api_key: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                        <h3 className="font-semibold mb-3">PostEx Factoring Settings</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="postex_factoring"
                                    checked={courierConfig.postex_factoring_enabled || false}
                                    onChange={(e) => setCourierConfig({
                                        ...courierConfig,
                                        postex_factoring_enabled: e.target.checked
                                    })}
                                    className="w-4 h-4"
                                />
                                <Label htmlFor="postex_factoring" className="cursor-pointer">
                                    Enable PostEx Upfront Payment (Factoring)
                                </Label>
                            </div>
                            {courierConfig.postex_factoring_enabled && (
                                <div className="ml-6">
                                    <Label htmlFor="postex_fee">Service Fee (%)</Label>
                                    <Input
                                        id="postex_fee"
                                        type="number"
                                        step="0.1"
                                        placeholder="3.0"
                                        value={courierConfig.postex_service_fee || 3}
                                        onChange={(e) => setCourierConfig({
                                            ...courierConfig,
                                            postex_service_fee: parseFloat(e.target.value)
                                        })}
                                        className="w-32"
                                    />
                                    <p className="text-xs text-muted-foreground mt-1">
                                        PostEx deducts this % when paying upfront
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <Button onClick={handleSaveCourier} variant="emerald">
                        Save Courier Settings
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
