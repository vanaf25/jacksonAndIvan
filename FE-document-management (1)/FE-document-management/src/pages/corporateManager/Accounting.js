import CorporateSidebar from '../../components/corporateManager/CorporateSidebar';
import AccountingSystem from '../../components/corporateManager/Accounting';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const Accounting = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <AccountingSystem />
      </MainLayout>
    </div>
  );
};

export default Accounting;
