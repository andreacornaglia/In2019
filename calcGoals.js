//userGoals is all goals we want to measure w actual calendar events
var userGoals = [
  {
    name: 'practice more yoga',
    keywords: ['yoga', 'vinyasa'],
    frequency: 1,
    thisPeriodEventCount: 0,
    goalMet: false
  },
  {
    name: 'go to more cultural events',
    keywords: ['movie', 'film', 'concert', 'show', 'exhibit'],
    frequency: 1,
    thisPeriodEventCount: 0,
    goalMet: false
  }
];

function processEventsVsGoals(events){
  var eventsThisWeek = [],
      startOfWeek = moment().startOf('week').format(),
      endOfWeek   = moment().endOf('week').format();
  
  //filter events happening this week
  events.forEach(function(event){
    event.start.date = event.start.date || event.start.dateTime;
    if(event.start.date > startOfWeek && event.start.date < endOfWeek) {
      eventsThisWeek.push(event);
    }
  });
  
  //loop through this week events to add to corresponding goals
  eventsThisWeek.forEach(function(event){
    checkWhichGoal(event);
  });

  function checkWhichGoal(event){
    userGoals.forEach(function(goal){
      var eventSummaryList = event.summary.split(' ');
      eventSummaryList.forEach(function(word){
        if(goal.keywords.indexOf(word.toLowerCase()) !== -1){
          goal.thisPeriodEventCount++;
        }           
      });
      
      if(goal.thisPeriodEventCount >= goal.frequency){
        goal.goalMet = true;
      }
    });
  }
  
  return userGoals;
}

