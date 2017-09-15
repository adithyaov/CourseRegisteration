module.exports = (jwt, jwtConfig) => {
    return {
        encode: (payload, callback) => {
            jwt.sign(
                {
                    payload: payload
                }, 
                jwtConfig['secret'],
                {
                    algorithm: jwtConfig['algorithm'],
                    expiresIn: jwtConfig['expiresIn']
                },
                (error, token) => {
                    callback(error, token)
                }
            )
        },

        decode: (token, callback) => {
            jwt.verify(token, jwtConfig['secret'],
            (error, decoded) => {
                callback(error, decoded)
            })
        }
    }
}