import React from 'react';
import { createHashHistory } from 'history'

import { withFirebase } from '../Firebase';

const history = createHashHistory() 

 
const SignOutButton = ({ firebase }) => (
    <div>
        <button type="button" class="btn btn-danger" onClick={firebase.doSignOut}>
            Sign Out
        </button>
    </div>
    

);
 
export default withFirebase(SignOutButton);