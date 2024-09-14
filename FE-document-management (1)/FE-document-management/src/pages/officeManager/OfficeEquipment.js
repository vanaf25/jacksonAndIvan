import OfficeSidebar from '../../components/officeManager/OfficeSidebar';
import EquipmentInventory from '../../components/officeManager/EquipmentInventory';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const OfficeEquipment = () => {
  return (
    <div className={styles.gridFlex}>
      <OfficeSidebar />
      <MainLayout>
        <EquipmentInventory />
      </MainLayout>
    </div>
  );
};

export default OfficeEquipment;
