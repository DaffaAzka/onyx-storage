import LoadingButton from '@/components/button_loading';
import InputForm from '@/components/input-form';
import TextareaForm from '@/components/textarea-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CreateModal() {
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        name: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);

    function handleChange(e: { target: { name: string; value: string } }) {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        setLoading(true);
        router.post('/categories', values, {
            preserveState: true,
            preserveScroll: true,
            only: ['categories'],
            onSuccess: () => {
                setValues({
                    name: '',
                    description: '',
                });
                toast.success('Category created successfully!');
            },
            onFinish: () => {
                setLoading(false);
            },
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Category</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm overflow-hidden md:max-w-md lg:max-w-lg">
                <DialogHeader className="flex flex-col gap-5">
                    <DialogTitle>Create new category</DialogTitle>
                    <form className="flex flex-col gap-5 overflow-hidden" onSubmit={handleSubmit}>
                        <InputForm
                            name="name"
                            text="Name Category"
                            type="text"
                            handleChange={handleChange}
                            usePlaceholder={true}
                            error={errors.name}
                            value={values.name}
                        />
                        <TextareaForm
                            name="description"
                            text="Description Category"
                            handleChange={handleChange}
                            usePlaceholder={true}
                            error={errors.description}
                            value={values.description}
                        />
                        <LoadingButton text="Submit" type="submit" loading={loading} />
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
