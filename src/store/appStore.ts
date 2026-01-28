import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

// ==================== TYPES ====================
export interface Product {
    id: string;
    sku: string;
    name: string;
    purchase_price: number;
    shipping_cost: number;
    packaging_cost: number;
    landed_cost: number;
    retail_price: number;
    stock_level: number;
    alert_threshold: number;
    category?: string;
    shopify_product_id?: string;
    woocommerce_product_id?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'In Transit' | 'Delivered' | 'Cash Received' | 'Returned (RTO)';
export type CourierService = 'Trax' | 'Leopards' | 'TCS' | 'Call Courier' | 'PostEx' | 'M&P';

export interface Order {
    id: string;
    invoice_number: string;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    city: string;
    items: Array<{ product_id: string; product_name: string; quantity: number; price: number }>;
    total: number;
    status: OrderStatus;
    courier?: CourierService;
    tracking_id?: string;
    created_at: string;
    updated_at: string;
    source?: 'manual' | 'shopify' | 'woocommerce';
    external_order_id?: string;
    is_high_risk?: boolean;
    risk_reason?: string;
    project_id?: string;
}

export interface Person {
    id: string;
    name: string;
    phone: string;
    type: 'customer' | 'vendor';
    balance: number;
    ledger: Array<{
        id: string;
        date: string;
        description: string;
        debit: number;
        credit: number;
        balance: number;
    }>;
    return_count?: number;
    is_blacklisted?: boolean;
}

export interface Project {
    id: string;
    name: string;
    client_name: string;
    start_date: string;
    end_date?: string;
    status: 'active' | 'completed' | 'on-hold';
    budget?: number;
}

export interface Expense {
    id: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    project_id?: string;
}

export interface AdSpend {
    id: string;
    date: string;
    platform: 'Facebook' | 'TikTok' | 'Google' | 'Other';
    amount: number;
    notes?: string;
}

export interface BusinessSettings {
    businessName: string;
    logo?: string;
    ntn?: string;
    address?: string;
    phone?: string;
    email?: string;
}

export interface IntegrationSettings {
    shopify?: { enabled: boolean };
    woocommerce?: { enabled: boolean };
    courier: { trax_api_key?: string };
}

// ==================== STORE ====================
interface AppState {
    // Data
    products: Product[];
    orders: Order[];
    people: Person[];
    expenses: Expense[];
    projects: Project[];
    adSpends: AdSpend[];
    settings: BusinessSettings;
    loading: boolean;
    error: string | null;

    // Core Actions
    fetchInitialData: () => Promise<void>;

    // Product Actions
    addProduct: (product: Omit<Product, 'id' | 'sku' | 'landed_cost'>) => Promise<void>;
    updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
    deleteProduct: (id: string) => Promise<void>;

    // Order Actions
    addOrder: (order: Omit<Order, 'id' | 'invoice_number' | 'created_at' | 'updated_at'>) => Promise<void>;
    updateOrder: (id: string, updates: Partial<Order>) => Promise<void>;
    deleteOrder: (id: string) => Promise<void>;
    checkOrderRisk: (phone: string) => { isHighRisk: boolean; reason?: string };

    // Person Actions
    addPerson: (person: Omit<Person, 'id' | 'balance' | 'ledger'>) => Promise<void>;
    updatePerson: (id: string, updates: Partial<Person>) => Promise<void>;

    // Expense & AdSpend
    addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
    addAdSpend: (adSpend: Omit<AdSpend, 'id'>) => Promise<void>;

    // Settings
    updateSettings: (updates: Partial<BusinessSettings>) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
    products: [],
    orders: [],
    people: [],
    expenses: [],
    projects: [],
    adSpends: [],
    settings: {
        businessName: 'Your Business',
        ntn: '',
        address: '',
        phone: '',
        email: ''
    },
    loading: false,
    error: null,

    fetchInitialData: async () => {
        set({ loading: true });
        try {
            const [products, orders, people, expenses, adSpends] = await Promise.all([
                supabase.from('products').select('*'),
                supabase.from('orders').select('*'),
                supabase.from('people').select('*'),
                supabase.from('expenses').select('*'),
                supabase.from('ad_spends').select('*'),
            ]);

            set({
                products: products.data as Product[] || [],
                orders: orders.data as Order[] || [],
                people: people.data as Person[] || [],
                expenses: expenses.data as Expense[] || [],
                adSpends: adSpends.data as AdSpend[] || [],
                loading: false
            });
        } catch (error: any) {
            console.error('Error fetching data:', error);
            set({ error: error.message, loading: false });
        }
    },

    addProduct: async (product) => {
        const landed_cost = product.purchase_price + product.shipping_cost + product.packaging_cost;
        const sku = `SKU-${Math.random().toString(36).substr(2, 6).toUpperCase()}`; // Simple SKU gen

        const { data, error } = await supabase
            .from('products')
            .insert([{ ...product, sku, landed_cost }])
            .select()
            .single();

        if (error) {
            console.error('Error adding product:', error);
            return;
        }

        set((state) => ({ products: [...state.products, data as Product] }));
    },

    updateProduct: async (id, updates) => {
        const { error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', id);

        if (!error) {
            set((state) => ({
                products: state.products.map(p => p.id === id ? { ...p, ...updates } : p)
            }));
        }
    },

    deleteProduct: async (id) => {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (!error) {
            set((state) => ({ products: state.products.filter(p => p.id !== id) }));
        }
    },

    addOrder: async (order) => {
        const orderCount = get().orders.length;
        const invoice_number = `INV-${new Date().getFullYear()}-${String(orderCount + 1).padStart(4, '0')}`;

        const { data, error } = await supabase
            .from('orders')
            .insert([{ ...order, invoice_number }])
            .select()
            .single();

        if (error) throw error;

        set((state) => ({ orders: [...state.orders, data as Order] }));
    },

    updateOrder: async (id, updates) => {
        const { error } = await supabase.from('orders').update(updates).eq('id', id);
        if (!error) {
            set((state) => ({
                orders: state.orders.map(o => o.id === id ? { ...o, ...updates } : o)
            }));
        }
    },

    deleteOrder: async (id) => {
        const { error } = await supabase.from('orders').delete().eq('id', id);
        if (!error) {
            set((state) => ({ orders: state.orders.filter(o => o.id !== id) }));
        }
    },

    checkOrderRisk: (phone) => {
        const state = get();
        if (state.people.some(p => p.phone === phone && p.is_blacklisted)) {
            return { isHighRisk: true, reason: 'Blacklisted Number' };
        }
        return { isHighRisk: false };
    },

    addPerson: async (person) => {
        const { data, error } = await supabase
            .from('people')
            .insert([person])
            .select()
            .single();

        if (!error && data) {
            set((state) => ({ people: [...state.people, data as Person] }));
        }
    },

    updatePerson: async (id, updates) => {
        const { error } = await supabase.from('people').update(updates).eq('id', id);
        if (!error) {
            set((state) => ({
                people: state.people.map(p => p.id === id ? { ...p, ...updates } : p)
            }));
        }
    },

    addExpense: async (expense) => {
        const { data, error } = await supabase.from('expenses').insert([expense]).select().single();
        if (!error && data) {
            set((state) => ({ expenses: [...state.expenses, data as Expense] }));
        }
    },

    addAdSpend: async (adSpend) => {
        const { data, error } = await supabase.from('ad_spends').insert([adSpend]).select().single();
        if (!error && data) {
            set((state) => ({ adSpends: [...state.adSpends, data as AdSpend] }));
        }
    },

    updateSettings: (updates) => {
        set((state) => ({ settings: { ...state.settings, ...updates } }));
        // In a real app, save to a 'settings' table in Supabase
    }
}));
