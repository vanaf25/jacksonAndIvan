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

const ProductionSiderbar = (props) => {
  const pathName = props.location.pathname;

  const MenuEntry = ({ entry, path }) => {
    let IconComponentName = DashboardIconInactive;
    let link;
    let name;
    let navItemClass = styles.sidebarList;

    if (entry === 'system') {
      if (path === '/sales/system') {
        IconComponentName = DashboardIconActive;
        navItemClass = classNames(styles.active, styles.sidebarList);
      } else {
        IconComponentName = DashboardIconInactive;
      }
      link = `/sales/${entry}`;
      name = 'Sales System';
    }

    if (entry === 'quotes') {
      if (path === '/sales/quotes') {
        IconComponentName = EventIconActive;
        navItemClass = classNames(styles.active, styles.sidebarList);
      } else {
        IconComponentName = EventIconInactive;
      }
      link = `/sales/${entry}`;
      name = 'Quotes';
    }

    if (entry === 'materials') {
      if (path === '/sales/materials') {
        IconComponentName = PromoteIconActive;
        navItemClass = classNames(styles.active, styles.sidebarList);
      } else {
        IconComponentName = PromoteIconInactive;
      }
      link = `/sales/${entry}`;
      name = 'Sales Materials';
    }

    if (entry === 'presentations') {
      if (path === '/sales/presentations') {
        IconComponentName = PaymentIconActive;
        navItemClass = classNames(styles.active, styles.sidebarList);
      } else {
        IconComponentName = PaymentIconInactive;
      }
      link = `/sales/${entry}`;
      name = 'Sales Presentations';
    }

    if (entry === 'constructions') {
      if (path === '/sales/constructions') {
        IconComponentName = PaymentIconActive;
        navItemClass = classNames(styles.active, styles.sidebarList);
      } else {
        IconComponentName = PaymentIconInactive;
      }
      link = `/sales/${entry}`;
      name = 'Pre Constructions Pictures';
    }

    if (entry === 'communications') {
      if (path === '/sales/communications') {
        IconComponentName = PaymentIconActive;
        navItemClass = classNames(styles.active, styles.sidebarList);
      } else {
        IconComponentName = PaymentIconInactive;
      }
      link = `/sales/${entry}`;
      name = 'Communications Manager';
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
      <MenuEntry entry="system" path={pathName} />
      <MenuEntry entry="quotes" path={pathName} />
      <MenuEntry entry="materials" path={pathName} />
      <MenuEntry entry="presentations" path={pathName} />
      <MenuEntry entry="constructions" path={pathName} />
      <MenuEntry entry="communications" path={pathName} />
    </Sidebar>
  );
};

export default withRouter(ProductionSiderbar);
