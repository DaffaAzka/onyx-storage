'use client';

import { usePage } from '@inertiajs/react';
import { Activity, ClipboardList, DatabaseBackupIcon, LayoutDashboard, Package, RefreshCw, Users } from 'lucide-react';
import * as React from 'react';

import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { authorizations } from '@/lib/helpers';
import { NavMain } from './nav-main';

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        role: string;
    };
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth } = usePage<PageProps>().props;

    const data = {
        navMain: [
            {
                title: 'Dashboard',
                url: '/dashboard',
                icon: LayoutDashboard,
                isActive: true,
                isShow: true,
            },

            {
                title: 'Borrowings',
                url: '#',
                icon: ClipboardList,
                isActive: true,
                isShow: true,
                items: [
                    {
                        title: 'Manage Borrowings',
                        url: '#',
                        isActive: true,
                        isShow: true,
                    },
                    {
                        title: 'Borrowing Report',
                        url: '#',
                        isActive: true,
                        isShow: authorizations(auth.role, ['admin', 'officer']),
                    },
                ],
            },

            {
                title: 'Returns',
                url: '#',
                icon: RefreshCw,
                isActive: true,
                isShow: true,
                items: [
                    {
                        title: 'Manage Returns',
                        url: '#',
                        isActive: true,
                        isShow: true,
                    },
                    {
                        title: 'Manage Fines',
                        url: '#',
                        isActive: true,
                        isShow: authorizations(auth.role, ['admin', 'officer']),
                    },
                    {
                        title: 'Return Report',
                        url: '#',
                        isActive: true,
                        isShow: authorizations(auth.role, ['admin', 'officer']),
                    },
                    {
                        title: 'Fine Report',
                        url: '#',
                        isActive: true,
                        isShow: authorizations(auth.role, ['admin', 'officer']),
                    },
                ],
            },

            {
                title: 'Items',
                url: '#',
                icon: Package,
                isActive: true,
                isShow: authorizations(auth.role, ['admin']),
                items: [
                    {
                        title: 'Manage Items',
                        url: '/items',
                        isActive: true,
                        isShow: true,
                    },
                    {
                        title: 'Manage Categories',
                        url: '/categories',
                        isActive: true,
                        isShow: true,
                    },
                ],
            },

            {
                title: 'Users',
                url: '#',
                icon: Users,
                isActive: true,
                items: [
                    {
                        title: 'Manage Users',
                        url: '#',
                        isActive: true,
                        isShow: true,
                    },
                ],
            },

            {
                title: 'Activity Logs',
                url: '#',
                icon: Activity,
                isActive: true,
                isShow: true,
            },
        ],
    };

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <div className="flex flex-row content-center items-center gap-2">
                                <DatabaseBackupIcon size={8} />
                                <span className="truncate font-medium"> Onyx Storage</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
