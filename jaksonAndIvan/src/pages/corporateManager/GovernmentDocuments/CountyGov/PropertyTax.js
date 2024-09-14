import CorporateSidebar from '../../../../components/corporateManager/CorporateSidebar';
import PropertyTax from '../../../../components/corporateManager/GovernmentDocuments/CountyGov/PropertyTax';
import MainLayout from '../../../../components/global/MainLayout';

import styles from '../../../../styles/Main.module.scss';

const PropertyTaxComponent = () => {
  return (
    <div className={styles.gridFlex}>
      <CorporateSidebar />
      <MainLayout>
        <PropertyTax />
      </MainLayout>
    </div>
  );
};

export default PropertyTaxComponent;
