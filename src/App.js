import { Navigate, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts";
import { publicRoutes } from "./routes";
import { useSelector } from "react-redux";

function App() {
    const { accessToken, accountId } = useSelector((state) => state.authReducer);

    return (
        <div className="App">
            {
                (accessToken == "" && accountId == 0) && <Navigate to="/admin/auth/sign-in" />
            }
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;

                    }
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            element={
                                <Layout>
                                    <Page />
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
