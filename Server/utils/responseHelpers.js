/*
	flag: Denotes whether or not to expect payload
	message: Short message regarding the response
	Payload: if certain payload is requested it will be found here
	
*/
exports.Unauthorized = (res, from = "") => {
    return res.status(401).json({
      flag: false,
      message: "Unauthorized" + from,
    });
  }
  
exports.BadRequest = (res, msg = "") => {
    return res.status(400).json({
		flag: false,
        message: msg === "" ? "Bad Request" : msg,
    });
}
  
exports.SomethingWentWrong = (res) => {
    return res.status(500).json({
		flag: false,
        message: "Something went wrong",
    });
}

exports.Success = (res, msg = "Success", payload = {}) => {
    return res.status(200).json({
		flag: true,
        message: msg,
        payload: payload,
    });
}

exports.NotFound = (res, msg = "404 Page not found") => {
    return res.status(200).json({
		flag: false,
        message: msg,
    });
}
