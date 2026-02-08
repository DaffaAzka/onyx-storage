import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Actions, Item } from '@/lib/types';
import { InfoIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

export default function DataTable({ items }: { items: Item[] }) {
    const [actionModal, setActionModal] = useState<{
        item: Item | null;
        isOpen: boolean;
        action: Actions | null;
    }>({
        item: null,
        isOpen: false,
        action: null,
    });

    function handleClick(item: Item, isOpen: boolean, action: Actions) {
        setActionModal({
            item: item,
            isOpen: isOpen,
            action: action,
        });
    }

    function handleCloseModal() {
        setActionModal({
            item: null,
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
                                <TableHead>Item Code</TableHead>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Available Quantity</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell className="font-medium">{item.code}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.evailable_quantity}</TableCell>
                                    <TableCell className="flex flex-row justify-end gap-2">
                                        <Button variant="default" size="icon-sm" onClick={() => handleClick(item, true, Actions.UPDATE)}>
                                            <PencilIcon />
                                        </Button>
                                        <Button variant="outline" size="icon-sm" onClick={() => handleClick(item, true, Actions.DETAIL)}>
                                            <InfoIcon />
                                        </Button>
                                        <Button variant="destructive" size="icon-sm" onClick={() => handleClick(item, true, Actions.DELETE)}>
                                            <TrashIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
