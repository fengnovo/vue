import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {App} from './view.jsx';
import {store} from './store.jsx';
import 'antd/dist/antd.min.css';
import './app.css';

/* 入口 */
export default function init() {
    render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.querySelector('#app')
    );
};
