import { Spinner } from '@/components/ui/spinner';
import { Button } from './ui/button';

type ButtonType = 'button' | 'submit' | 'reset';

export default function LoadingButton({ text, type = 'button', loading = false }: { text: string; type?: ButtonType; loading?: boolean }) {
    return (
        <Button disabled={loading} type={type}>
            {loading && <Spinner />}
            {text}
        </Button>
    );
}
