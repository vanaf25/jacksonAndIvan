import ProductionSidebar from '../../components/productionManager/ProductionSidebar';
import ServiceCall from '../../components/productionManager/ServiceCall';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const ProductionService = () => {
  return (
    <div className={styles.gridFlex}>
      <ProductionSidebar />
      <MainLayout>
        <ServiceCall />
      </MainLayout>
    </div>
  );
};

export default ProductionService;
