import CorporateSidebar from '../../components/corporateManager/CorporateSidebar';
import CustomerArchivesSystem from '../../components/corporateManager/CustomerArchives';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const CustomerArchives = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <CustomerArchivesSystem />
      </MainLayout>
    </div>
  );
};

export default CustomerArchives;
