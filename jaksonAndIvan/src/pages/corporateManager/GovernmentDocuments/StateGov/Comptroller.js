import CorporateSidebar from '../../../../components/corporateManager/CorporateSidebar';
import Comptroller from '../../../../components/corporateManager/GovernmentDocuments/StateGov/Comptroller';
import MainLayout from '../../../../components/global/MainLayout';

import styles from '../../../../styles/Main.module.scss';

const ComptrollerComponent = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <Comptroller />
      </MainLayout>
    </div>
  );
};

export default ComptrollerComponent;
