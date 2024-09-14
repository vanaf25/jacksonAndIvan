import CorporateSidebar from '../../../../components/corporateManager/CorporateSidebar';
import Irs from '../../../../components/corporateManager/GovernmentDocuments/FedralGov/Irs';
import MainLayout from '../../../../components/global/MainLayout';

import styles from '../../../../styles/Main.module.scss';

const IrsComponent = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <Irs />
      </MainLayout>
    </div>
  );
};

export default IrsComponent;
