module.exports = (accessControlConfig, jwtDecode) => {
    return (token) => jwtDecode(token, (error, decoded) => {
        
        type = 0        
        if (!error) {
            type = decoded.payload.type
        }

        boolAccess = accessControlConfig.targetsToConsider.map((elm) => {
            return type >= accessControlConfig.types[accessControlConfig.accessTargets[elm]]
        })

        temp = {}
        for (let i=0; i < accessControlConfig.targetsToConsider.length; i++) {
            temp[accessControlConfig.targetsToConsider[i]] =boolAccess[i] 
        }
        
        return temp;

    })
}