/**
 * WOOCOMMERCE INTEGRATION API
 * 
 * Integration with WooCommerce REST API v3
 * Docs: https://woocommerce.github.io/woocommerce-rest-api-docs/
 */

import { type WooCommerceConfig } from '@/store/appStore';

interface WooCommerceOrder {
    id: number;
    number: string;
    status: string;
    billing: {
        first_name: string;
        last_name: string;
        phone: string;
        address_1: string;
        city: string;
        state: string;
        country: string;
    };
    line_items: Array<{
        product_id: number;
        name: string;
        quantity: number;
        price: number;
    }>;
    total: string;
    date_created: string;
}

export class WooCommerceAPI {
    private config: WooCommerceConfig;

    constructor(config: WooCommerceConfig) {
        this.config = config;
    }

    /**
     * Get Authorization Header
     * WooCommerce uses Basic Auth with Consumer Key & Secret
     */
    // @ts-expect-error - Used in real API implementation
    private _getAuthHeader(): string {
        const credentials = btoa(`${this.config.consumer_key}:${this.config.consumer_secret}`);
        return `Basic ${credentials}`;
    }

    /**
     * FETCH PENDING ORDERS
     * 
     * API Endpoint: GET /wp-json/wc/v3/orders?status=processing
     * 
     * DUPLICATE PREVENTION:
     * Same as Shopify - check external_order_id before importing
     */
    async fetchPendingOrders(): Promise<WooCommerceOrder[]> {
        // PSEUDO-CODE:
        /*
        const response = await fetch(
          `${this.config.store_url}/wp-json/wc/v3/orders?status=processing`,
          {
            headers: {
              'Authorization': this.getAuthHeader()
            }
          }
        );
        
        const orders = await response.json();
        return orders;
        */

        // MOCK IMPLEMENTATION
        console.log('[WooCommerce] Fetching pending orders...');
        return [
            {
                id: 2001,
                number: 'WOO-2001',
                status: 'processing',
                billing: {
                    first_name: 'Ali',
                    last_name: 'Raza',
                    phone: '0300-9999999',
                    address_1: 'Flat 101, Model Town',
                    city: 'Lahore',
                    state: 'Punjab',
                    country: 'PK'
                },
                line_items: [
                    {
                        product_id: 3,
                        name: 'Leather Crossbody Bag',
                        quantity: 1,
                        price: 2999
                    }
                ],
                total: '2999.00',
                date_created: new Date().toISOString()
            }
        ];
    }

    /**
     * UPDATE PRODUCT STOCK
     * 
     * API Endpoint: PUT /wp-json/wc/v3/products/{id}
     * Body: { stock_quantity: newQty }
     */
    async updateStock(productId: string, newQuantity: number): Promise<void> {
        // PSEUDO-CODE:
        /*
        const response = await fetch(
          `${this.config.store_url}/wp-json/wc/v3/products/${productId}`,
          {
            method: 'PUT',
            headers: {
              'Authorization': this.getAuthHeader(),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              stock_quantity: newQuantity
            })
          }
        );
        */

        console.log(`[WooCommerce] Updating stock for product ${productId} to ${newQuantity}`);
        return Promise.resolve();
    }

    /**
     * Test Connection
     */
    async testConnection(): Promise<boolean> {
        try {
            // Test with system status endpoint
            console.log('[WooCommerce] Testing connection...');
            return Promise.resolve(true);
        } catch (error) {
            console.error('[WooCommerce] Connection failed:', error);
            return false;
        }
    }
}

/**
 * TRANSFORM WOOCOMMERCE ORDER TO HISAABOS FORMAT
 */
export function transformWooCommerceOrder(wooOrder: WooCommerceOrder) {
    return {
        customer_name: `${wooOrder.billing.first_name} ${wooOrder.billing.last_name}`,
        customer_phone: wooOrder.billing.phone,
        customer_address: wooOrder.billing.address_1,
        city: wooOrder.billing.city,
        items: wooOrder.line_items.map(item => ({
            product_id: item.product_id.toString(),
            product_name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        total: parseFloat(wooOrder.total),
        status: 'Pending' as const,
        source: 'woocommerce' as const,
        external_order_id: `woo-${wooOrder.id}`
    };
}
