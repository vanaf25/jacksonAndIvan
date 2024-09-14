import CorporateSidebar from '../../components/corporateManager/CorporateSidebar';
import TrainingSystem from '../../components/corporateManager/Training';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const Training = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <TrainingSystem />
      </MainLayout>
    </div>
  );
};

export default Training;
