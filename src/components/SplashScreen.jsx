import {faThreads} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SplashScreen = ({ isFading }) => {
    return (
        <div className={`fixed inset-0 bg-background flex flex-col justify-between items-center z-60 ${isFading ? 'animate-fade-out' : 'animate-fade-in'}`}>

            {/* Top - Empty để logo ở giữa */}
            <div></div>

            {/* Middle - Logo */}
            <div>
                <FontAwesomeIcon
                    className={`text-7xl font-bold transition-all duration-300 ${
                        isFading ? 'animate-zoom-fade' : ''
                    }`}
                    icon={faThreads}
                />
            </div>

            {/* Bottom - Signature */}
            <div className="mb-8 font-semibold text-xl text-foreground transition-all duration-300">
                Made by Nguyen Minh Khoi with ❤️
            </div>

        </div>
    )
}

export default SplashScreen
