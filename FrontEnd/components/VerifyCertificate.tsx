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
import { Button } from './ui/button';


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
        <Container className={clsx("pt-20 pb-16 lg:pt-32")}>
            <form className={clsx("flex flex-col gap-8 mt-4 px-8 py-8 m-auto bg-zinc-50 shadow-2xl shadow-zinc-200 rounded-lg ring-1 ring-zinc-200 lg:max-w-2xl")}>
                <h2 className="mx-auto max-w-4xl font-display text-4xl font-medium tracking-tight text-slate-900 ">
                    Verify certificate form
                </h2>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="cert_hash">Certificate Hash</label>
                    <input
                        type="text"
                        name="cert_hash"
                        id=""
                        onChange={(e) => { setCertHash(e.target.value); }}
                        className='w-full shadow-inner p-2 px-4 ring-1 ring-zinc-200 rounded-md outline-none bg-zinc-50 z-50'
                    />
                </div>
                <Button type="submit" onClick={CreateCert}>Verify Certificate</Button>

                </form>
        </Container>
    );
}
