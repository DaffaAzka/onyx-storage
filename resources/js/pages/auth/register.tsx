import LoadingButton from '@/components/button_loading';
import InputForm from '@/components/input_form';
import GuestLayout from '@/components/layouts/guest_layout';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function RegisterPage() {
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        fullname: null,
        email: null,
        password: null,
        retry_password: null,
    });

    const [loading, setLoading] = useState(false);

    function handleChange(e: { target: { id: any; value: any } }) {
        setValues((values: any) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        setLoading(true);
        router.post('/register', values, {
            onFinish: () => {
                setLoading(false);
            },
        });
    }

    return (
        <>
            <GuestLayout title="Register">
                <div className="flex min-h-screen w-full items-center justify-center">
                    <Card className="mb-12 w-full max-w-xl">
                        <CardHeader>
                            <CardTitle className="text-center">Continue to Sign Up</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                                <InputForm name="fullname" text="Fullname" type="text" handleChange={handleChange} error={errors.fullname} />

                                <InputForm name="email" text="Email Address" type="email" handleChange={handleChange} error={errors.email} />

                                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                    <InputForm name="password" text="Password" type="password" handleChange={handleChange} error={errors.password} />
                                    <InputForm
                                        name="retry_password"
                                        text="Retype Password"
                                        type="password"
                                        handleChange={handleChange}
                                        error={errors.retry_password}
                                    />
                                </div>

                                <LoadingButton text="Register" type="submit" loading={loading} />
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </GuestLayout>
        </>
    );
}
