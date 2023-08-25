import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Hero } from '../../components/Hero';
import { Header } from '../../components/Header';
import { VerifyCertificate } from '../../components/VerifyCertificate';

const Home: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Certify - Generate and verify certificates with ease</title>
                <meta
                    content="Generated by @rainbow-me/create-rainbowkit"
                    name="description"
                />
                <link href="/favicon.ico" rel="icon" />
            </Head>
            <main>
                <Header />
                <VerifyCertificate />
            </main>
        </div>
    );
};

export default Home;