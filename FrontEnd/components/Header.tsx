import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';

import { Container } from '../components/Container';
import { ClassAttributes, Fragment, JSX, SVGProps, HTMLAttributes, useEffect, useRef, JSXElementConstructor, ReactNode, HTMLProps, RefObject, CSSProperties, MutableRefObject, StyleHTMLAttributes } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function CloseIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path
                d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ChevronDownIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
            <path
                d="M1.75 1.75 4 4.25l2.25-2.5"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}


function MobileNavItem({ href, children }: {href: string, children: ReactNode}) {
    return (
        <li>
            <Popover.Button as={Link} href={href} className="block py-2">
                {children}
            </Popover.Button>
        </li>
    );
}

function MobileNavigation(props: HTMLAttributes<HTMLElement> ) {
    return (
        <Popover {...props}>
            <Popover.Button className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur ">
                Menu
                <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 " />
            </Popover.Button>
            <Transition.Root>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm " />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Popover.Panel
                        focus
                        className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 "
                    >
                        <div className="flex flex-row-reverse items-center justify-between">
                            <Popover.Button aria-label="Close menu" className="-m-1 p-1">
                                <CloseIcon className="h-6 w-6 text-zinc-500 " />
                            </Popover.Button>
                            <h2 className="text-sm font-medium text-zinc-600 ">
                                Navigation
                            </h2>
                        </div>
                        <nav className="mt-6">
                            <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 ">
                                <MobileNavItem href="/about">About</MobileNavItem>
                                <MobileNavItem href="/create">Create</MobileNavItem>
                                <MobileNavItem href="/verify">Verify</MobileNavItem>
                                <MobileNavItem href="/insti">Institutions</MobileNavItem>
                                <MobileNavItem href="/uses">Cases</MobileNavItem>
                            </ul>
                        </nav>
                    </Popover.Panel>
                </Transition.Child>
            </Transition.Root>
        </Popover>
    );
}

function NavItem({ href, children }: { href: string, children: ReactNode; }) {
    let isActive = useRouter().pathname === href;

    return (
        <li>
            <Link
                href={href}
                className={clsx(
                    'relative block px-3 py-2 transition',
                    isActive
                        ? 'text-blue-700 '
                        : 'hover:text-blue-500 '
                )}
            >
                {children}
                {isActive && (
                    <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-blue-700/0 via-blue-700/40 to-blue-700/0" />
                )}
            </Link>
        </li>
    );
}

function DesktopNavigation(props: JSX.IntrinsicAttributes & ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement>) {
    return (
        <nav {...props}>
            <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur ">
                <NavItem href="/about">About</NavItem>
                <NavItem href="/create">Create</NavItem>
                <NavItem href="/verify">Verify</NavItem>
                <NavItem href="/insti">Institutions</NavItem>
                <NavItem href="/uses">Cases</NavItem>
            </ul>
        </nav>
    );
}


function clamp(number: number, a: number, b: number) {
    let min = Math.min(a, b);
    let max = Math.max(a, b);
    return Math.min(Math.max(number, min), max);
}



export function Header() {
    let isHomePage = useRouter().pathname === '/';

    let headerRef: MutableRefObject<HTMLDivElement | null | undefined> = useRef();
    let avatarRef: MutableRefObject<HTMLDivElement | null | undefined> = useRef();
    let isInitial: MutableRefObject<boolean> = useRef(true);

    useEffect(() => {
        let downDelay = avatarRef.current?.offsetTop ?? 0;
        let upDelay = 64;

        function setProperty(property: string, value: string | null) {
            document.documentElement.style.setProperty(property, value);
        }

        function removeProperty(property: string) {
            document.documentElement.style.removeProperty(property);
        }

        function updateHeaderStyles() {
            let rect = headerRef.current?.getBoundingClientRect();
            let top = rect?.top;
            let height = rect?.height;

            let scrollY = clamp(
                window.scrollY,
                0,
                document.body.scrollHeight - window.innerHeight
            );

            if (isInitial.current) {
                setProperty('--header-position', 'sticky');
            }

            setProperty('--content-offset', `${downDelay}px`);

            if (top && height)

            if (isInitial.current || scrollY < downDelay) {
                setProperty('--header-height', `${downDelay + height}px`);
                setProperty('--header-mb', `${-downDelay}px`);
            } else if (top + height < -upDelay) {
                let offset = Math.max(height, scrollY - upDelay);
                setProperty('--header-height', `${offset}px`);
                setProperty('--header-mb', `${height - offset}px`);
            } else if (top === 0) {
                setProperty('--header-height', `${scrollY + height}px`);
                setProperty('--header-mb', `${-scrollY}px`);
            }

            if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
                setProperty('--header-inner-position', 'fixed');
                removeProperty('--header-top');
                removeProperty('--avatar-top');
            } else {
                removeProperty('--header-inner-position');
                setProperty('--header-top', '0px');
                setProperty('--avatar-top', '0px');
            }
        }


        function updateStyles() {
            updateHeaderStyles();
            isInitial.current = false;
        }

        updateStyles();
        window.addEventListener('scroll', updateStyles, { passive: true });
        window.addEventListener('resize', updateStyles);

        return () => {
            window.removeEventListener('scroll', updateStyles);
            window.removeEventListener('resize', updateStyles);
        };
    }, [isHomePage]);

    return (
        <>
            <header
                className="pointer-events-none relative z-50 flex flex-col"
                style={{
                    height: 'var(--header-height)',
                    marginBottom: 'var(--header-mb)',
                }}
            >
                {isHomePage && (
                    <>
                        <div
                            ref={avatarRef as unknown as RefObject<HTMLDivElement>}
                            className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
                        />
                        <Container
                            className="top-0 order-last -mb-3 pt-3"
                            style={{ position: 'var(--header-position)' as any }}
                        >
                            <div
                                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                                style={{ position: 'var(--header-inner-position)' as any }}
                            >
                                <div className="relative">
                                    {/* <AvatarContainer
                                        className="absolute left-0 top-3 origin-left transition-opacity"
                                        style={{
                                            opacity: 'var(--avatar-border-opacity, 0)',
                                            transform: 'var(--avatar-border-transform)',
                                        }}
                                    /> */}
                                    {/* <Avatar
                                        large
                                        className="block h-16 w-16 origin-left"
                                        style={{ transform: 'var(--avatar-image-transform)' }}
                                    /> */}
                                </div>
                            </div>
                        </Container>
                    </>
                )}
                <div
                    ref={headerRef as unknown as RefObject<HTMLDivElement>}
                    className="top-0 z-10 h-16 pt-6"
                    style={{ position: 'var(--header-position)' as any}}
                >
                    <Container
                        className="top-[var(--header-top,theme(spacing.6))] w-full"
                        style={{ position: 'var(--header-inner-position)' } as unknown as CSSProperties}
                    >
                        <div className="relative flex gap-4">
                            <div className="flex flex-1">
                            </div>
                            <div className="flex flex-1 justify-end md:justify-center">
                                <MobileNavigation className="pointer-events-auto md:hidden" />
                                <DesktopNavigation className="pointer-events-auto hidden md:block" />
                            </div>
                            <div className="flex justify-end md:flex-1">
                                <div className="pointer-events-auto">
                                    <ConnectButton />
                                    {/* <ModeToggle /> */}
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </header>
            {isHomePage && <div style={{ height: 'var(--content-offset)' }} />}
        </>
    );
}