
interface iExploreItem {
    name: string
    description: string
}

const explore = [
    {
        name: 'Catalogue',
        description: 'A searchable knowledge base packed with solutions to common issues.'
    },
    {
        name: 'Docker',
        description: 'Easily deploy containers using pre-written scripts.'
    },
    {
        name: 'Linux',
        description: 'Automated scripts to install various services on multiple distros, with a focus on Ubuntu.'
    },
    {
        name: 'Proxmox',
        description: 'Guides and notes to simplify the configuration of your Proxmox environment.'
    },
    {
        name: 'Servers',
        description: 'Comprehensive documentation specifically tailored to each individual service.'
    }
]

export default function Explore() {
    return (
        <div className="flex flex-col gap-y-4 mt-16 mx-8 sm:mx-16">
            <b>
                Explore
            </b>
            <ul className="grid gap-4 md:grid-cols-2">
                {
                    explore.map((item: iExploreItem, index: number) => (
                        <li className="flex flex-col gap-y-2 rounded bg-gray-50 border p-4 shadow-sm hover:cursor-pointer hover:bg-gray-100"
                            key={index}
                        >
                            {item.name}
                            <p className="text-xs text-neutral">
                                {item.description}
                            </p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
