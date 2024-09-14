import ProductionSidebar from '../../components/productionManager/ProductionSidebar';
import Pictures from '../../components/productionManager/Pictures';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const ProductionPictures = () => {
  return (
    <div className={styles.gridFlex}>
      <ProductionSidebar />
      <MainLayout>
        <Pictures />
      </MainLayout>
    </div>
  );
};

export default ProductionPictures;
