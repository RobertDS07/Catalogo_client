import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './components/home/Index'

import NotFound from './components/utils/NotFound404'

import Store from './components/store/Index'

import DevRoute from './components/store/devComponents/Wrapper'

export default () => (
    // const [logged, setLogged] = useState()

    // useEffect(() => {
    //     if (!!localStorage.getItem('authorization')) {
    //         (async () => {
    //             const res = await axios.post(process.env.REACT_APP_API || 'http://localhost:8081/graphql', {
    //                 query: `
    //                 {
    //                     verifyToken(token:"${localStorage.getItem('authorization')}") {
    //                         admin
    //                     }
    //                 }
    //                 `
    //             })
    //             if (!res.data.data.verifyToken) return setLogged(false)

    //             setLogged(true)
    //         })()
    //     }
    // }, [])

    <>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route
                exact
                path="/:storeName/create"
                component={(props) => (
                    <DevRoute storeNameToLink={props.match.params.storeName} />
                )}
            />

            <Route
                path="/:storeName"
                component={(props) => (
                    <Store storeName={props.match.params.storeName} />
                )}
            />

            <Route path="*">
                <NotFound />
            </Route>
        </Switch>
    </>
)
