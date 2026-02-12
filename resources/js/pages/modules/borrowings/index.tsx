import AuthLayout from '@/components/layouts/auth-layout';
import { Borrowing, PaginatedData, User } from '@/lib/types';
import DataTable from './sections/data-table';
import PaginationComponent from '@/components/pagination';
import { router } from '@inertiajs/react';

export default function IndexPage({ borrowings, user }: { borrowings: PaginatedData<Borrowing>; user: User }) {
    function handlePageChange(page: number) {
            router.get('/borrowings', { page }, { preserveState: true, preserveScroll: true });
        }

    return (
        <AuthLayout title="Borrowings">
            <DataTable borrowings={borrowings.data} userRole={user.role} />
            <PaginationComponent currentPage={borrowings.current_page} lastPage={borrowings.last_page} onPageChange={handlePageChange} />
        </AuthLayout>
    );
}
