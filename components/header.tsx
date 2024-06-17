"use client";

import { useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';

export const Header = () => {

    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded || !isSignedIn) {
        return <Loader />;
    }

    return <div>Hello, {user.firstName}</div>;
}