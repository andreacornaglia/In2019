function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function addNewGoal(){
  //display a popup where user can enter goal name, keywords and frequency
}