
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen overflow-y-scroll bg-gray-50">
            {children}
        </div>
    )
}
