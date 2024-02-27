import '/app/globals.css' // Global styles if needed
import Layout from '../components/Layout' // Your layout component

function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}

export default MyApp
