import CorporateSidebar from '../../../../components/corporateManager/CorporateSidebar';
import VehiclesTax from '../../../../components/corporateManager/GovernmentDocuments/CountyGov/VehiclesTax';
import MainLayout from '../../../../components/global/MainLayout';

import styles from '../../../../styles/Main.module.scss';

const VehiclesTaxComponent = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <VehiclesTax />
      </MainLayout>
    </div>
  );
};

export default VehiclesTaxComponent;
