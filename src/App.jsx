import Header from "./components/header/Header";
import RouteController from "./routes";
import { useLocation } from "react-router-dom";
import AppLayout from "./utils/AppLayout";
import { useEffect } from "react";

function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [pathname]);
    return (
        <>
            {pathname.includes("/auth") ? null : <Header />}
            <AppLayout>
                <RouteController />
            </AppLayout>
        </>
    );
}

export default App;
