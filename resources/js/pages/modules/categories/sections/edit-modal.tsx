import { Category } from '@/lib/types';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function EditModal({ category, isOpen, onClose }: { category: Category; isOpen: boolean; onClose: () => void }) {
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        name: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (category) {
            setValues({
                name: category.name,
                description: category.description,
            });
        }
    }, [category.id]);

    function handleChange(e: {
        target: {
            name: string;
            value: string;
        };
    }) {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <Dialog open={isOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
