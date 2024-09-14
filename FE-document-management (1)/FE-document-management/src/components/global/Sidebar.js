import styles from './Sidebar.module.scss';

const Sidebar = ({ children }) => (
  <div className={styles.sidebarContainer}>
    <div className={styles.sidebar}>{children}</div>
  </div>
);

export default Sidebar;
