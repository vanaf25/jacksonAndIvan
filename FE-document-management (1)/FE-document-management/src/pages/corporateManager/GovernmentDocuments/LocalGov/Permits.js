import CorporateSidebar from '../../../../components/corporateManager/CorporateSidebar';
import Permits from '../../../../components/corporateManager/GovernmentDocuments/LocalGov/Permits';
import MainLayout from '../../../../components/global/MainLayout';

import styles from '../../../../styles/Main.module.scss';

const PermitsComponent = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <Permits />
      </MainLayout>
    </div>
  );
};

export default PermitsComponent;
