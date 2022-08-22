const jwt = require("jsonwebtoken");
const formidable = require('formidable');
const fs = require('fs');
const path = require('path')

const sign = "JaswinderJatt";



exports.verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = JSON.stringify(jwt.verify(token, sign));
        req.user = decoded

    } catch (err) {
        console.log(err)
        return res.status(401).send(err);
    }
    return next();
};


exports.formidableMiddleware = (req, res, next) => {
    const form = formidable({ multiples: true });
    form.parse(req, (err, body, files) => {
        if (err) {
            next(err);
            return;
        }
        req.body = body;
        req.files = files;

        Object.entries(req.files).forEach(([key, value]) => {
            var oldPath = value._writeStream.path;
            var ext = path.extname(value.originalFilename)
            var newPath = path.join(__dirname, '../Uploads/'+key) + '/' + value.newFilename + ext
            var rawData = fs.readFileSync(oldPath)
            fs.writeFile(newPath, rawData, function (err) {
                if (err) console.log(err)
                console.log("Successfully uploaded")
            })
        });

        return next();
    });
}