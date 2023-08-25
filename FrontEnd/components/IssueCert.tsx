import { Container } from '../components/Container';
import child_abi from '../utils/child_abi.json';
import factory_abi from '../utils/factory_abi.json';
import factory_address from '../utils/factory_address';
import main from '../utils/ipfs.mjs';

import React, { useEffect, useState } from 'react';

import { clsx } from 'clsx';
import { Address, useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { Button } from './ui/button';
// import { Button } from 'react-day-picker';


export function IssueCertificate() {

    const [userName, setUserName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [certURI, setCertURI] = useState('');
    const [singleAccount, setSingleAccount] = useState<Address>();
    const [certImage, setCertImage] = useState<Blob>();
    const [connectedAddr, setConnectedAddr] = useState("");


    const { address } = useAccount();


    const IssueCert = async () => {
        console.log("creating cert");
        const result = await main(userName, userAddress, certImage);
        setCertURI(result.url);
        console.log(certURI);
        issueCertWrite?.();
    };

    const { config: IssueCertConfig } = usePrepareContractWrite({
        address: singleAccount,
        abi: child_abi,
        functionName: "issueCertificate",
        args: [userName, userAddress, certURI],
    });

    const { data: issueCertData, isLoading: issueCertIsLoading, isError: issueCertIsError, write: issueCertWrite } = useContractWrite(IssueCertConfig);


    const { data: certAddr, isLoading: yourCertIsLoading, isError: yourCertIsError } = useContractRead({
        address: factory_address,
        abi: factory_abi,
        functionName: "SingleAccount",
        args: [connectedAddr ?? "0x00"],
    });

    useEffect(() => {

        setConnectedAddr(address as Address);
        setSingleAccount(certAddr as Address);

    }, [address, certAddr, connectedAddr]);


    return (
        <Container className="pt-20 pb-16 lg:pt-32">
            <form className={clsx("flex flex-col gap-8 mt-4 px-8 py-8 m-auto bg-zinc-50 shadow-2xl shadow-zinc-200 rounded-lg ring-1 ring-zinc-200 lg:max-w-2xl")}>
                <h2 className="mx-auto max-w-4xl font-display text-4xl font-medium tracking-tight text-slate-900 ">
                    Issue Certificate
                </h2>

                <div className='space-y-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="cert_name">User Name</label>
                        <input
                            type="text"
                            name="username"
                            id=""
                            onChange={(e) => { setUserName(e.target.value); }}
                            className='w-full shadow-inner p-2 px-4 ring-1 ring-zinc-200 rounded-md outline-none bg-zinc-50'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="cert_name">User Address</label>
                        <input
                            type="text"
                            name="userAddress"
                            id=""
                            onChange={(e) => { setUserAddress(e.target.value); }}
                            className='w-full shadow-inner p-2 px-4 ring-1 ring-zinc-200 rounded-md outline-none bg-zinc-50'
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label>
                            Certificate Image
                        </label>
                        <input
                            className="py-2 px-2 border border-blue-950 rounded-lg w-full mb-2"
                            type="file"
                            onChange={(e) => {
                                if (!e.target.files) return;
                                setCertImage(e.target.files[0] as Blob);
                            }
                            }
                        />

                    </div>

                </div>
                <div className='flex flex-col gap-3'>
                    <Button onClick={IssueCert}>Issue Certificate</Button>
                </div>
            </form>
        </Container>
    );
}
