import OfficeSidebar from '../../components/officeManager/OfficeSidebar';
import SafetySystem from '../../components/officeManager/SafetySystem';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const OfficeSafety = () => {
  return (
    <div className={styles.gridFlex}>
      <OfficeSidebar />
      <MainLayout>
        <SafetySystem />
      </MainLayout>
    </div>
  );
};

export default OfficeSafety;
