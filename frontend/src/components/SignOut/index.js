import React from 'react';
import { SignOutUser } from '../Firebase';
import { doRemoveUser } from '../../action-initiators/simpleAction';
import { connect } from 'react-redux';




function SignOutButton(props) {
  const signOut = async () => {
    try {
      await SignOutUser();
      localStorage.setItem('setAuthUser', false);
      props.onRemoveUser();
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <button onClick={() => signOut()} className="btn btn-primary">SignOut</button>
  )
}

const mapDispatchToProps = (dispatch) => ({
  onRemoveUser: () => dispatch(doRemoveUser()),
});



export default connect(null, mapDispatchToProps)(SignOutButton)
