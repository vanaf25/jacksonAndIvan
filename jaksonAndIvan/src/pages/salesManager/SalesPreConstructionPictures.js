import SalesSidebar from '../../components/salesManager/salesSidebar';
import Construction from '../../components/salesManager/PreConstructionPictures';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const SalesConstruction = () => {
  return (
    <div className={styles.gridFlex}>
      <SalesSidebar />
      <MainLayout>
        <Construction />
      </MainLayout>
    </div>
  );
};

export default SalesConstruction;
