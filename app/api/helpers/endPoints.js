module.exports = (endPointsConfig, endPoints) => {
    var temp = {}
    return endPointsConfig.elements.map((elm) => {
        
        temp = {}
        endPointsConfig.keysToConsider.forEach((value) => {
            temp[value] = elm[value]
        });
        temp['target'] = endPoints[elm['target']];
        return temp
    })
}