
export default function Page() {

    return (
        <div className="overflow-hidden rounded-md bg-white shadow">
            <ul role="list" className="divide-y divide-gray-200">
                <li className="px-6 py-4">
                    <p className="font-semibold">Adjusting items in the sidebar</p>
                    <p className="m-2">src/components/interface/Sidebar.tsx</p>
                </li>

                <li className="px-6 py-4">
                    <p className="font-semibold">Examples on how to build certain pages</p>
                    <p className="m-2">app/dashboard/**/*</p>
                </li>
            </ul>
        </div>
    )
}