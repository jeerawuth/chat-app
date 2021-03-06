import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import reducer from './store/reducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Home from './components/Home'
import Header from './components/Header'
import Profile from './components/Profile'
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';

function App() {
  const store = createStore(reducer, applyMiddleware(thunk))
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Route path="/" component={Home} exact={true} />
        <Route path="/login" component={UserLogin} />
        <Route path="/profile" component={Profile} />
        <Route path="/signup" component={UserSignup} />
      </BrowserRouter>
    </Provider>

  );
}
export default App;
