import CorporateSidebar from '../../../../components/corporateManager/CorporateSidebar';
import Epa from '../../../../components/corporateManager/GovernmentDocuments/FedralGov/Epa';
import MainLayout from '../../../../components/global/MainLayout';

import styles from '../../../../styles/Main.module.scss';

const EpaComopnent = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <Epa />
      </MainLayout>
    </div>
  );
};

export default EpaComopnent;
