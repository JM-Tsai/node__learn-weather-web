import request from 'postman-request'; 
 
// 重構  callback 添加
export const geocode = (address, callback) => {
    // encodeURIComponent() 用於將字串中的特殊字元進行編碼，以便在 URL 中使用或傳遞給伺服器時，確保資料的正確傳輸和解析。
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2hhc2VsOTA4ODciLCJhIjoiY2xsZ3Q3aHg1MHd6cTNlcWF0YzRxODI2MSJ9.7FAquPdtmLHZ3h-AsuCMyQ';
 
    // http 請求響應
    request({url: geoURL, json: true}, (error, {body}) => {
        if (error) {
            callback(`無法連接伺服器!`, undefined)
            // else if 如果搜尋的陣列內為 0，則執行
        } else if (body.features.length === 0) {
            callback(`搜尋不到該位置!`, undefined)
        } else {
            callback(undefined, {
                currentLocation: body.features[0].text, 
                lat: body.features[0].center[1],
                lon: body.features[0].center[0]
            });
        }
    })
}

// // 重構  callback 添加
// export const geocode = (address, callback) => {
//     // encodeURIComponent() 用於將字串中的特殊字元進行編碼，以便在 URL 中使用或傳遞給伺服器時，確保資料的正確傳輸和解析。
//     const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2hhc2VsOTA4ODciLCJhIjoiY2xsZ3Q3aHg1MHd6cTNlcWF0YzRxODI2MSJ9.7FAquPdtmLHZ3h-AsuCMyQ';

//     // http 請求響應
//     request({url: geoURL, json: true}, (error, response) => {
//         if (error) {
//             callback(`無法連接伺服器!`, undefined)
//             // else if 如果搜尋的陣列內為 0，則執行
//         } else if (response.body.features.length === 0) {
//             callback(`搜尋不到該位置!`, undefined)
//         } else {
//             callback(undefined, {
//             currentLocation: response.body.features[0].place_name, 
//             lat: response.body.features[0].center[1],
//             lon: response.body.features[0].center[0]
//         });
//         }
//     })
// }