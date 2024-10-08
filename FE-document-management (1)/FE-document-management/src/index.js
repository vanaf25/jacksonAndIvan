import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux';

import './index.module.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
