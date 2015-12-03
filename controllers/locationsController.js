var locationsController = {
  index: function(req,res){
    res.render("locations/index.hbs", {locations:[]});
  }
};
