import { Input } from '@/components/ui/input';
import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';
import { Field, FieldDescription, FieldLabel } from './ui/field';
export default function InputForm({
    name,
    text,
    type,
    handleChange,
    error = null,
}: {
    name: string;
    text: string;
    type: HTMLInputTypeAttribute;
    handleChange: ChangeEventHandler<HTMLInputElement>;
    error?: string | null;
}) {
    return (
        <Field aria-invalid={error != null} className="flex flex-col gap-3">
            <FieldLabel htmlFor={name}>{text}</FieldLabel>
            <div className="flex flex-col gap-1">
                <Input id={name} type={type} onChange={handleChange} aria-invalid={error != null} />
                {error && <FieldDescription className="text-xs">{error}</FieldDescription>}
            </div>
        </Field>
    );
}
