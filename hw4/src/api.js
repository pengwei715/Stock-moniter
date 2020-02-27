export function urlForImage(item) {
    const api_key_param = "api_key=txwDhoGTA6ZdRj1nHYYadWNQpivQCWj7JaCXyWgl"
    const today = `&date=${item}`
    const base_url = `https://api.nasa.gov/planetary/apod`
    const api_url = `${base_url}?${api_key_param}${today}`
    return api_url
}

export function getLastweek(date) {
    var res = []
    var today = new Date(date.getTime())
    for (var i = 0; i < 7; i++) {
        today.setDate(today.getDate() - 1)
        res.push(today.toISOString().substring(0, 10))
    }
    return res
}

export function getLastSevenURLS(dateList) {
    var res = dateList.map(urlForImage)
    return res
}


export function urlForAllNeo(start, end) {
    const api_key_param = "api_key=txwDhoGTA6ZdRj1nHYYadWNQpivQCWj7JaCXyWgl"
    const st = `start_date=${start}`
    const ed = `&end_date=${end}`
    const base_url = `https://api.nasa.gov/neo/rest/v1/feed`
    const api_url = `${base_url}?${st}${ed}&${api_key_param}`
    return api_url
}