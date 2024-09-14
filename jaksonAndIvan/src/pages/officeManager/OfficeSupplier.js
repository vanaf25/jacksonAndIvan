import OfficeSidebar from '../../components/officeManager/OfficeSidebar';
import SupplierSystem from '../../components/officeManager/SupplierSystem';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const OfficeSupplier = () => {
  return (
    <div className={styles.gridFlex}>
      <OfficeSidebar />
      <MainLayout>
        <SupplierSystem />
      </MainLayout>
    </div>
  );
};

export default OfficeSupplier;
