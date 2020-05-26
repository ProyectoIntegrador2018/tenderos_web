import React, {Component} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle, faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthUserContext, withAuthorization } from '../Session';

export class Home extends Component  {
    render() {
        return (
    <div className="container-fluid">
                    <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
                    </div>
            
                    <div className="row">
                      <div className="col-xl-12 col-lg-7">
                        <div className="card shadow mb-4">
                          <div className="card-body" style={{textAlign:"center"}}>
                            <div class="container">
                              <div class="row d-flex justify-content-center">
                                <div class="col-4 justify-content-center">
                                  <h3 className="display-2 text-gray-800"> ¡Hola!</h3>
                                    <h1 className="h3 mb-0 text-gray-800"> Bienvenido a tu portal</h1>
                                </div>
                                <div class="col-8">
                                    <img src="/assets/Chart.png" class="img-fluid" width="50%"/>
                                </div>
                              </div>
                            </div>
                        

                          </div>
                        </div>
            
                    <div className="col-xl-12 col-lg-7">
                        <div className="card shadow mb-4">
                          <div className="card-body" style={{textAlign:"center"}}>
                            <img src="/assets/TimeChart.png" class="img-fluid" width="50%"/>
                          </div>
                        </div>
                      </div>
            
            <div className="col-xl-12 col-lg-7">
                        <div className="card shadow mb-4">
                          <div className="card-body" style={{textAlign:"center"}}>
            <img src="/assets/LineChart.png" class="img-fluid" width="60%"/>
                          </div>
                        </div>
                      </div>
            
            
                      </div>
                    </div>
                  </div>
            )
    }

}



const condition = authUser => !!authUser;
export default withAuthorization(condition)(Home);