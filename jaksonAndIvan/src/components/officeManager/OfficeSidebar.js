import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';

import Sidebar from '../global/Sidebar';

import { ReactComponent as DashboardIconInactive } from '../../assets/icons/DashboardInactive.svg';
import { ReactComponent as EventIconInactive } from '../../assets/icons/EventInactive.svg';
import { ReactComponent as PromoteIconInactive } from '../../assets/icons/PromoteInactive.svg';
import { ReactComponent as PaymentIconInactive } from '../../assets/icons/PaymentInactive.svg';

import { ReactComponent as DashboardIconActive } from '../../assets/icons/DashboardActive.svg';
import { ReactComponent as EventIconActive } from '../../assets/icons/EventActive.svg';
import { ReactComponent as PromoteIconActive } from '../../assets/icons/PromoteActive.svg';
import { ReactComponent as PaymentIconActive } from '../../assets/icons/PaymentActive.svg';

import styles from '../../styles/Main.module.scss';

const OfficeSiderbar = (props) => {
  const pathName = props.location.pathname;

  const MenuEntry = ({ entry, path }) => {
    let IconComponentName = DashboardIconInactive;
    let link;
    let name;
    let navItemClass = styles.sidebarList;

    if (entry === 'paper') {
      if (path === '/office/paper') {
        IconComponentName = DashboardIconActive;
        navItemClass = classNames(styles.active, styles.sidebarList);
      } else {
        IconComponentName = DashboardIconInactive;
      }
      link = `/office/${entry}`;
      name = 'Paper work system';
    }

    if (entry === 'safety') {
      if (path === '/office/safety') {
        IconComponentName = EventIconActive;
        navItemClass = classNames(styles.active, styles.sidebarList);
      } else {
        IconComponentName = EventIconInactive;
      }
      link = `/office/${entry}`;
      name = 'Safety System';
    }

    if (entry === 'supplier') {
      if (path === '/office/supplier') {
        IconComponentName = PromoteIconActive;
        navItemClass = classNames(styles.active, styles.sidebarList);
      } else {
        IconComponentName = PromoteIconInactive;
      }
      link = `/office/${entry}`;
      name = 'Supplier system';
    }

    if (entry === 'equipment-inventory') {
      if (path === '/office/equipment-inventory') {
        IconComponentName = PaymentIconActive;
        navItemClass = classNames(styles.active, styles.sidebarList);
      } else {
        IconComponentName = PaymentIconInactive;
      }
      link = `/office/${entry}`;
      name = 'Equipment and supplies inventory';
    }

    return (
      <Link to={link} className={styles.noUnderline}>
        <div className={navItemClass}>
          <IconComponentName className={styles.mgRight13} />
          <span className={styles.navTitle}>{name}</span>
        </div>
      </Link>
    );
  };

  return (
    <Sidebar>
      <MenuEntry entry="paper" path={pathName} />
      <MenuEntry entry="safety" path={pathName} />
      <MenuEntry entry="supplier" path={pathName} />
      <MenuEntry entry="equipment-inventory" path={pathName} />
    </Sidebar>
  );
};

export default withRouter(OfficeSiderbar);
