import { Head } from '@inertiajs/react';
import { AppSidebar } from '../sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { ReactNode } from 'react';

export default function AuthLayout({ children, title }: { children: ReactNode; title: string }) {
    return (
        <>
            <main className="bg-slate-100">
                <Head title={title}>
                    <link rel="preconnect" href="https://fonts.bunny.net" />
                    <link
                        href="https://fonts.bunny.net/css?family=poppins:100,100i,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i"
                        rel="stylesheet"
                    />
                </Head>
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                        <header className="flex h-16 shrink-0 items-center gap-2">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1" />
                            </div>
                        </header>
                        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
                    </SidebarInset>
                </SidebarProvider>
            </main>
        </>
    );
}
