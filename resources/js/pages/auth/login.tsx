import LoadingButton from '@/components/button_loading';
import InputForm from '@/components/input_form';
import GuestLayout from '@/components/layouts/guest_layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
export default function LoginPage() {
    const { errors } = usePage().props;

    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
        email: null,
        password: null,
    });

    function handleChange(e: { target: { id: any; value: any } }) {
        setValues((values: any) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        setLoading(true);

        router.post('/login', values, {
            onFinish: () => {
                setLoading(false);
            },
        });
    }

    return (
        <GuestLayout title="Login">
            <div className="flex min-h-screen w-full items-center justify-center">
                <Card className="mb-12 w-full max-w-xl">
                    <CardHeader>
                        <CardTitle className="text-center">Continue to Sign In</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <InputForm handleChange={handleChange} name="email" text="Email Address" type="email" error={errors.email} />
                            <InputForm handleChange={handleChange} name="password" text="Password" type="password" error={errors.password} />

                            <LoadingButton type="submit" text="Sign In" loading={loading} />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </GuestLayout>
    );
}
