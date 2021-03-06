import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/taliwind/tailwind.css';
import { FirebaseContext } from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
