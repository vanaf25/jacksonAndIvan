import SalesSidebar from '../../components/salesManager/salesSidebar';
import Sales from '../../components/salesManager/SalesSystem';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const SalesSystem = () => {
  return (
    <div className={styles.gridFlex}>
      <SalesSidebar />
      <MainLayout>
        <Sales />
      </MainLayout>
    </div>
  );
};

export default SalesSystem;
