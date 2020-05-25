import React, { Component } from 'react';


export default class PageNotFound extends Component {

    render() {
        return (
                <div style={{textAlign:"center", margin:"2em"}}>
        <h1> Página no encontrada.</h1>
            <p>Al parecer no hay nada en esta dirección.
                        Intenta algun otro link del menu o regresa a la página anterior.</p>
    </div>
            
        );
    }
}