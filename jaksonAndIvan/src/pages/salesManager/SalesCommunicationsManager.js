import SalesSidebar from '../../components/salesManager/salesSidebar';
import Communications from '../../components/salesManager/CommunicationsManager';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const SalesCommunications = () => {
  return (
    <div className={styles.gridFlex}>
      <SalesSidebar />
      <MainLayout>
        <Communications />
      </MainLayout>
    </div>
  );
};

export default SalesCommunications;
