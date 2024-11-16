import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import store from "./store"
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>

)