import OfficeSidebar from '../../components/officeManager/OfficeSidebar';
import PaperSystem from '../../components/officeManager/PaperSystem';
import MainLayout from '../../components/global/MainLayout';

import styles from '../../styles/Main.module.scss';

const OfficePaper = () => {
  return (
    <div className={styles.gridFlex}>
      <OfficeSidebar />
      <MainLayout>
        <PaperSystem />
      </MainLayout>
    </div>
  );
};

export default OfficePaper;
