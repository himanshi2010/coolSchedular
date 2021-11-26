const {Success} = require("../utils/responseHelpers");

exports.getHomePage = async (req, res, next) => {
	try {
        console.log("Inside Get Home Page Controller");
      	return Success(res, "Success");
	} catch (err) {
		console.log("Get Home Page:", err);
		return SomethingWentWrong(res);
  	}	
};