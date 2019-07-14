import React from 'react';
import ReactDOM from 'react-dom';
import { initBridge } from './Bridge';
import initRegistry from './initRegistry';
import initReduxStore from './initReduxStore';
import App from './App';

initBridge();
initRegistry();
const store = initReduxStore();

const app = document.createElement('div');
document.body.append(app);
ReactDOM.render(<App store={store} />, app);
