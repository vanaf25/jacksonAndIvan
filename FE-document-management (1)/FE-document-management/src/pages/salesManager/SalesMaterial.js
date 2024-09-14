import SalesSidebar from '../../components/salesManager/salesSidebar';
import Materials from '../../components/salesManager/SalesMaterials';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const SalesManager = () => {
  return (
    <div className={styles.gridFlex}>
      <SalesSidebar />
      <MainLayout>
        <Materials />
      </MainLayout>
    </div>
  );
};

export default SalesManager;
