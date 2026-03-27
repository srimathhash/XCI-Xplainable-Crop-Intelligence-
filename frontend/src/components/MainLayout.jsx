import { Outlet } from 'react-router-dom'
import TopNavbar from './TopNavbar'

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen relative z-0">
            <TopNavbar />
            <main className="flex-1 mt-[80px]">
                <Outlet />
            </main>
            <footer className="text-center py-24 text-appSecondaryText text-[14px]">
                © XCI
            </footer>
        </div>
    )
}
