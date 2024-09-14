import { Link } from 'react-router-dom';

import Sidebar from '../global/Sidebar';

import { ReactComponent as DashboardIconInactive } from '../../assets/icons/DashboardInactive.svg';
import { ReactComponent as EventIconInactive } from '../../assets/icons/EventInactive.svg';
import { ReactComponent as PromoteIconInactive } from '../../assets/icons/PromoteInactive.svg';
import { ReactComponent as PaymentIconInactive } from '../../assets/icons/PaymentInactive.svg';

import styles from '../../styles/Main.module.scss';

const routeGdDate = [
  {
    label: 'Fedral Gov Docs and Storage',
    path: 'fedral-gov',
    subMenu: [
      {
        label: 'IRS',
        path: 'irs',
      },
      {
        label: 'EPA',
        path: 'epa',
      },
      {
        label: 'FBI',
        path: 'fbi',
      },
    ],
  },
  {
    label: 'State Gov Docs and Storage',
    path: 'state-gov',
    subMenu: [
      {
        label: 'Secretary of state',
        path: 'secretary',
      },
      {
        label: 'Comptroller',
        path: 'comptroller',
      },
    ],
  },
  {
    label: 'County Gov and Storage',
    path: 'county-gov',
    subMenu: [
      {
        label: 'Property Tax and Title',
        path: 'property',
      },
      {
        label: ' Vehicles Tax and Title',
        path: 'vehicle',
      },
    ],
  },
  {
    label: 'Local Government',
    path: 'local-gov',
    subMenu: [
      {
        label: 'Permits',
        path: 'permits',
      },
    ],
  },
];

const routeIsDate = [
  {
    label: 'Liability',
    path: 'liability',
  },
  {
    label: 'Health',
    path: 'health',
  },
  {
    label: 'Auto',
    path: 'auto',
  },
  {
    label: 'Business',
    path: 'business',
  },
];

const CorporateSidebar = () => {
  const MenuEntry = ({ entry }) => {
    let IconComponentName = DashboardIconInactive;
    let link;
    let name;

    if (entry === 'customer-archives') {
      IconComponentName = DashboardIconInactive;
      link = `/corporate/${entry}`;
      name = 'Customer Archives';
    }

    if (entry === 'manager-training') {
      IconComponentName = EventIconInactive;
      link = `/corporate/${entry}`;
      name = 'Manager Training Videos';
    }

    if (entry === 'accounting') {
      IconComponentName = PromoteIconInactive;
      link = `/corporate/${entry}`;
      name = 'Accounting System';
    }

    if (entry === 'legal') {
      IconComponentName = PaymentIconInactive;
      link = `/corporate/${entry}`;
      name = 'Legal System';
    }

    return (
      <Link to={link} className={styles.noUnderline}>
        <div className={styles.sidebarList1}>
          <IconComponentName className={styles.mgRight13} />
          <span className={styles.navTitle1}>{name}</span>
        </div>
      </Link>
    );
  };

  return (
    <Sidebar>
      <div style={{ margin: '70px auto' }}>
        <MenuEntry entry="customer-archives" />
        <MenuEntry entry="manager-training" />
        <MenuEntry entry="accounting" />
        <MenuEntry entry="legal" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={styles.sidebarList1}>
            <PaymentIconInactive className={styles.mgRight13} />
            <span className={styles.navTitle1}>Government Documents</span>
          </div>
          {routeGdDate.map((tree) => (
            <div key={tree.label} style={{ marginBottom: 10 }}>
              <div className={styles.treeNode1}>{`+ ${tree.label}`}</div>
              <div className={styles.subMenu}>
                {tree.subMenu.map((item) => (
                  <Link
                    key={item.label}
                    to={`/corporate/gov-docs/${tree.path}/${item.path}`}
                    className={styles.treeNode2}
                  >
                    {`- ${item.label}`}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className={styles.sidebarList1}>
            <PaymentIconInactive className={styles.mgRight13} />
            <span className={styles.navTitle1}>Insurance Documents and Storage</span>
          </div>
          {routeIsDate.map((tree) => (
            <Link
              key={tree.label}
              to={`/corporate/insurance-docs/${tree.path}`}
              className={styles.treeNode1}
            >
              {`- ${tree.label}`}
            </Link>
          ))}
        </div>
      </div>
    </Sidebar>
  );
};

export default CorporateSidebar;
