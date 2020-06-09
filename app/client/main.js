import { Meteor } from 'meteor/meteor';

// Attempt #1 & #3
import bundle from 'thingie/messages.ftl';

// Attempt #2
// import bundle from '../imports/thingie/messages.ftl';

// Import from app's own files works just fine
// import bundle from './messages.ftl';

Meteor.startup(() => {
  const app = document.getElementById('app');
  app.innerHTML = bundle.format('heading');
});