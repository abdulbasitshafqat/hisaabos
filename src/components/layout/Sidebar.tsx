import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Factory,
    Briefcase,
    Users,
    BarChart3,
    Settings as SettingsIcon,
    Plug,
    LogOut
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

export function Sidebar() {
    const { businessType, resetOnboarding } = useStore();

    const navItems = [
        { label: "Dashboard", href: "/", icon: LayoutDashboard },
        { label: "Inventory", href: "/inventory", icon: Package },
        { label: "Sales & Invoicing", href: "/sales", icon: ShoppingCart },
        { label: "People (Khata)", href: "/people", icon: Users },
        { label: "Projects", href: "/projects", icon: Briefcase },
        { label: "Reports", href: "/reports", icon: BarChart3 },
        { label: "Integrations", href: "/integrations", icon: Plug },
    ];

    if (businessType === 'manufacturing') {
        navItems.splice(3, 0, { label: "Manufacturing", href: "/manufacturing", icon: Factory });
    }

    if (businessType === 'agency') {
        navItems.splice(3, 0, { label: "Services", href: "/services", icon: Briefcase });
    }

    return (
        <aside className="w-64 bg-slate-900 h-screen text-slate-50 flex flex-col border-r border-slate-800">
            <div className="p-6">
                <h1 className="text-2xl font-bold tracking-tight text-emerald-400">HisaabOS</h1>
                <p className="text-xs text-slate-400 mt-1">Financial Clarity First</p>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-emerald-600/10 text-emerald-400"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-50"
                            )
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </NavLink>
                ))}

                <div className="pt-4">
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-emerald-600/10 text-emerald-400"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-50"
                            )
                        }
                    >
                        <SettingsIcon className="w-5 h-5" />
                        Settings
                    </NavLink>
                </div>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={() => resetOnboarding()}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-slate-400 hover:bg-red-900/10 hover:text-red-400 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Reset App
                </button>
            </div>
        </aside>
    );
}
