import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Actions, Category } from '@/lib/types';
import { MoreHorizontalIcon } from 'lucide-react';
import { useState } from 'react';
import ActionModal from './action-modal';

export default function DataTable({ categories }: { categories: Category[] }) {
    const [actionModal, setActionModal] = useState<{
        category: Category | null;
        isOpen: boolean;
        action: Actions | null;
    }>({
        category: null,
        isOpen: false,
        action: null,
    });

    function handleClick(category: Category, isOpen: boolean, action: Actions) {
        setActionModal({
            category: category,
            isOpen: isOpen,
            action: action,
        });
    }

    function handleCloseModal() {
        setActionModal({
            category: null,
            isOpen: false,
            action: null,
        });
    }

    return (
        <>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead className="w-12.5 text-ellipsis lg:w-fit">Description</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead className="hidden lg:table-cell">Created By</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category, index) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        <div className="w-20 truncate lg:w-fit">{category.description}</div>
                                    </TableCell>
                                    <TableCell>{category.items?.length}</TableCell>
                                    <TableCell className="hidden lg:table-cell">{category.user?.name ?? 'N/A'}</TableCell>
                                    <TableCell className="flex flex-row justify-end gap-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="size-8">
                                                    <MoreHorizontalIcon />
                                                    <span className="sr-only">Open menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleClick(category, true, Actions.UPDATE)}>
                                                    Update
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleClick(category, true, Actions.DETAIL)}>
                                                    Detail
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem variant="destructive" onClick={() => handleClick(category, true, Actions.DELETE)}>
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {actionModal.category && actionModal.isOpen && actionModal.action ? (
                <>
                    <ActionModal isOpen={actionModal.isOpen} category={actionModal.category} action={actionModal.action} onClose={handleCloseModal} />
                </>
            ) : (
                <></>
            )}
        </>
    );
}
