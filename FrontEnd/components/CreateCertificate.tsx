import Image from 'next/image';
import { ButtonLink } from '../components/Button';
import { Container } from '../components/Container';

import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"
import { clsx } from 'clsx';


export function CreateCertificate() {
    return (
        <Container className="pt-20 pb-16 text-center lg:pt-32">
            <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
                Welcome, Wise Mr Musa
            </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
                    These are the lists of certificates you&apos;ve created
                </p>
            <div className={clsx('mx-auto mt-6 max-w-2xl ', 'flex flex-wrap gap-6')}>
                <Card
                    className={clsx('')}
                > 
                    <CardContent>
                    </CardContent>
                    <CardTitle>Hello</CardTitle>
                    <CardHeader>Certificate of Award</CardHeader>
                </Card>
                <Card> 
                    <CardContent>
                    </CardContent>
                    <CardHeader>Certificate of Award</CardHeader>
                </Card>
                <Card> 
                    <CardContent>
                    </CardContent>
                    <CardHeader>Certificate of Award</CardHeader>
                </Card>
                <Card> 
                    <CardContent>
                    </CardContent>
                    <CardHeader>Certificate of Award</CardHeader>
                </Card>
                <Card> 
                    <CardContent>
                    </CardContent>
                    <CardHeader>Certificate of Award</CardHeader>
                </Card>
                {/* <Card> 
                    <CardHeader>Certificate of Award</CardHeader>
                </Card> */}

            </div>
            <div className="mt-10 flex justify-center space-x-6">
                <ButtonLink href="/create">Create new certificate</ButtonLink>
                <ButtonLink
                    href="https://youtu.be/XxSID43ElUQ"
                    variant="outline"
                >
                    <svg
                        aria-hidden="true"
                        className="h-3 w-3 flex-none fill-blue-600 group-active:fill-current"
                    >
                        <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z" />
                    </svg>
                    <span className="ml-3">Watch Demo</span>
                </ButtonLink>
            </div>

        </Container>
    );
}
