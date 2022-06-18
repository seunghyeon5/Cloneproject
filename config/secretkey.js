module.exports = {
    secretKey : "ligthing-secret-key", // 원하는 시크릿 ㅍ키
    option : {
        algorithm : "HS256", // 해싱 알고리즘
        expiresIn : "180m",  // 토큰 유효 기간
        issuer : "issuer" // 발행자
    }
}