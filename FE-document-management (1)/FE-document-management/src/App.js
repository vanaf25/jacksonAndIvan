import { lazy, memo, Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import Home from './pages/Home';
import InvalidRole from './pages/InvalidRole';
import InvalidStatus from './pages/InvalidStatus';

import Header from './components/global/Header';
import { InlineLoading } from './components/global/loading/Loading';
import { loadUser } from './redux/actions/authAction';
import PrivateRoute from './components/PrivateRoute';

const AdminPage = lazy(() => import(/* webpackChunkName: "AdminPage" */ './pages/AdminPage'));

const OfficePaper = lazy(() =>
  import(/* webpackChunkName: "OfficePaper" */ './pages/officeManager/OfficePaper'),
);
const OfficeSafety = lazy(() =>
  import(/* webpackChunkName: "OfficeSafety" */ './pages/officeManager/OfficeSafety'),
);
const OfficeSupplier = lazy(() =>
  import(/* webpackChunkName: "OfficeSupplier" */ './pages/officeManager/OfficeSupplier'),
);
const OfficeEquipment = lazy(() =>
  import(/* webpackChunkName: "OfficeEquipment" */ './pages/officeManager/OfficeEquipment'),
);

const ProductionSubContractor = lazy(() =>
  import(
    /* webpackChunkName: "ProductionSubContractor" */ './pages/productionManager/ProductionSubContractor'
  ),
);
const ProductionEmployee = lazy(() =>
  import(
    /* webpackChunkName: "ProductionEmployee" */ './pages/productionManager/ProductionEmployee'
  ),
);
const ProductionService = lazy(() =>
  import(/* webpackChunkName: "ProductionService" */ './pages/productionManager/ProductionService'),
);
const ProductionTraining = lazy(() =>
  import(
    /* webpackChunkName: "ProductionTraining" */ './pages/productionManager/ProductionTraining'
  ),
);
const ProductionPictures = lazy(() =>
  import(
    /* webpackChunkName: "ProductionPictures" */ './pages/productionManager/ProductionPictures'
  ),
);

const SalesSystem = lazy(() =>
  import(/* webpackChunkName: "SalesSystem" */ './pages/salesManager/SalesSystem'),
);
const SalesQuotes = lazy(() =>
  import(/* webpackChunkName: "SalesQuotes" */ './pages/salesManager/SalesQuotes'),
);
const SalesMaterials = lazy(() =>
  import(/* webpackChunkName: "SalesMaterials" */ './pages/salesManager/SalesMaterial'),
);
const SalesPresentations = lazy(() =>
  import(/* webpackChunkName: "SalesPresentations" */ './pages/salesManager/SalesPresentations'),
);
const SalesConstruction = lazy(() =>
  import(
    /* webpackChunkName: "SalesConstruction" */ './pages/salesManager/SalesPreConstructionPictures'
  ),
);
const SalesCommunications = lazy(() =>
  import(
    /* webpackChunkName: "SalesCommunications" */ './pages/salesManager/SalesCommunicationsManager'
  ),
);

const CustomerArchives = lazy(() =>
  import(/* webpackChunkName: "CustomerArchives" */ './pages/corporateManager/CustomerArchives'),
);
const Training = lazy(() =>
  import(/* webpackChunkName: "Training" */ './pages/corporateManager/Training'),
);
const Accounting = lazy(() =>
  import(/* webpackChunkName: "Accounting" */ './pages/corporateManager/Accounting'),
);
const Legal = lazy(() => import(/* webpackChunkName: "Legal" */ './pages/corporateManager/Legal'));
const IrsComponent = lazy(() =>
  import(
    /* webpackChunkName: "IrsComponent" */ './pages/corporateManager/GovernmentDocuments/FedralGov/Irs'
  ),
);
const EpaComponent = lazy(() =>
  import(
    /* webpackChunkName: "EpaComponent" */ './pages/corporateManager/GovernmentDocuments/FedralGov/Epa'
  ),
);
const FbiComponent = lazy(() =>
  import(
    /* webpackChunkName: "FbiComponent" */ './pages/corporateManager/GovernmentDocuments/FedralGov/Fbi'
  ),
);
const SecretaryComponent = lazy(() =>
  import(
    /* webpackChunkName: "SecretaryComponent" */ './pages/corporateManager/GovernmentDocuments/StateGov/Secretary'
  ),
);
const ComptrollerComponent = lazy(() =>
  import(
    /* webpackChunkName: "ComptrollerComponent" */ './pages/corporateManager/GovernmentDocuments/StateGov/Comptroller'
  ),
);
const PropertyTaxComponent = lazy(() =>
  import(
    /* webpackChunkName: "PropertyTaxComponent" */ './pages/corporateManager/GovernmentDocuments/CountyGov/PropertyTax'
  ),
);
const VehiclesTaxComponent = lazy(() =>
  import(
    /* webpackChunkName: "VehiclesTaxComponent" */ './pages/corporateManager/GovernmentDocuments/CountyGov/VehiclesTax'
  ),
);
const PermitsComponent = lazy(() =>
  import(
    /* webpackChunkName: "PermitsComponent" */ './pages/corporateManager/GovernmentDocuments/LocalGov/Permits'
  ),
);

const LiabilityComponent = lazy(() =>
  import(
    /* webpackChunkName: "LiabilityComponent" */ './pages/corporateManager/InsureanceDocuments/Liability'
  ),
);
const HealthComponent = lazy(() =>
  import(
    /* webpackChunkName: "HealthComponent" */ './pages/corporateManager/InsureanceDocuments/Health'
  ),
);
const AutoComponent = lazy(() =>
  import(
    /* webpackChunkName: "AutoComponent" */ './pages/corporateManager/InsureanceDocuments/Auto'
  ),
);
const BusinessComponent = lazy(() =>
  import(
    /* webpackChunkName: "BusinessComponent" */ './pages/corporateManager/InsureanceDocuments/Business'
  ),
);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const user = useSelector((state) => state.auth);

  return (
    <Router>
      <Header />

      <Suspense fallback={<InlineLoading />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/check-status" component={InvalidStatus} />
          <Route exact path="/check-role" component={InvalidRole} />

          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/sign-in" component={SignIn} />

          {user.user?.role === 'admin' && user.user?.status === 'approved' && (
            <Route exact path="/admin" component={AdminPage} />
          )}

          {/* Office Manager Router */}
          <PrivateRoute user={user} allowedRole="office" exact path="/office/paper">
            <OfficePaper />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="office" exact path="/office/safety">
            <OfficeSafety />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="office" exact path="/office/supplier">
            <OfficeSupplier />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="office" exact path="/office/equipment-inventory">
            <OfficeEquipment />
          </PrivateRoute>

          {/* Production Manager Router */}
          <PrivateRoute user={user} allowedRole="production" path="/production/subcontractor">
            <ProductionSubContractor />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="production" path="/production/employee">
            <ProductionEmployee />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="production" path="/production/service">
            <ProductionService />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="production" path="/production/training">
            <ProductionTraining />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="production" path="/production/pictures">
            <ProductionPictures />
          </PrivateRoute>

          {/* Sales Manager Router */}
          <PrivateRoute user={user} allowedRole="sales" path="/sales/system">
            <SalesSystem />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="sales" path="/sales/quotes">
            <SalesQuotes />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="sales" path="/sales/materials">
            <SalesMaterials />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="sales" path="/sales/presentations">
            <SalesPresentations />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="sales" path="/sales/constructions">
            <SalesConstruction />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="sales" path="/sales/communications">
            <SalesCommunications />
          </PrivateRoute>

          {/* Corporate Manager Router */}
          <PrivateRoute user={user} allowedRole="corporate" path="/corporate/customer-archives">
            <CustomerArchives />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="corporate" path="/corporate/manager-training">
            <Training />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="corporate" path="/corporate/accounting">
            <Accounting />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="corporate" path="/corporate/legal">
            <Legal />
          </PrivateRoute>
          <PrivateRoute
            user={user}
            allowedRole="corporate"
            path="/corporate/gov-docs/fedral-gov/irs"
          >
            <IrsComponent />
          </PrivateRoute>
          <PrivateRoute
            user={user}
            allowedRole="corporate"
            path="/corporate/gov-docs/fedral-gov/epa"
          >
            <EpaComponent />
          </PrivateRoute>
          <PrivateRoute
            user={user}
            allowedRole="corporate"
            path="/corporate/gov-docs/fedral-gov/fbi"
          >
            <FbiComponent />
          </PrivateRoute>
          <PrivateRoute
            user={user}
            allowedRole="corporate"
            path="/corporate/gov-docs/state-gov/secretary"
          >
            <SecretaryComponent />
          </PrivateRoute>
          <PrivateRoute
            user={user}
            allowedRole="corporate"
            path="/corporate/gov-docs/state-gov/comptroller"
          >
            <ComptrollerComponent />
          </PrivateRoute>
          <PrivateRoute
            user={user}
            allowedRole="corporate"
            path="/corporate/gov-docs/county-gov/property"
          >
            <PropertyTaxComponent />
          </PrivateRoute>
          <PrivateRoute
            user={user}
            allowedRole="corporate"
            path="/corporate/gov-docs/county-gov/vehicle"
          >
            <VehiclesTaxComponent />
          </PrivateRoute>
          <PrivateRoute
            user={user}
            allowedRole="corporate"
            path="/corporate/gov-docs/local-gov/permits"
          >
            <PermitsComponent />
          </PrivateRoute>

          <PrivateRoute
            user={user}
            allowedRole="corporate"
            path="/corporate/insurance-docs/liability"
          >
            <LiabilityComponent />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="corporate" path="/corporate/insurance-docs/health">
            <HealthComponent />
          </PrivateRoute>
          <PrivateRoute user={user} allowedRole="corporate" path="/corporate/insurance-docs/auto">
            <AutoComponent />
          </PrivateRoute>
          <PrivateRoute
            user={user}
            allowedRole="corporate"
            path="/corporate/insurance-docs/business"
          >
            <BusinessComponent />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Router>
  );
};

export default memo(App);
