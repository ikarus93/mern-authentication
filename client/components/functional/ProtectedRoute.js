import React from 'react'
import {
    Route,
    Redirect
} from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...rest }) {


    return (
        <Route
            {...rest}
            render={props => {
                console.log("REST", rest)

                return (
                    rest.isAuthenticated ? (
                        <Component {...rest} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/",
                                }}
                            />
                        )
                )
            }}
        />
    );

}
