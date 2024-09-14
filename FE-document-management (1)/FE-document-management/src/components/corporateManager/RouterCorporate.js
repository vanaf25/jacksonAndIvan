import { memo, lazy, Suspense } from 'react';
import { Switch } from 'react-router-dom';

import PrivateRoute from '../PrivateRoute';
import { InlineLoading } from '../global/loading/Loading';

const CustomerArchives = lazy(() =>
  import(
    /* webpackChunkName: "CustomerArchives" */ '../../pages/corporateManager/CustomerArchives'
  ),
);
const Training = lazy(() =>
  import(/* webpackChunkName: "Training" */ '../../pages/corporateManager/Training'),
);
const Accounting = lazy(() =>
  import(/* webpackChunkName: "Accounting" */ '../../pages/corporateManager/Accounting'),
);
const Legal = lazy(() =>
  import(/* webpackChunkName: "Legal" */ '../../pages/corporateManager/Legal'),
);
const IrsComponent = lazy(() =>
  import(
    /* webpackChunkName: "IrsComponent" */ '../../pages/corporateManager/GovernmentDocuments/FedralGov/Irs'
  ),
);
const EpaComponent = lazy(() =>
  import(
    /* webpackChunkName: "EpaComponent" */ '../../pages/corporateManager/GovernmentDocuments/FedralGov/Epa'
  ),
);
const FbiComponent = lazy(() =>
  import(
    /* webpackChunkName: "FbiComponent" */ '../../pages/corporateManager/GovernmentDocuments/FedralGov/Fbi'
  ),
);
const SecretaryComponent = lazy(() =>
  import(
    /* webpackChunkName: "SecretaryComponent" */ '../../pages/corporateManager/GovernmentDocuments/StateGov/Secretary'
  ),
);
const ComptrollerComponent = lazy(() =>
  import(
    /* webpackChunkName: "ComptrollerComponent" */ '../../pages/corporateManager/GovernmentDocuments/StateGov/Comptroller'
  ),
);
const PropertyTaxComponent = lazy(() =>
  import(
    /* webpackChunkName: "PropertyTaxComponent" */ '../../pages/corporateManager/GovernmentDocuments/CountyGov/PropertyTax'
  ),
);
const VehiclesTaxComponent = lazy(() =>
  import(
    /* webpackChunkName: "VehiclesTaxComponent" */ '../../pages/corporateManager/GovernmentDocuments/CountyGov/VehiclesTax'
  ),
);
const PermitsComponent = lazy(() =>
  import(
    /* webpackChunkName: "PermitsComponent" */ '../../pages/corporateManager/GovernmentDocuments/LocalGov/Permits'
  ),
);

const LiabilityComponent = lazy(() =>
  import(
    /* webpackChunkName: "LiabilityComponent" */ '../../pages/corporateManager/InsureanceDocuments/Liability'
  ),
);

const HealthComponent = lazy(() =>
  import(
    /* webpackChunkName: "HealthComponent" */ '../../pages/corporateManager/InsureanceDocuments/Health'
  ),
);

const AutoComponent = lazy(() =>
  import(
    /* webpackChunkName: "AutoComponent" */ '../../pages/corporateManager/InsureanceDocuments/Auto'
  ),
);

const BusinessComponent = lazy(() =>
  import(
    /* webpackChunkName: "BusinessComponent" */ '../../pages/corporateManager/InsureanceDocuments/Business'
  ),
);

const RouterCorporate = ({ user }) => (
  <Suspense fallback={<InlineLoading />}>
    <Switch>
      <PrivateRoute
        user={user}
        allowedRole="sales"
        path="/corporate/customer-archives"
        component={CustomerArchives}
      />
      <PrivateRoute
        user={user}
        allowedRole="sales"
        path="/corporate/manager-training"
        component={Training}
      />
      <PrivateRoute
        user={user}
        allowedRole="sales"
        path="/corporate/accounting"
        component={Accounting}
      />
      <PrivateRoute user={user} allowedRole="sales" path="/corporate/legal" component={Legal} />

      <PrivateRoute
        user={user}
        allowedRole="sales"
        path="/corporate/gov-docs/fedral-gov/irs"
        component={IrsComponent}
      />
      <PrivateRoute
        user={user}
        allowedRole="sales"
        path="/corporate/gov-docs/fedral-gov/epa"
        component={EpaComponent}
      />
      <PrivateRoute
        user={user}
        allowedRole="sales"
        path="/corporate/gov-docs/fedral-gov/fbi"
        component={FbiComponent}
      />
      <PrivateRoute
        user={user}
        allowedRole="sales"
        path="/corporate/gov-docs/state-gov/secretary"
        component={SecretaryComponent}
      />
      <PrivateRoute
        user={user}
        allowedRole="sales"
        path="/corporate/gov-docs/state-gov/comptroller"
        component={ComptrollerComponent}
      />
      <PrivateRoute
        user={user}
        allowedRole="sales"
        path="/corporate/gov-docs/county-gov/property"
        component={PropertyTaxComponent}
      />
      <PrivateRoute
        user={user}
        allowedRole="sales"
        path="/corporate/gov-docs/county-gov/vehicle"
        component={VehiclesTaxComponent}
      />
      <PrivateRoute
        user={user}
        allowedRole="sales"
        path="/corporate/gov-docs/local-gov/permits"
        component={PermitsComponent}
      />

      <PrivateRoute
        user={user}
        allowedRole="sales"
        path="/corporate/insurance-docs/liability"
        component={LiabilityComponent}
      />
      <PrivateRoute
        user={user}
        allowedRole="sales"
        path="/corporate/insurance-docs/health"
        component={HealthComponent}
      />
      <PrivateRoute
        user={user}
        allowedRole="sales"
        path="/corporate/insurance-docs/auto"
        component={AutoComponent}
      />
      <PrivateRoute
        user={user}
        allowedRole="sales"
        path="/corporate/insurance-docs/business"
        component={BusinessComponent}
      />
    </Switch>
  </Suspense>
);

export default memo(RouterCorporate);
