if (Meteor.settings.cronJob) {
  SyncedCron.add({
    name: 'log the time every 5 min',
    schedule: function (parser) {
      return parser.text('every 5 mins');
    },
    job: function () {
      console.log(Date());
    }
  });

  SyncedCron.start();
}
