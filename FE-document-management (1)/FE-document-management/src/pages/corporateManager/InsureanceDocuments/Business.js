import CorporateSidebar from '../../../components/corporateManager/CorporateSidebar';
import Business from '../../../components/corporateManager/InsureanceDocuments/Business';
import MainLayout from '../../../components/global/MainLayout';

import styles from '../../../styles/Main.module.scss';

const BusinessComponent = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <Business />
      </MainLayout>
    </div>
  );
};

export default BusinessComponent;
