import Image from 'next/image';
import { ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import factory_abi from '../utils/factory_abi.json';
import factory_address from '../utils/factory_address';

import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"
import { clsx } from 'clsx';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';


export function Institutions() {

    const [AllAccounts, setAllAccounts] = useState([]);


    const {data: allAccounts, isLoading: yourCertIsLoading, isError: yourCertIsError} = useContractRead({
        address: factory_address,
        abi: factory_abi,
        functionName: "AllAccounts",
    })

    useEffect(() => {

        // setAllAccounts(allAccounts);
        console.log(allAccounts);

        
    }, [AllAccounts, allAccounts])


    return (
        <Container className="pt-20 pb-16 text-center lg:pt-32">
            <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
                Institutions working with us
            </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
                    These are the lists of institutions that trust our service
                </p>
            <div className={clsx('mx-auto mt-6 max-w-2xl ', 'flex flex-wrap gap-6')}>
                <Card
                    className={clsx('')}
                > 
                    <CardContent>
                    </CardContent>
                    <CardTitle>Web3Bridge</CardTitle>
                    <CardHeader>Name of Institution</CardHeader>
                </Card>
                <Card> 
                    <CardContent>
                    </CardContent>
                    <CardTitle>Aya Varsity</CardTitle>
                    <CardHeader>Name of Institution</CardHeader>
                </Card>
                <Card> 
                    <CardContent>
                    </CardContent>
                    <CardTitle>Web3 Afrika</CardTitle>
                    <CardHeader>Name of Institution</CardHeader>
                </Card>

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
