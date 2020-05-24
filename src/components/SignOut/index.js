import React from 'react';
 
import { withFirebase } from '../Firebase';
 
const SignOutButton = ({ firebase }) => (
    <div>
        <button type="button" class="btn btn-danger" onClick={firebase.doSignOut}>
            Sign Out
        </button>
    </div>

);
 
export default withFirebase(SignOutButton);