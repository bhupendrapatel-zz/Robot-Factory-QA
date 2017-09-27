import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './containers/LandingPage';
import ShippingPage from './containers/ShippingPage';
import RootReducer from './reducers';

const connectWithReduxMiddleWare = applyMiddleware(ReduxPromise)(createStore);
const store = connectWithReduxMiddleWare(RootReducer);
export default store;

class App extends React.Component<any, any> {
    render() {
        return (
            <Provider store={this.props.store}>
                <BrowserRouter>
                    <div>
                        <Switch>
                            <Route path="/shipping" component={ ShippingPage } />
                            <Route path="/" component={ LandingPage } />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
};

ReactDOM.render(<App store={store}/>, document.getElementById('app'));