describe('True Test', function () {

  it('should be truthy', function () {
    var x = true;
    expect(x).toBeTruthy();
    expect(x).not.toBeFalsy();
  });

});

describe('False Test', function () {

  it('should be falsy', function () {
    var x = false;
    expect(x).toBeFalsy();
    expect(x).not.toBeTruthy();
  });

});
