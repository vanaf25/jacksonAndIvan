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

    if (entry === 'subcontractor') {
      if (path === '/production/subcontractor') {
        IconComponentName = DashboardIconActive;
        navItemClass = classNames(styles.active, styles.sidebarList);
      } else {
        IconComponentName = DashboardIconInactive;
      }
      link = `/production/${entry}`;
      name = 'Sub contractor system';
    }

    if (entry === 'employee') {
      if (path === '/production/employee') {
        IconComponentName = EventIconActive;
        navItemClass = classNames(styles.active, styles.sidebarList);
      } else {
        IconComponentName = EventIconInactive;
      }
      link = `/production/${entry}`;
      name = 'Employee System';
    }

    if (entry === 'service') {
      if (path === '/production/service') {
        IconComponentName = PromoteIconActive;
        navItemClass = classNames(styles.active, styles.sidebarList);
      } else {
        IconComponentName = PromoteIconInactive;
      }
      link = `/production/${entry}`;
      name = 'Service Call system';
    }

    if (entry === 'training') {
      if (path === '/production/training') {
        IconComponentName = PaymentIconActive;
        navItemClass = classNames(styles.active, styles.sidebarList);
      } else {
        IconComponentName = PaymentIconInactive;
      }
      link = `/production/${entry}`;
      name = 'Training Videos';
    }

    if (entry === 'pictures') {
      if (path === '/production/pictures') {
        IconComponentName = PaymentIconActive;
        navItemClass = classNames(styles.active, styles.sidebarList);
      } else {
        IconComponentName = PaymentIconInactive;
      }
      link = `/production/${entry}`;
      name = 'Production Pictures';
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
      <MenuEntry entry="subcontractor" path={pathName} />
      <MenuEntry entry="employee" path={pathName} />
      <MenuEntry entry="service" path={pathName} />
      <MenuEntry entry="training" path={pathName} />
      <MenuEntry entry="pictures" path={pathName} />
    </Sidebar>
  );
};

export default withRouter(ProductionSiderbar);
