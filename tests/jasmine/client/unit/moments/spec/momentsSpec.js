describe('Moments collection', function () {

  it('should be truthy', function () {
    expect(Moments).toBeTruthy();
  });

  it('should not be null', function () {
    expect(Moments).not.toBeNull();
  });


});

describe('Moment', function () {

  it('should be truthy', function () {
    expect(Moments.find({})).toBeTruthy();
  });

  it('should not be null', function () {
    expect(Moments).not.toBeNull();
  });

});
