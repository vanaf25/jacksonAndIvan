import CorporateSidebar from '../../../components/corporateManager/CorporateSidebar';
import Liability from '../../../components/corporateManager/InsureanceDocuments/Liability';
import MainLayout from '../../../components/global/MainLayout';

import styles from '../../../styles/Main.module.scss';

const LiabilityComponent = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <Liability />
      </MainLayout>
    </div>
  );
};

export default LiabilityComponent;
