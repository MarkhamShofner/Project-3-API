var Location = require("../public/js/models/location.js");

describe ("location", function () {
  var location1;

  beforeEach(function(){
    location1 = new Location({
      name: "davis kidd",
      lat: 13.1,
      long: -26.2,
      type: "book store",
      score: 5
    });
  });

  it ("should have a name", function(){
    expect (location1.name).toBeDefined();
  });
  it ("should require a latitude", function(){
    expect (location1.lat).toBeDefined();
  });
  it ("should require a longitude", function(){
    expect (location1.long).toBeDefined();
  });
  it ("should have a type", function(){
    expect (location1.type).toBeDefined();
  });
  it ("should have a score", function(){
    expect (location1.score).toBeDefined();
  });
});
