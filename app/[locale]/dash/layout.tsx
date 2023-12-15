"use client"

import Image from 'next/image'
import { useFormatter, useTranslations } from 'next-intl'
import React, { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Link, usePathname, useRouter } from '@/helpers/navigation'

import pb from '@/helpers/pocketbase'
import gravatar from '@/helpers/gravatar'
import { classNames } from '@/helpers/tailwind'

import {
    Bars3Icon,
    BellAlertIcon,
    BellIcon,
    HomeIcon,
    TrashIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'

import assetLogo from '@/assets/logo.webp'

interface typeNotification {
    id: string
    title: string
    message: string
    created: string
}

const navigation = [
    { name: 'Dashboard', href: '/dash', icon: HomeIcon }
]

export default function Layout({ children }: { children: React.ReactNode }) {
    const t = useTranslations('dash')
    const { dateTime } = useFormatter()
    const router = useRouter()
    const pathname = usePathname()

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [authEmail, setAuthEmail] = useState<string>()
    const [avatar, setAvatar] = useState<string>(gravatar('next@leaflet.app'))
    const [notifications, setNotifications] = useState<Array<typeNotification>>([])

    const deleteNotification = (id: string) => pb.collection('notifications').delete(id)

    const updateNotifications = () => pb.collection('notifications').getFullList({ sort: '-created' })
        .then(records => setNotifications(records.map(({ id, title, message, created }) => ({ id, title, message, created }))))
        .catch(e => setNotifications([]))

    async function signOut() {
        await pb.authStore.clear()
        router.push('/login')
    }

    useEffect(() => {
        setAvatar(gravatar())
        setAuthEmail(pb.authStore.model?.email)
        updateNotifications()
    }, [])

    useEffect(() => {
        pb.collection('notifications').subscribe('*', e => updateNotifications())
        return () => { pb.collection('notifications').unsubscribe('*') }
    }, [])

    return (
        <div className='min-h-screen bg-gray-50'>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                        <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </button>
                                    </div>
                                </Transition.Child>
                                {/* Sidebar component, swap this element with another sidebar if you like */}
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <Image
                                            className="h-8 w-auto"
                                            src={assetLogo}
                                            alt=""
                                        />
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                            <li>
                                                <ul role="list" className="-mx-2 space-y-1">
                                                    {navigation.map((item) => (
                                                        <li key={item.name}>
                                                            <Link
                                                                href={item.href}
                                                                className={classNames(
                                                                    item.href == pathname
                                                                        ? 'bg-gray-50 text-primary'
                                                                        : 'text-gray-700 hover:text-primary hover:bg-gray-50',
                                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                )}
                                                            >
                                                                <item.icon
                                                                    className={classNames(
                                                                        item.href == pathname ? 'text-primary' : 'text-gray-400 group-hover:text-primary',
                                                                        'h-6 w-6 shrink-0'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
                    <div className="flex h-16 shrink-0 items-center">
                        <Image
                            className="h-8 w-auto"
                            src={assetLogo}
                            alt=""
                        />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={classNames(
                                                    item.href == pathname
                                                        ? 'bg-gray-50 text-primary'
                                                        : 'text-gray-700 hover:text-primary hover:bg-gray-50',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                )}
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        item.href == pathname ? 'text-primary' : 'text-gray-400 group-hover:text-primary',
                                                        'h-6 w-6 shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm sm:px-6 backdrop-blur-sm bg-white/50">
                <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex-1 text-sm font-semibold leading-6 text-gray-900 capitalize">
                    {navigation.find(record => record.href == pathname)?.name}
                </div>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                    {/* Notifications dropdown */}
                    <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="-m-1.5 flex items-center p-1.5 text-gray-400 hover:text-gray-500">
                            {notifications.length > 0
                                ? <BellAlertIcon className="h-6 w-6 text-primary" aria-hidden="true" />
                                : <BellIcon className="h-6 w-6" aria-hidden="true" />
                            }
                        </Menu.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-64 md:w-96 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <p className="px-4 py-3">
                                    {t('notifications')}
                                </p>
                                <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                                    {notifications.length > 0
                                        ? notifications.map((notify, index) => (
                                            <li className='px-4 py-3 flex gap-x-4 justify-between items-center' key={index}>
                                                <div className='flex flex-col gap-y-2 text-sm'>
                                                    <p className='font-semibold'>{notify.title}</p>
                                                    <p>{notify.message}</p>
                                                    <p className='text-xs text-gray-500'>
                                                        {t('received-on-datetime', {
                                                            datetime: dateTime(new Date(notify.created), {
                                                                "day": "numeric",
                                                                "hour": "numeric",
                                                                "minute": "numeric",
                                                                "month": "short"
                                                            })
                                                        })}
                                                    </p>
                                                </div>
                                                <button className='-m-1.5 p-1.5'
                                                    onClick={() => deleteNotification(notify.id)}
                                                >
                                                    <TrashIcon className="h-6 w-6 text-gray-500 hover:text-gray-600" aria-hidden="true" />
                                                </button>
                                            </li>
                                        ))
                                        : (
                                            <li className='px-4 py-6 flex flex-col gap-y-2 items-center'>
                                                {t('youre-all-caught-up')}
                                            </li>
                                        )
                                    }
                                </ul>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                    {/* Separator */}
                    <div className="h-6 w-px bg-gray-200" aria-hidden="true" />

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative inline-block text-left">
                        <Menu.Button className="-m-1.5 flex items-center p-1.5">
                            <Image
                                className="h-8 w-8 rounded-full bg-gray-50"
                                src={avatar}
                                width={128}
                                height={128}
                                alt=""
                            />
                        </Menu.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-4 py-3">
                                    <p className="text-sm">
                                        {t('signed-in-as')}
                                    </p>
                                    <p className="truncate text-sm font-medium text-gray-900">
                                        {authEmail}
                                    </p>
                                </div>
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                href="/dash/account"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                            >
                                                {t('account')}
                                            </Link>
                                        )}
                                    </Menu.Item>
                                </div>
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={signOut}
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block w-full px-4 py-2 text-left text-sm'
                                                )}
                                            >
                                                {t('sign-out')}
                                            </button>
                                        )}
                                    </Menu.Item>
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>

            <main className="py-10 lg:pl-72">
                <div className="px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

