import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts";
import { publicRoutes } from "./routes";

function App() {
    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                        
                    }   
                    console.log(route);
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            element={
                                <Layout>
                                    <Page/>
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
