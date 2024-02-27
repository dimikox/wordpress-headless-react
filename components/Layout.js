import styles from "../app/page.module.css";
import Nav from './Nav'
import useData from "../store/useData";
import {useEffect} from "react";


const Layout = ({ children }) => {
    const { pages, getPages } = useData();

    useEffect(() => {
        getPages();
    }, []);

    return (
        <>
            <Nav pages={pages} />
            <main className={styles.main}>{children}</main>
        </>
    );
};

export default Layout;
