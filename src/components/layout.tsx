import { Outlet } from "react-router-dom";

export default function Layout(){
    return(
        <>
            <h2>layout</h2>
            <Outlet />
            {/* <Outlet /> is a placeholder that tells React Router that after render parent route, render children routes in <Outlet /> in it*/}
        </>
    );
}