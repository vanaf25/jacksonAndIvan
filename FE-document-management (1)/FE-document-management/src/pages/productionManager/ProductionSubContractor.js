import ProductionSidebar from '../../components/productionManager/ProductionSidebar';
import SubContractor from '../../components/productionManager/SubContractor';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const ProductionSubContractor = () => {
  return (
    <div className={styles.gridFlex}>
      <ProductionSidebar />
      <MainLayout>
        <SubContractor />
      </MainLayout>
    </div>
  );
};

export default ProductionSubContractor;
