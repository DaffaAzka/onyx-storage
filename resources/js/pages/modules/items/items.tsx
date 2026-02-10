import AuthLayout from '@/components/layouts/auth-layout';
import PaginationComponent from '@/components/pagination';
import { Input } from '@/components/ui/input';
import { Category, Item, PaginatedData } from '@/lib/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import CreateModal from './sections/create-modal';
import DataTable from './sections/data-table';

export default function ItemsPage({ items, categories }: { items: PaginatedData<Item>; categories: Category[] }) {
    const [search, setSearch] = useState('');

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
        router.get('/items', { search: e.target.value }, { preserveState: true, preserveScroll: true });
    }

    function handlePageChange(page: number) {
        router.get('/items', { page }, { preserveState: true, preserveScroll: true });
    }

    return (
        <AuthLayout title="Items">
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                    <Input onChange={handleSearch} placeholder="Search Items..." className="bg-white" value={search} />
                    <CreateModal categories={categories} />
                </div>

                <DataTable items={items.data} categories={categories} />

                <PaginationComponent currentPage={items.current_page} lastPage={items.last_page} onPageChange={handlePageChange} />
            </div>
        </AuthLayout>
    );
}
