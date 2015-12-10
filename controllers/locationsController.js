var locationsController = {
  index: function(req, res){
  	res.render("index.hbs", { 
    	message: req.flash('loginMessage')
  	});
}};

module.exports = locationsController;
