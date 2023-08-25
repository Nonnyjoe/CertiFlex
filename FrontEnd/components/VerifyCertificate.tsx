import Image from 'next/image';
import { ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import factory_abi from '../utils/factory_abi.json';
import factory_address from '../utils/factory_address';

import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "./ui/card"
import { clsx } from 'clsx';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';


export function VerifyCertificate() {

    const [certName, setCertHash] = useState('');
    const [allYourCert, setAllYourCert] = useState("");
    const [addr, setAddr] = useState("");


    const {address} = useAccount();


    const CreateCert = () => {
        console.log("creating cert")
        createCertWrite?.();
    }

    const {config: CreateCertConfig} = usePrepareContractWrite({
        address: factory_address,
        abi: factory_abi,
        functionName: "CreateAccount",
        args: [certName],
    })

    const {data: createCertData, isLoading: createCertIsLoading, isError: createCertIsError, write: createCertWrite} = useContractWrite(CreateCertConfig)


    const {data: yourCert, isLoading: yourCertIsLoading, isError: yourCertIsError} = useContractRead({
        address: factory_address,
        abi: factory_abi,
        functionName: "getAllCertificates",
        args: [addr],
    })

    useEffect(() => {

        setAddr(address || "");
        // setAllYourCert(yourCert);
        
    }, [addr, address, yourCert])


    return (
        <Container className="pt-20 pb-16 text-center lg:pt-32">
            <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
                Verify the authenticity of any certificate
            </h1>


            <div className='flex flex-col gap-3'>
                <p>Verify certificate form</p>
                <label htmlFor="cert_name">Certificate Hash
                    <input type="text" className='border rounded-sm' name="cert_name" id="" onChange={(e) => {setCertHash(e.target.value)}}/>
                </label>
                <button type="submit" onClick={CreateCert}>Verify Certificate</button>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
                These are the lists of certificates you can verify
            </p>


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
