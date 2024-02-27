import styles from '../app/page.module.css'

export default function Nav({ pages }) {
    console.log('pages ', pages)

    return (
        <nav className={styles.nav}>
            <ul>
                {
                    pages?.map((page) => {
                        return (
                            <li key={page.id}><a href={`/${page.slug}`}>{page.title}</a></li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}
