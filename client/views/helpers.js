Template.registerHelper('formatDate', function (date) {
  var options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };
  return new Date(date).toLocaleDateString('it-IT', options);
});

Template.registerHelper('momentsCount', function () {
  // console.log("moments count:" + Moments.find({}).count());
  return Moments.find({}).count();
});

Template.registerHelper('moments', function () {
    return Moments.find({}, {
      sort: {
        createdAt: -1
      }
    });
});
