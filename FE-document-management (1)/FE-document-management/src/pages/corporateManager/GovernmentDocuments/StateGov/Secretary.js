import CorporateSidebar from '../../../../components/corporateManager/CorporateSidebar';
import Secretary from '../../../../components/corporateManager/GovernmentDocuments/StateGov/Secretary';
import MainLayout from '../../../../components/global/MainLayout';

import styles from '../../../../styles/Main.module.scss';

const SecretaryComponent = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <Secretary />
      </MainLayout>
    </div>
  );
};

export default SecretaryComponent;
