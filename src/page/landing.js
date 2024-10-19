import { useNavigate } from "react-router-dom"

function Landing() {
    const navigate = useNavigate()

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    Welcome to Unsplash Photo Gallery
                </h1>
                <button onClick={() => navigate("/photos")} size="lg" className="hover:bg-black/40 text-lg px-6 py-3 bg-black text-white rounded">
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default Landing