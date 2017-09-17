module.exports = (jwt, jwtConfig) => {
    return {
        encode: (payload, callback) => {
            return jwt.sign(
                {
                    payload: payload
                }, 
                jwtConfig['secret'],
                {
                    algorithm: jwtConfig['algorithm'],
                    expiresIn: jwtConfig['expiresIn']
                },
                (error, token) => {
                    return callback(error, token)
                }
            )
        },

        decode: (token, callback) => {
            return jwt.verify(token, jwtConfig['secret'],
            (error, decoded) => {
                return callback(error, decoded)
            })
        }
    }
}