import Image from 'next/image';
import { ButtonLink } from '../components/Button';
import { Container } from '../components/Container';
import factory_abi from '../utils/factory_abi.json';
import factory_address from '../utils/factory_address';
import child_abi from '../utils/child_abi.json';
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
import { useDisclosure } from '@chakra-ui/react'
import Verified from '../pages/verify/components/Verified';
import ErrorDialog from '../pages/verify/components/Error';


export function VerifyCertificate() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [verifiedStatus, setVerifiedStatus] = useState(false);
    const [ErrorStatus, setErrorStatus] = useState(false);

    const [certHash, setCertHash] = useState('');
    const [allYourCert, setAllYourCert] = useState("");
    const [addr, setAddr] = useState("");
    const [childAddr, setChildAddr] = useState<any>(`0x${'string'}`);
    const [certOwnerName, setcertOwnerName] = useState("");
    const [certOwnerAddr, setcertOwnerAddr] = useState("");
    const [certId, setcertId] = useState("");
    const [certUri, setcertUri] = useState("");
    const [certIssuedTime, setcertIssuedTime] = useState("");



    const {address} = useAccount();


    const CreateCert = () => {
        console.log("creating cert")
        createCertWrite?.();
    }

    const {config: CreateCertConfig} = usePrepareContractWrite({
        address: factory_address,
        abi: factory_abi,
        functionName: "CreateAccount",
        args: [certHash],
    })

    const {data: createCertData, isLoading: createCertIsLoading, isError: createCertIsError, write: createCertWrite} = useContractWrite(CreateCertConfig)

    // INTEGRATION TO VERIFY A CERTIFICATE USING A CERT HASH
    // it first maes a call to get the address of the company that issued the cert
    // then another call verifies the hash from the company address
    const verifyByHash = () => {
        console.log("Verifying cert by hash")
        // setVerifiedStatus(true)
        // setErrorStatus(true)
       
    }
    const {data: getCompanyData, isLoading: getCompanyDataIsLoading, isError: getCompanyDataIsError} = useContractRead({
        address: factory_address,
        abi: factory_abi,
        functionName: "verifyCertificates1",
        watch: true,
        args: [certHash],
        onSuccess(data: string) {
            console.log('Success', getCompanyData)
            setChildAddr(data);
        },
    })
    const {data: certificateData, isLoading: certificateDataIsLoading, isError: certificateDataIsError} = useContractRead({
        address: childAddr ? childAddr : " ",
        abi: child_abi,
        functionName: "verifyCertificate",
        watch: true,
        args: [certHash],
        onSuccess(data) {
            console.log('Success', certificateData)

        },
    })

    // THIS WILL RETURN ALL THE CERTIFICATES A USER HAS
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
            {verifiedStatus && <Verified open={isOpen} close={onClose} />}
            {ErrorStatus && <ErrorDialog open={isOpen} close={onClose} />}
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
                        className='w-full shadow-inner p-2 px-4 ring-1 ring-zinc-200 rounded-md outline-none bg-zinc-50'
                    />
                </div>
                <Button type="button" onClick={(e) =>{e.preventDefault; verifyByHash;  onOpen(); setVerifiedStatus(true)}}>Verify Certificate</Button>

                </form>
        </Container>
    );
}
