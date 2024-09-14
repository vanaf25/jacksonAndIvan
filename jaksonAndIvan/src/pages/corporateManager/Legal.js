import CorporateSidebar from '../../components/corporateManager/CorporateSidebar';
import LegalSystem from '../../components/corporateManager/Legal';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const Legal = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <LegalSystem />
      </MainLayout>
    </div>
  );
};

export default Legal;
