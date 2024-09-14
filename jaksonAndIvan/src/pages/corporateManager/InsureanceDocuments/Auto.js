import CorporateSidebar from '../../../components/corporateManager/CorporateSidebar';
import Auto from '../../../components/corporateManager/InsureanceDocuments/Auto';
import MainLayout from '../../../components/global/MainLayout';

import styles from '../../../styles/Main.module.scss';

const AutoComponent = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <Auto />
      </MainLayout>
    </div>
  );
};

export default AutoComponent;
