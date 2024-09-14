import ProductionSidebar from '../../components/productionManager/ProductionSidebar';
import Training from '../../components/productionManager/Training';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const ProductionTraining = () => {
  return (
    <div className={styles.gridFlex}>
      <ProductionSidebar />
      <MainLayout>
        <Training />
      </MainLayout>
    </div>
  );
};

export default ProductionTraining;
