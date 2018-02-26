exports.logRequest = function (req, res, next) {
    var url = req.originalUrl || "";
    var data = {
        type: req.method,
        url: url,
        pathParams: req.params || "",
        queryParams: req.query || "",
        bodyParams: req.body || ""
    };
    if (url.indexOf('/doc') == -1 && url.indexOf('/partials') == -1 && url.indexOf('/resources') == -1 && url.indexOf('/app.js') == -1) {
        logger.info(data);
    }
    next();
};

exports.logErrors = function (err, req, res, next) {
    var data = {
        type: req.method,
        url: req.originalUrl || "",
        pathParams: req.params || "",
        queryParams: req.query || "",
        bodyParams: req.body || "",
        err: err || "",
        stack: err.stack || ""
    };
    logger.error(data);
    next(err);
};