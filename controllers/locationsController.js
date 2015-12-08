var locationsController = {
  index: function(req,res){
    res.render("locations/index");
  },
  hbs: function(req, res){
  	res.render("index.hbs");
  }
};

module.exports = locationsController;
