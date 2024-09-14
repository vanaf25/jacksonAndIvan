import SalesSidebar from '../../components/salesManager/salesSidebar';
import Quotes from '../../components/salesManager/Quotes';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const SalesQuotes = () => {
  return (
    <div className={styles.gridFlex}>
      <SalesSidebar />
      <MainLayout>
        <Quotes />
      </MainLayout>
    </div>
  );
};

export default SalesQuotes;
