import CorporateSidebar from '../../../../components/corporateManager/CorporateSidebar';
import Fbi from '../../../../components/corporateManager/GovernmentDocuments/FedralGov/Fbi';
import MainLayout from '../../../../components/global/MainLayout';

import styles from '../../../../styles/Main.module.scss';

const FbiComponent = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <Fbi />
      </MainLayout>
    </div>
  );
};

export default FbiComponent;
