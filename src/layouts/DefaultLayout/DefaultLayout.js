import Header from "~/layouts/Header";
import Footer from "~/layouts/Footer";
import SideBar from "~/layouts/SideBar";
function DefaultLayout({children}) {
    return (

            <div className="main">
                <div className="side-bar">
                    <SideBar/>
                </div>
                <div className="wrap-content">
                <Header/>
                    <div className="content">
                        {children}
                    </div>
                <Footer/>
                </div>

            </div>



    )

}

export default DefaultLayout;