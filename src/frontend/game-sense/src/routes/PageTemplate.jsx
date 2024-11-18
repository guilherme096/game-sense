import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header";

function PageTemplate({ children }) {
    return (
        <>
            <div className="h-screen">
                <Header />
                        <div className="h-full overflow-scroll">{children}<div className="h-20 w-full"></div></div>    
                <Navbar />
            </div>
        </>
    );
}

export default PageTemplate;
