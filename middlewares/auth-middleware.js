const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = async (req, res, next) => {
    
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = authorization.split(' ');
    if (tokenValue == 'null') {
        res.locals.users = null;
        next();
        return;
    }

    if (tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 사용하세요 🙄'
        });
        return;
    }
    try {
    const {userId} = jwt.verify(tokenValue, "ligthing-secret-key");
        // console.log(userId);
         //decoded가 제대로된 값
        
         

User.findById(userId).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (error) { //제대로 안된 값
        res.status(401).send({
            errorMessage: "로그인 후 사용하세요",
        });
        return;
    }
};