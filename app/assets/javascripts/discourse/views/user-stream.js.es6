export default Ember.View.extend(Discourse.LoadMore, {
  loading: false,
  eyelineSelector: '.user-stream .item',
  classNames: ['user-stream'],

  _scrollTopOnModelChange: function() {
    Em.run.schedule('afterRender', function() {
      $(document).scrollTop(0);
    });
  }.observes('controller.model.user.id'),

  actions: {
    loadMore: function() {
      var self = this;
      if (this.get('loading')) { return; }

      var stream = this.get('controller.model');
      stream.findItems().then(function() {
        self.set('loading', false);
        self.get('eyeline').flushRest();
      }).catch(function() {
        // If we were already loading...
      });
    }
  }
});
