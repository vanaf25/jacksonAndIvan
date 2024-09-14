import SalesSidebar from '../../components/salesManager/salesSidebar';
import Presentations from '../../components/salesManager/SalesPresentations';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const SalesPresentations = () => {
  return (
    <div className={styles.gridFlex}>
      <SalesSidebar />
      <MainLayout>
        <Presentations />
      </MainLayout>
    </div>
  );
};

export default SalesPresentations;
