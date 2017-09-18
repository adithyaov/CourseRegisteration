module.exports = (accessControlConfig, jwtDecode) => {
    return (token) => jwtDecode(token, (error, decoded) => {
        
        var type = 0  
        var payload = {}
        if (!error) {
            type = decoded.payload.type
            payload = decoded.payload // don't mutate payload
        }

        boolAccess = accessControlConfig.targetsToConsider.map((elm) => {
            return type >= accessControlConfig.types[accessControlConfig.accessTargets[elm]]
        })

        temp = {}
        for (let i=0; i < accessControlConfig.targetsToConsider.length; i++) {
            temp[accessControlConfig.targetsToConsider[i]] = boolAccess[i]
        }
        
        return {
            accessTable: temp,
            payload: payload
        }

    })
}