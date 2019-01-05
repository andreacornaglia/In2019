function handleClientLoad() {
  // Loads the client library and the auth2 library together for efficiency.
  // Loading the auth2 library is optional here since `gapi.client.init` function will load
  // it if not already loaded. Loading it upfront can save one network request.
  gapi.load('client:auth2', initClient);
}

function initClient() {
  // Initialize the client with API key and People API, and initialize OAuth with an
  // OAuth 2.0 client ID and scopes (space delimited string) to request access.
  gapi.client.init({
    // 2. Initialize the JavaScript client library.
    apiKey: 'AIzaSyD59SMf_x_WXo70XWPQGbJWTCv9wUavlmc',
    clientId: '894627772510-dm635ps1iksqis1mj6188cq0tfg15s2s.apps.googleusercontent.com',
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    scope: 'https://www.googleapis.com/auth/calendar.readonly'
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
}

function updateSigninStatus(isSignedIn) {
  // When signin status changes, this function is called.
  // If the signin status is changed to signedIn, we make an API call.
  if (isSignedIn) {
    makeApiCall();
  }
}

function handleSignInClick(event) {
  // Ideally the button should only show up after gapi.client.init finishes, so that this
  // handler won't be called before OAuth is initialized.
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

function makeApiCall() {
  gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 80,
    'timeMin': '2019-01-01T10:00:00Z',
    'orderBy': 'startTime'
  }).then(function(response) {
    var userGoals = response.result && response.result.items && processEventsVsGoals(response.result.items);
    if (userGoals.length > 0) {
      userGoals.forEach(function(goal){
        appendPre(goal.name + ' (' + goal.goalMet + ')');
      })
      
    } else {
      appendPre('You dont have any goals for this year');
    }
  });
}






