import styles from './UserList-Layout_module.css'

export default function Layout({ children }) {
    return <div className={styles.container}>{children}</div>
}