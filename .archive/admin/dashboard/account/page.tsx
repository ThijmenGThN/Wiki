import { getServerSession } from 'next-auth'

import Name from './Name'

export default async function Page() {

    const session = await getServerSession()

    return (
        <div className='flex flex-col gap-y-6'>
            <Name />
        </div>
    )
}
