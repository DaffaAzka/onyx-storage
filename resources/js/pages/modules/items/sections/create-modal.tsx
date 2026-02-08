import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

import LoadingButton from '@/components/button_loading';
import InputForm from '@/components/input-form';
import SelectForm from '@/components/select-form';
import TextareaForm from '@/components/textarea-form';
import { Button } from '@/components/ui/button';
import { SelectItems } from '@/lib/types';

export default function CreateModal({ categories }: { categories: SelectItems[] }) {
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

    function handleChange(e: { target: { name: string; value: string } }) {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        setLoading(true);
        router.post('/items', values, {
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
                toast.success('Item created successfully!');
            },
            onFinish: () => {
                setLoading(false);
            },
            onError: () => {
                toast.error('Failed to create item. Please check the form for errors.');
                console.log(errors);
            }
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Category</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm overflow-hidden md:max-w-md lg:max-w-lg">
                <DialogHeader className="flex flex-col gap-5">
                    <DialogTitle>Create new item</DialogTitle>
                    <form className="flex flex-col gap-5 overflow-hidden" onSubmit={handleSubmit}>
                        <InputForm
                            name="code"
                            text="Code Item"
                            type="text"
                            handleChange={handleChange}
                            error={errors.code}
                            usePlaceholder={true}
                            value={values.code}
                        />

                        <InputForm
                            name="name"
                            text="Name Item"
                            type="text"
                            handleChange={handleChange}
                            error={errors.name}
                            usePlaceholder={true}
                            value={values.name}
                        />
                        <TextareaForm
                            name="description"
                            text="Description Item"
                            handleChange={handleChange}
                            usePlaceholder={true}
                            value={values.description}
                            error={errors.description}
                        />

                        <SelectForm
                            name="category_id"
                            text="Select Category"
                            handleChange={(value: string) => handleChange({ target: { name: 'category_id', value } } as any)}
                            error={errors.category_id}
                            usePlaceholder={true}
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
                            />
                            <InputForm
                                name="evailable_quantity"
                                text="Evailable Quantity Item"
                                type="number"
                                handleChange={handleChange}
                                error={errors.evailable_quantity}
                                usePlaceholder={false}
                                value={values.evailable_quantity.toString()}
                            />
                        </div>
                        <LoadingButton text="Submit" type="submit" loading={loading} />
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
