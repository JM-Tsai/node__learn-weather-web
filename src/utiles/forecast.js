import request from "postman-request";

export const getForecast = (lat, lon, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=109d8b0d013bf055fb5bc13f2557101d&query=${lat},${lon}&units=f`;

    request({url, json: true}, (error, {body}) => {
        if (error) { 
            callback('無法連接服務!', undefined)
        } else if (body.location === 0) {
            callback('無法獲取地理座標!', undefined)
        } else {
            callback(undefined, `觀察時間: ${body.current.observation_time} 降雨機率: ${body.current.precip} % 天氣預報: ${body.current.weather_descriptions} `)
        }

    })
}
// 當前位置: 位置:${response.body.location.name}



// export const getForecast = (lat, lon, callback) => {
//     const url = `http://api.weatherstack.com/current?access_key=109d8b0d013bf055fb5bc13f2557101d&query=${lat},${lon}&units=f`;

//     request({url: url, json: true}, (error, response) => {
//         if (error) {
//             callback('無法連接服務!', undefined)
//         } else if (response.body.location === 0) {
//             callback('無法獲取地理座標!', undefined)
//         } else {
//             callback(undefined, `位置:${response.body.location.name}  今日天氣狀態預報:${response.body.current.weather_descriptions}`)
//         }
//     })
// }