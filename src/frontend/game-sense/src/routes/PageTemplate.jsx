import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header";
import PropTypes from "prop-types";

function PageTemplate({ children }) {
    return (
        <>
            <div className="h-screen">
                <Header />
                    <div className="h-full overflow-scrol">{children}<div className="h-20 w-full"></div></div>    
                <Navbar />
            </div>
        </>
    );
}

PageTemplate.propTypes = {
    children: PropTypes.node,
};

export default PageTemplate;
