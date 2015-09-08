describe('True sd', function () {

  it('should be truthy', function () {
    var x = true;
    expect(x).toBeTruthy();
    expect(x).not.toBeFalsy();
  });

});

describe('Moments collection', function () {
  it('should be truthy', function () {
    expect(Moments).toBeTruthy();
  });

  it('should not be null', function () {
    expect(Moments).toBeTruthy();
  });

});
