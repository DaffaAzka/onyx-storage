import LoadingButton from '@/components/button_loading';
import InputForm from '@/components/input-form';
import SelectForm from '@/components/select-form';
import TextareaForm from '@/components/textarea-form';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Actions, Item, SelectItems } from '@/lib/types';
import { router, usePage } from '@inertiajs/react';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function ActionModal({
    item,
    categories,
    isOpen,
    action,
    onClose,
}: {
    item: Item;
    categories: SelectItems[];
    isOpen: boolean;
    action: Actions;
    onClose: () => void;
}) {
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        name: '',
        description: '',
        category_id: 0,
        code: '',
        status: '',
        quantity: 0,
        evailable_quantity: 0,
        image_path: '',
    });

    const [disabled, setDisabled] = useState(false);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const conditions: SelectItems[] = [
        {
            id: 'good',
            name: 'Good',
        },
        {
            id: 'fair',
            name: 'Fair',
        },
        {
            id: 'damaged',
            name: 'Damaged',
        },
    ];

    useEffect(() => {
        if (item) {
            setValues({
                name: item.name,
                description: item.description ?? '',
                category_id: item.category_id,
                code: item.code,
                status: item.status,
                quantity: item.quantity,
                evailable_quantity: item.evailable_quantity,
                image_path: item.image_path ?? '',
            });
        }
    }, [item.id]);

    useEffect(() => {
        setDisabled(action === Actions.DETAIL || action === Actions.DELETE);

        switch (action) {
            case Actions.DETAIL:
                setTitle('Detail item');
                break;
            case Actions.DELETE:
                setTitle('Delete item');
                break;
            case Actions.UPDATE:
                setTitle('Update item');
                break;
            default:
                break;
        }
    }, [action]);

    function handleChange(e: { target: { name: string; value: string } }) {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        setLoading(true);

        switch (action) {
            case Actions.DELETE:
                router.delete(`/items/${item.id}`, {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['items'],
                    onSuccess: () => {
                        setValues({
                            name: '',
                            description: '',
                            category_id: 0,
                            code: '',
                            status: '',
                            quantity: 0,
                            evailable_quantity: 0,
                            image_path: '',
                        });
                        onClose();
                        toast.success('Item deleted successfully!');
                    },
                    onFinish: () => {
                        setLoading(false);
                    },
                });
                break;

            case Actions.UPDATE:
                router.patch(`/items/${item.id}`, values, {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['items'],
                    onSuccess: () => {
                        setValues({
                            name: '',
                            description: '',
                            category_id: 0,
                            code: '',
                            status: '',
                            quantity: 0,
                            evailable_quantity: 0,
                            image_path: '',
                        });
                        onClose();
                        toast.success('Item updated successfully!');
                    },
                    onFinish: () => {
                        setLoading(false);
                    },
                });
                break;

            default:
                setLoading(false);
                break;
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-sm overflow-hidden md:max-w-md lg:max-w-lg">
                <DialogHeader className="flex flex-col gap-5">
                    <DialogTitle className="text-lg leading-none font-semibold">{title}</DialogTitle>
                    <form className="flex flex-col gap-5 overflow-hidden" onSubmit={handleSubmit}>
                        <InputForm
                            name="code"
                            text="Code Item"
                            type="text"
                            handleChange={handleChange}
                            error={errors.code}
                            usePlaceholder={true}
                            value={values.code}
                            isDisabled={disabled}
                        />

                        <InputForm
                            name="name"
                            text="Name Item"
                            type="text"
                            handleChange={handleChange}
                            error={errors.name}
                            usePlaceholder={true}
                            value={values.name}
                            isDisabled={disabled}
                        />
                        <TextareaForm
                            name="description"
                            text="Description Item"
                            handleChange={handleChange}
                            usePlaceholder={true}
                            value={values.description}
                            error={errors.description}
                            isDisabled={disabled}
                        />

                        <SelectForm
                            name="category_id"
                            text="Select Category"
                            handleChange={(value: string) => handleChange({ target: { name: 'category_id', value } } as any)}
                            error={errors.category_id}
                            usePlaceholder={true}
                            isDisabled={disabled}
                            items={categories}
                        />

                        <SelectForm
                            name="status"
                            text="Select Condition"
                            handleChange={(value: string) => handleChange({ target: { name: 'status', value } } as any)}
                            error={errors.status}
                            usePlaceholder={true}
                            items={conditions}
                        />

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            <InputForm
                                name="quantity"
                                text="Quantity Item"
                                type="number"
                                handleChange={handleChange}
                                error={errors.quantity}
                                usePlaceholder={false}
                                value={values.quantity.toString()}
                                isDisabled={disabled}
                            />
                            <InputForm
                                name="evailable_quantity"
                                text="Evailable Quantity Item"
                                type="number"
                                handleChange={handleChange}
                                error={errors.evailable_quantity}
                                usePlaceholder={false}
                                value={values.evailable_quantity.toString()}
                                isDisabled={disabled}
                            />
                        </div>

                        {(action === Actions.UPDATE || action === Actions.DELETE) && (
                            <LoadingButton
                                text="Submit"
                                type="submit"
                                variant={action === Actions.DELETE ? 'destructive' : 'default'}
                                loading={loading}
                            />
                        )}
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
