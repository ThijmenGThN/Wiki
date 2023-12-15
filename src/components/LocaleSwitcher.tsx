"use client"

import { Fragment } from 'react'
import { useLocale } from 'next-intl'
import { CheckIcon } from '@heroicons/react/20/solid'
import { Listbox, Transition } from '@headlessui/react'

import { classNames } from '@/helpers/tailwind'
import { locales, Link, usePathname } from '@/helpers/navigation'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

export default function Component() {
    const locale = useLocale()
    const path = usePathname()

    return (
        <Listbox value={locale}>
            {
                ({ open }) =>
                    <div className="relative">
                        <Listbox.Button className="rounded-md pl-2.5 bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none hover:ring-2 hover:ring-primary sm:text-sm sm:leading-6 hover:cursor-pointer">
                            <div className='flex w-16 gap-x-2 items-center'>
                                <GlobeAltIcon className='h-5 w-5' />
                                <p className='py-1.5'>
                                    {locale.toUpperCase()}
                                </p>
                            </div>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 right-0 mt-1 max-h-60 w-[4.6rem] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {
                                    locales.map((lang, index) => (
                                        <Link href={path} locale={lang} key={index}>
                                            <Listbox.Option
                                                className={
                                                    ({ active }) => classNames(
                                                        active ? 'bg-primary text-white' : 'text-gray-900',
                                                        'relative cursor-default select-none py-2 pl-8 pr-4 hover:cursor-pointer'
                                                    )
                                                }
                                                value={lang}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                            {lang.toUpperCase()}
                                                        </span>

                                                        {
                                                            selected
                                                                ? (
                                                                    <span
                                                                        className={classNames(
                                                                            active ? 'text-white' : 'text-primary',
                                                                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                        )}
                                                                    >
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                )
                                                                : null
                                                        }
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        </Link>
                                    ))
                                }
                            </Listbox.Options>
                        </Transition>
                    </div>
            }
        </Listbox>
    )
}