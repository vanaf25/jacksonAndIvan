import CorporateSidebar from '../../../components/corporateManager/CorporateSidebar';
import Health from '../../../components/corporateManager/InsureanceDocuments/Health';
import MainLayout from '../../../components/global/MainLayout';

import styles from '../../../styles/Main.module.scss';

const HealthComponent = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <Health />
      </MainLayout>
    </div>
  );
};

export default HealthComponent;
