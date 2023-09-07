import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

export default function Root() {
    return (<>
        <div className="content">
            <Outlet />
        </div>
        <SideBar />
        <TopBar />
    </>);
}