import Image from 'next/image';
import { ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import child_abi from '../utils/child_abi.json';
import factory_abi from '../utils/factory_abi.json';
import factory_address from '../utils/factory_address';
import main from '../utils/ipfs.mjs';
import {shortenHex} from "../utils/ShortenHex";

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


export function IssueCertificate() {

    const [userName, setUserName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [certURI, setCertURI] = useState('');
    const [singleAccount, setSingleAccount] = useState("");
    const [certImage, setCertImage] = useState();
    const [connectedAddr, setConnectedAddr] = useState("");


    const {address} = useAccount();


    const IssueCert = async () => {
        console.log("creating cert")
        const result = await main(userName, userAddress, certImage);
        setCertURI(result.url)
        console.log(certURI);
        issueCertWrite?.();
    }

    const {config: IssueCertConfig} = usePrepareContractWrite({
        address: singleAccount,
        abi: child_abi,
        functionName: "issueCertificate",
        args: [userName, userAddress, certURI],
    })

    const {data: issueCertData, isLoading: issueCertIsLoading, isError: issueCertIsError, write: issueCertWrite} = useContractWrite(IssueCertConfig)


    const {data: certAddr, isLoading: yourCertIsLoading, isError: yourCertIsError} = useContractRead({
        address: factory_address,
        abi: factory_abi,
        functionName: "SingleAccount",
        args: [connectedAddr ?? "0x00"],
    })

    useEffect(() => {

        setConnectedAddr(address || "");
        setSingleAccount(certAddr || "");
        
    }, [connectedAddr])


    return (
        <Container className="pt-20 pb-16 text-center lg:pt-32">
            <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
                Welcome, {shortenHex(connectedAddr, 10)}
            </h1>

            <div className='flex flex-col gap-3'>
                <p>Issue certificate form</p>
                <label htmlFor="userName">User Name
                    <input type="text" className='border rounded-sm' name="userName" id="" onChange={(e) => {setUserName(e.target.value)}}/>
                </label>
                <label htmlFor="userAddress">User Address
                    <input type="text" className='border rounded-sm' name="userAddress" id="" onChange={(e) => {setUserAddress(e.target.value)}} />
                </label>
                <label>
                    Certificate Image
                    <input
                        className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                        type="file"
                        onChange={(e) => setCertImage(e.target.files[0])}
                    />
                </label>
                <button type="submit" onClick={IssueCert}>Issue Certificate</button>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
                These are the lists of certificates you&apos;ve created
            </p>

            <div className={clsx('mx-auto mt-6 max-w-2xl ', 'flex flex-wrap gap-6')}>
                <Card
                    className={clsx('')}
                > 
                    <CardContent>
                    </CardContent>
                    <CardTitle>Ayathon Participation</CardTitle>
                    <CardHeader>Certificate of Participation</CardHeader>
                </Card>
                <Card> 
                    <CardContent>
                    </CardContent>
                    <CardTitle>Ayathon Winner</CardTitle>
                    <CardHeader>Certificate of Award</CardHeader>
                </Card>
                <Card> 
                    <CardContent>
                    </CardContent>
                    <CardHeader>Certificate of Award</CardHeader>
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
