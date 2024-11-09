import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header";

function PageTemplate({ children }) {
    return (
        <>
            <Header />
            {children}
            <Navbar />
        </>
    );
}

export default PageTemplate;
