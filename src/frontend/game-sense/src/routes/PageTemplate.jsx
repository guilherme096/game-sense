import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header";

function PageTemplate({ children }) {
    return (
        <>
            <div className=" pb-20">
                <Header />
                {children}
                <Navbar />
            </div>
        </>
    );
}

export default PageTemplate;
