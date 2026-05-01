import { Footer } from "../components/Footer"
import { Hero } from "../components/Hero"
import { NavBar } from "../components/NavBar"

export const Home = () => {
    return (
        <div className="bg-neutral-300 flex flex-col h-screen overflow-hidden">
            <NavBar />
            <Hero />
            <Footer />
        </div>
    )
}