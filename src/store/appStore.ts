import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export interface ShopifyConfig {
    shop_url: string;
    api_key: string;
    access_token: string;
    enabled: boolean;
    last_sync?: string;
}

export interface WooCommerceConfig {
    store_url: string;
    consumer_key: string;
    consumer_secret: string;
    enabled: boolean;
    last_sync?: string;
}

export interface CourierConfig {
    trax_api_key?: string;
    leopards_api_key?: string;
    tcs_api_key?: string;
    postex_api_key?: string;
    postex_factoring_enabled?: boolean;
    postex_service_fee?: number;
    mp_api_key?: string;
}

export interface IntegrationSettings {
    shopify?: ShopifyConfig;
    woocommerce?: WooCommerceConfig;
    courier: CourierConfig;
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
    integrations: IntegrationSettings;
    blacklistedPhones: string[];

    // Product Actions
    addProduct: (product: Omit<Product, 'id' | 'sku' | 'landed_cost'>) => void;
    updateProduct: (id: string, updates: Partial<Product>) => void;
    deleteProduct: (id: string) => void;

    // Order Actions
    addOrder: (order: Omit<Order, 'id' | 'invoice_number' | 'created_at' | 'updated_at'>) => void;
    updateOrder: (id: string, updates: Partial<Order>) => void;
    deleteOrder: (id: string) => void;
    checkOrderRisk: (phone: string) => { isHighRisk: boolean; reason?: string };

    // Person Actions
    addPerson: (person: Omit<Person, 'id' | 'balance' | 'ledger'>) => void;
    updatePerson: (id: string, updates: Partial<Person>) => void;
    addLedgerEntry: (personId: string, entry: Omit<Person['ledger'][0], 'id' | 'balance'>) => void;

    // Expense Actions
    addExpense: (expense: Omit<Expense, 'id'>) => void;
    deleteExpense: (id: string) => void;

    // Project Actions
    addProject: (project: Omit<Project, 'id'>) => void;
    updateProject: (id: string, updates: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    getProjectProfitLoss: (projectId: string) => { income: number; expenses: number; profit: number };

    // Ad Spend Actions
    addAdSpend: (adSpend: Omit<AdSpend, 'id'>) => void;
    deleteAdSpend: (id: string) => void;
    getTotalAdSpend: (startDate?: string, endDate?: string) => number;

    // Settings Actions
    updateSettings: (updates: Partial<BusinessSettings>) => void;
    updateIntegrations: (updates: Partial<IntegrationSettings>) => void;

    // Blacklist Actions
    addToBlacklist: (phone: string) => void;
    removeFromBlacklist: (phone: string) => void;
}

// ==================== SMART DUMMY DATA ====================
const generateSKU = () => `SKU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
const generateID = () => Math.random().toString(36).substr(2, 9);

const dummyProducts: Product[] = [
    {
        id: '1',
        sku: 'SKU-TEE-001',
        name: 'Premium Cotton T-Shirt',
        purchase_price: 450,
        shipping_cost: 50,
        packaging_cost: 25,
        landed_cost: 525,
        retail_price: 999,
        stock_level: 45,
        alert_threshold: 10,
        category: 'Apparel'
    },
    {
        id: '2',
        sku: 'SKU-CAP-002',
        name: 'Embroidered Baseball Cap',
        purchase_price: 250,
        shipping_cost: 30,
        packaging_cost: 15,
        landed_cost: 295,
        retail_price: 599,
        stock_level: 8,
        alert_threshold: 10,
        category: 'Accessories'
    },
    {
        id: '3',
        sku: 'SKU-BAG-003',
        name: 'Leather Crossbody Bag',
        purchase_price: 1200,
        shipping_cost: 150,
        packaging_cost: 50,
        landed_cost: 1400,
        retail_price: 2999,
        stock_level: 22,
        alert_threshold: 5,
        category: 'Accessories'
    },
    {
        id: '4',
        sku: 'SKU-SNK-004',
        name: 'Running Sneakers',
        purchase_price: 1800,
        shipping_cost: 200,
        packaging_cost: 75,
        landed_cost: 2075,
        retail_price: 4499,
        stock_level: 15,
        alert_threshold: 8,
        category: 'Footwear'
    },
    {
        id: '5',
        sku: 'SKU-WAT-005',
        name: 'Smart Watch (Generic)',
        purchase_price: 2500,
        shipping_cost: 250,
        packaging_cost: 100,
        landed_cost: 2850,
        retail_price: 5999,
        stock_level: 3,
        alert_threshold: 5,
        category: 'Electronics'
    }
];

const dummyOrders: Order[] = [
    {
        id: 'ord-1',
        invoice_number: 'INV-2024-001',
        customer_name: 'Ahmed Khan',
        customer_phone: '0300-1234567',
        customer_address: 'House 45, Street 12, DHA Phase 5',
        city: 'Karachi',
        items: [
            { product_id: '1', product_name: 'Premium Cotton T-Shirt', quantity: 2, price: 999 },
            { product_id: '2', product_name: 'Embroidered Baseball Cap', quantity: 1, price: 599 }
        ],
        total: 2597,
        status: 'Delivered',
        courier: 'Trax',
        tracking_id: 'TRX-KHI-9876543',
        created_at: '2024-01-15T10:30:00',
        updated_at: '2024-01-18T14:20:00',
        source: 'manual'
    },
    {
        id: 'ord-2',
        invoice_number: 'INV-2024-002',
        customer_name: 'Fatima Ali',
        customer_phone: '0321-9876543',
        customer_address: 'Flat 302, Gulberg Residency, Main Boulevard',
        city: 'Lahore',
        items: [
            { product_id: '3', product_name: 'Leather Crossbody Bag', quantity: 1, price: 2999 }
        ],
        total: 2999,
        status: 'In Transit',
        courier: 'Leopards',
        tracking_id: 'LEO-LHE-5544332',
        created_at: '2024-01-20T15:45:00',
        updated_at: '2024-01-21T09:12:00',
        source: 'manual'
    },
    {
        id: 'ord-3',
        invoice_number: 'INV-2024-003',
        customer_name: 'Usman Sheikh',
        customer_phone: '0333-5566778',
        customer_address: 'Plot 88, Sector F-10/3, Near Centaurus Mall',
        city: 'Islamabad',
        items: [
            { product_id: '4', product_name: 'Running Sneakers', quantity: 1, price: 4499 },
            { product_id: '5', product_name: 'Smart Watch (Generic)', quantity: 1, price: 5999 }
        ],
        total: 10498,
        status: 'Confirmed',
        courier: 'TCS',
        tracking_id: 'TCS-ISB-3344556',
        created_at: '2024-01-22T11:20:00',
        updated_at: '2024-01-22T11:20:00',
        source: 'manual'
    }
];

const dummyPeople: Person[] = [
    {
        id: 'per-1',
        name: 'Ahmed Khan',
        phone: '0300-1234567',
        type: 'customer',
        balance: 0,
        return_count: 0,
        ledger: [
            {
                id: 'led-1',
                date: '2024-01-15',
                description: 'Invoice #INV-2024-001',
                debit: 2597,
                credit: 0,
                balance: 2597
            },
            {
                id: 'led-2',
                date: '2024-01-18',
                description: 'Payment Received - Cash',
                debit: 0,
                credit: 2597,
                balance: 0
            }
        ]
    },
    {
        id: 'per-2',
        name: 'Fatima Ali',
        phone: '0321-9876543',
        type: 'customer',
        balance: 2999,
        return_count: 0,
        ledger: [
            {
                id: 'led-3',
                date: '2024-01-20',
                description: 'Invoice #INV-2024-002',
                debit: 2999,
                credit: 0,
                balance: 2999
            }
        ]
    },
    {
        id: 'per-3',
        name: 'China Imports Co.',
        phone: '+86-138-0013-8000',
        type: 'vendor',
        balance: -15000,
        ledger: [
            {
                id: 'led-4',
                date: '2024-01-10',
                description: 'Bulk Purchase - 100 Units',
                debit: 0,
                credit: 25000,
                balance: -25000
            },
            {
                id: 'led-5',
                date: '2024-01-12',
                description: 'Payment Made - Bank Transfer',
                debit: 10000,
                credit: 0,
                balance: -15000
            }
        ]
    }
];

const dummyExpenses: Expense[] = [
    {
        id: 'exp-1',
        description: 'Office Chai & Biscuits',
        amount: 450,
        category: 'Office Supplies',
        date: '2024-01-18'
    },
    {
        id: 'exp-2',
        description: 'Fuel for Delivery',
        amount: 2000,
        category: 'Logistics',
        date: '2024-01-20'
    }
];

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            // Initial State
            products: dummyProducts,
            orders: dummyOrders,
            people: dummyPeople,
            expenses: dummyExpenses,
            projects: [],
            adSpends: [],
            blacklistedPhones: [],
            settings: {
                businessName: 'Your Business',
                ntn: '',
                address: '',
                phone: '',
                email: ''
            },
            integrations: {
                courier: {}
            },

            // Product Actions
            addProduct: (product) => {
                const newProduct: Product = {
                    ...product,
                    id: generateID(),
                    sku: product.name ? generateSKU() : '',
                    landed_cost: product.purchase_price + product.shipping_cost + product.packaging_cost
                };
                set((state) => ({ products: [...state.products, newProduct] }));
            },

            updateProduct: (id, updates) => {
                set((state) => ({
                    products: state.products.map((p) => {
                        if (p.id === id) {
                            const updated = { ...p, ...updates };
                            if (updates.purchase_price !== undefined || updates.shipping_cost !== undefined || updates.packaging_cost !== undefined) {
                                updated.landed_cost = updated.purchase_price + updated.shipping_cost + updated.packaging_cost;
                            }
                            return updated;
                        }
                        return p;
                    })
                }));
            },

            deleteProduct: (id) => {
                set((state) => ({ products: state.products.filter((p) => p.id !== id) }));
            },

            // Order Actions
            addOrder: (order) => {
                const orderCount = get().orders.length;
                const newOrder: Order = {
                    ...order,
                    id: generateID(),
                    invoice_number: `INV-2024-${String(orderCount + 1).padStart(3, '0')}`,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                };
                set((state) => ({ orders: [...state.orders, newOrder] }));
            },

            updateOrder: (id, updates) => {
                set((state) => ({
                    orders: state.orders.map((o) =>
                        o.id === id ? { ...o, ...updates, updated_at: new Date().toISOString() } : o
                    )
                }));
            },

            deleteOrder: (id) => {
                set((state) => ({ orders: state.orders.filter((o) => o.id !== id) }));
            },

            checkOrderRisk: (phone) => {
                const state = get();

                // Check blacklist
                if (state.blacklistedPhones.includes(phone)) {
                    return { isHighRisk: true, reason: 'Phone number is blacklisted' };
                }

                // Check return history
                const customer = state.people.find(p => p.phone === phone);
                if (customer && customer.return_count && customer.return_count >= 2) {
                    return { isHighRisk: true, reason: `${customer.return_count} previous returns` };
                }

                return { isHighRisk: false };
            },

            // Person Actions
            addPerson: (person) => {
                const newPerson: Person = {
                    ...person,
                    id: generateID(),
                    balance: 0,
                    ledger: [],
                    return_count: 0
                };
                set((state) => ({ people: [...state.people, newPerson] }));
            },

            updatePerson: (id, updates) => {
                set((state) => ({
                    people: state.people.map((p) => (p.id === id ? { ...p, ...updates } : p))
                }));
            },

            addLedgerEntry: (personId, entry) => {
                set((state) => ({
                    people: state.people.map((person) => {
                        if (person.id === personId) {
                            const lastBalance = person.ledger.length > 0
                                ? person.ledger[person.ledger.length - 1].balance
                                : 0;
                            const newBalance = lastBalance + entry.debit - entry.credit;
                            const newEntry = {
                                ...entry,
                                id: generateID(),
                                balance: newBalance
                            };
                            return {
                                ...person,
                                ledger: [...person.ledger, newEntry],
                                balance: newBalance
                            };
                        }
                        return person;
                    })
                }));
            },

            // Expense Actions
            addExpense: (expense) => {
                const newExpense: Expense = {
                    ...expense,
                    id: generateID()
                };
                set((state) => ({ expenses: [...state.expenses, newExpense] }));
            },

            deleteExpense: (id) => {
                set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) }));
            },

            // Project Actions
            addProject: (project) => {
                const newProject: Project = {
                    ...project,
                    id: generateID()
                };
                set((state) => ({ projects: [...state.projects, newProject] }));
            },

            updateProject: (id, updates) => {
                set((state) => ({
                    projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p))
                }));
            },

            deleteProject: (id) => {
                set((state) => ({ projects: state.projects.filter((p) => p.id !== id) }));
            },

            getProjectProfitLoss: (projectId) => {
                const state = get();

                // Calculate income from orders tagged to this project
                const income = state.orders
                    .filter(o => o.project_id === projectId && (o.status === 'Cash Received' || o.status === 'Delivered'))
                    .reduce((sum, o) => sum + o.total, 0);

                // Calculate expenses tagged to this project
                const expenses = state.expenses
                    .filter(e => e.project_id === projectId)
                    .reduce((sum, e) => sum + e.amount, 0);

                return {
                    income,
                    expenses,
                    profit: income - expenses
                };
            },

            // Ad Spend Actions
            addAdSpend: (adSpend) => {
                const newAdSpend: AdSpend = {
                    ...adSpend,
                    id: generateID()
                };
                set((state) => ({ adSpends: [...state.adSpends, newAdSpend] }));
            },

            deleteAdSpend: (id) => {
                set((state) => ({ adSpends: state.adSpends.filter((a) => a.id !== id) }));
            },

            getTotalAdSpend: (startDate, endDate) => {
                const state = get();
                return state.adSpends
                    .filter(ad => {
                        if (!startDate && !endDate) return true;
                        const adDate = new Date(ad.date);
                        const start = startDate ? new Date(startDate) : new Date(0);
                        const end = endDate ? new Date(endDate) : new Date();
                        return adDate >= start && adDate <= end;
                    })
                    .reduce((sum, ad) => sum + ad.amount, 0);
            },

            // Settings Actions
            updateSettings: (updates) => {
                set((state) => ({
                    settings: { ...state.settings, ...updates }
                }));
            },

            updateIntegrations: (updates) => {
                set((state) => ({
                    integrations: { ...state.integrations, ...updates }
                }));
            },

            // Blacklist Actions
            addToBlacklist: (phone) => {
                set((state) => ({
                    blacklistedPhones: [...state.blacklistedPhones, phone]
                }));
            },

            removeFromBlacklist: (phone) => {
                set((state) => ({
                    blacklistedPhones: state.blacklistedPhones.filter(p => p !== phone)
                }));
            }
        }),
        {
            name: 'hisaab-app-storage'
        }
    )
);
