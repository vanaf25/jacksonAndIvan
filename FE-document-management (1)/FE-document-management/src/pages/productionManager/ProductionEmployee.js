import ProductionSidebar from '../../components/productionManager/ProductionSidebar';
import Employee from '../../components/productionManager/Employee';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const ProductionEmployee = () => {
  return (
    <div className={styles.gridFlex}>
      <ProductionSidebar />
      <MainLayout>
        <Employee />
      </MainLayout>
    </div>
  );
};

export default ProductionEmployee;
