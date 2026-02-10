import AuthLayout from '@/components/layouts/auth-layout';
import SelectForm from '@/components/select-form';
import { Input } from '@/components/ui/input';
import { Category, Item, PaginatedData } from '@/lib/types';
import { useState } from 'react';
import DataCards from './sections/data-cards';
import { router } from '@inertiajs/react';

export default function DahsboardPage({ items, categories }: { items: PaginatedData<Item>; categories: Category[] }) {
    const [categoryId, setCategoryId] = useState('');

    function handleSearchByCategories(e: string) {
        setCategoryId(e);
        router.get('/dashboard', { category_id: e }, { preserveState: true, preserveScroll: true });
    }
    return (
        <AuthLayout title="Dashboard">
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                    <Input placeholder="Search Items..." className="bg-white" />
                    <div className="rounded-lg bg-white">
                        <SelectForm
                            items={categories}
                            name="search-by-category"
                            text="Filters by Category"
                            handleChange={handleSearchByCategories}
                            value={categoryId}
                            usePlaceholder={true}
                            withAll={true}
                        />
                    </div>
                </div>

                <DataCards items={items.data} />
            </div>
        </AuthLayout>
    );
}
