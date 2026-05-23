import { Footer } from "../components/Footer"
import { Hero } from "../components/Hero"
import { NavBar } from "../components/NavBar"

export const Home = () => {
    return (
        <div className="bg-neutral-100 flex flex-col h-dvh overflow-hidden">
            <NavBar />
            <Hero />
            <Footer />
        </div>
    )
}