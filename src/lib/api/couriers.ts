/**
 * PAKISTANI COURIER SERVICES API
 * 
 * Unified interface for Trax, Leopards, TCS, PostEx, M&P
 */

import { type CourierService } from '@/store/appStore';

interface BulkBookingPayload {
    orders: Array<{
        orderId: string;
        customerName: string;
        phone: string;
        address: string;
        city: string;
        amount: number;
        items: string;
    }>;
}

interface BulkBookingResponse {
    success: boolean;
    trackingNumbers: Array<{
        orderId: string;
        trackingId: string;
        cn: string; // Consignment Number
    }>;
    pdfUrl?: string; // Load sheet PDF
}

/**
 * TRAX API
 */
export class TraxAPI {
    // @ts-expect-error - Used in real API implementation
    private _apiKey: string;

    constructor(apiKey: string) {
        this._apiKey = apiKey;
    }

    async bulkBooking(payload: BulkBookingPayload): Promise<BulkBookingResponse> {
        // PSEUDO-CODE:
        /*
        const response = await fetch('https://api.trax.com.pk/api/bookings/bulk', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            shipments: payload.orders.map(order => ({
              service_type: 'Normal',
              consignee_name: order.customerName,
              consignee_phone: order.phone,
              consignee_address: order.address,
              consignee_city_id: getCityId(order.city),
              booking_amount: order.amount,
              order_id: order.orderId,
              items: order.items
            }))
          })
        });
    
        const data = await response.json();
        return {
          success: true,
          trackingNumbers: data.shipments.map(s => ({
            orderId: s.order_id,
            trackingId: s.tracking_number,
            cn: s.cn_number
          })),
          pdfUrl: data.manifest_url
        };
        */

        console.log('[Trax] Creating bulk booking for', payload.orders.length, 'orders');

        // MOCK RESPONSE
        return {
            success: true,
            trackingNumbers: payload.orders.map((order, index) => ({
                orderId: order.orderId,
                trackingId: `TRX-${order.city.toUpperCase()}-${100000 + index}`,
                cn: `CN-TRX-${100000 + index}`
            })),
            pdfUrl: 'https://mock-pdf-url.com/trax-loadsheet.pdf'
        };
    }
}

/**
 * LEOPARDS API
 */
export class LeopardsAPI {
    // @ts-expect-error - Used in real API implementation
    private _apiKey: string;

    constructor(apiKey: string) {
        this._apiKey = apiKey;
    }

    async bulkBooking(payload: BulkBookingPayload): Promise<BulkBookingResponse> {
        console.log('[Leopards] Creating bulk booking for', payload.orders.length, 'orders');

        return {
            success: true,
            trackingNumbers: payload.orders.map((order, index) => ({
                orderId: order.orderId,
                trackingId: `LEO-${order.city.toUpperCase()}-${200000 + index}`,
                cn: `CN-LEO-${200000 + index}`
            })),
            pdfUrl: 'https://mock-pdf-url.com/leopards-loadsheet.pdf'
        };
    }
}

/**
 * TCS API
 */
export class TCSAPI {
    // @ts-expect-error - Used in real API implementation
    private _apiKey: string;

    constructor(apiKey: string) {
        this._apiKey = apiKey;
    }

    async bulkBooking(payload: BulkBookingPayload): Promise<BulkBookingResponse> {
        console.log('[TCS] Creating bulk booking for', payload.orders.length, 'orders');

        return {
            success: true,
            trackingNumbers: payload.orders.map((order, index) => ({
                orderId: order.orderId,
                trackingId: `TCS-${order.city.toUpperCase()}-${300000 + index}`,
                cn: `CN-TCS-${300000 + index}`
            })),
            pdfUrl: 'https://mock-pdf-url.com/tcs-loadsheet.pdf'
        };
    }
}

/**
 * POSTEX API (WITH FACTORING SUPPORT)
 */
export class PostExAPI {
    // @ts-expect-error - Used in real API implementation
    private _apiKey: string;

    constructor(apiKey: string) {
        this._apiKey = apiKey;
    }

    async bulkBooking(
        payload: BulkBookingPayload,
        factoringEnabled: boolean = false
    ): Promise<BulkBookingResponse> {
        console.log('[PostEx] Creating bulk booking for', payload.orders.length, 'orders');
        console.log('[PostEx] Factoring enabled:', factoringEnabled);

        return {
            success: true,
            trackingNumbers: payload.orders.map((order, index) => ({
                orderId: order.orderId,
                trackingId: `PEX-${order.city.toUpperCase()}-${400000 + index}`,
                cn: `CN-PEX-${400000 + index}`
            })),
            pdfUrl: 'https://mock-pdf-url.com/postex-loadsheet.pdf'
        };
    }

    /**
     * Calculate PostEx Factoring Payment
     * They pay upfront but charge a service fee
     */
    calculateFactoringPayment(totalCOD: number, serviceFeePercent: number = 3): {
        upfrontPayment: number;
        serviceFee: number;
        netReceived: number;
    } {
        const serviceFee = (totalCOD * serviceFeePercent) / 100;
        const netReceived = totalCOD - serviceFee;

        return {
            upfrontPayment: netReceived,
            serviceFee,
            netReceived
        };
    }
}

/**
 * M&P API
 */
export class MPAPI {
    // @ts-expect-error - Used in real API implementation
    private _apiKey: string;

    constructor(apiKey: string) {
        this._apiKey = apiKey;
    }

    async bulkBooking(payload: BulkBookingPayload): Promise<BulkBookingResponse> {
        console.log('[M&P] Creating bulk booking for', payload.orders.length, 'orders');

        return {
            success: true,
            trackingNumbers: payload.orders.map((order, index) => ({
                orderId: order.orderId,
                trackingId: `MP-${order.city.toUpperCase()}-${500000 + index}`,
                cn: `CN-MP-${500000 + index}`
            })),
            pdfUrl: 'https://mock-pdf-url.com/mp-loadsheet.pdf'
        };
    }
}

/**
 * COURIER FACTORY
 * Get the appropriate API instance based on courier selection
 */
export function getCourierAPI(
    courier: CourierService,
    apiKeys: {
        trax?: string;
        leopards?: string;
        tcs?: string;
        postex?: string;
        mp?: string;
    }
): TraxAPI | LeopardsAPI | TCSAPI | PostExAPI | MPAPI | null {
    switch (courier) {
        case 'Trax':
            return apiKeys.trax ? new TraxAPI(apiKeys.trax) : null;
        case 'Leopards':
            return apiKeys.leopards ? new LeopardsAPI(apiKeys.leopards) : null;
        case 'TCS':
            return apiKeys.tcs ? new TCSAPI(apiKeys.tcs) : null;
        case 'PostEx':
            return apiKeys.postex ? new PostExAPI(apiKeys.postex) : null;
        case 'M&P':
            return apiKeys.mp ? new MPAPI(apiKeys.mp) : null;
        default:
            return null;
    }
}
