import InputForm from '@/components/input_form';
import TextareaForm from '@/components/textarea_form';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { Actions, Category } from '@/lib/types';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

export default function ActionModal({
    category,
    isOpen,
    action,
    onClose,
}: {
    category: Category;
    isOpen: boolean;
    action: Actions;
    onClose: () => void;
}) {
    const [values, setValues] = useState({
        name: '',
        description: '',
    });

    const [disabled, setDisabled] = useState(false);
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (category) {
            setValues({
                name: category.name,
                description: category.description,
            });
        }

        setDisabled(action === Actions.DETAIL || action === Actions.DELETE);

        switch (action) {
            case Actions.DETAIL:
                setTitle('Detail category');
                break;

            case Actions.DELETE:
                setTitle('Delete category');
                break;

            case Actions.UPDATE:
                setTitle('Update category');
                break;

            default:
                break;
        }
    }, [action, category.id]);

    function handleChange(e: { target: { name: string; value: string } }) {
        setValues((values) => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-sm overflow-hidden md:max-w-md lg:max-w-lg">
                <DialogHeader className="flex flex-col gap-5">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription asChild>
                        <form className="flex flex-col gap-5 overflow-hidden">
                            <InputForm
                                name="name"
                                text="Name Category"
                                type="text"
                                handleChange={handleChange}
                                usePlaceholder={true}
                                value={values.name}
                                isDisabled={disabled}
                            />
                            <TextareaForm
                                name="description"
                                text="Description Category"
                                handleChange={handleChange}
                                usePlaceholder={true}
                                value={values.description}
                                isDisabled={disabled}
                            />
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
