// express 實際上是一個函式
import express from 'express';
import * as getGeoCode from './utiles/geocode.js';
import * as forecast from './utiles/forecast.js';


// 取得路徑位置
// 從 path 取得解構 dirname & join
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import hbs from 'hbs';
import { url } from 'inspector';

// '將路徑儲存於變數內
// fileURLToPath 函式 import.meta.url 將路徑轉換為 字串型態，以便後續 dirname 與 join調整
const __filename = fileURLToPath(import.meta.url)
// dirname 提取 路徑的目錄部分
const __dirname = dirname(__filename)
// 加入到需要的路徑
const publicDirname = join(__dirname, '../public')
const publicJs = join(__dirname, '../public/js')

// 指定HBS文件的位置
const viewPath = join(__dirname, '../templates/views')
const partialsPath = join(__dirname, '../templates/partials')

// 端口處理
// 設置一個變數儲存 PORT 
// env 是一個process的物件，後續接的 .PORT 必須為大寫
// || 3000 前方接收不到就用 本地端口
const port = process.env.PORT || 3000

// 創建一個變數儲存 express 應用程式，並使用 express 本身提供的各種方法
// 下方使用的 .get() 之類的
const app = express()

// .set 是 express 庫提供的方法，用於設置選項
// view engine ，第一個用於配置的指定名稱，"不一定是view engine"
// "hbs"， 要使用的引擎名稱
app.set('view engine', 'hbs')
// 指定配置內容(s不能少), viewPath 試圖模板所在位置
app.set('views', viewPath)
app.use(express.static(publicDirname))
app.use(express.static(publicJs))
hbs.registerPartials(partialsPath)

// 參數內第一個 路徑: URL、正則表示式、字串等等
// 回調函式內參數為 REQ (request 請求)、 RES (response 回應) 縮寫
// app.get('', (req, res) => {
//     // 能將內容發送回請求者
//     res.send('<h1>hello express!</h1>')
// })

// app.get('/help', (req, res) => {
//     // 會自動將 JSON 字串解析
//     res.send({
//         name: 'Alex',
//         age: 24,
//         from: 'Taiwan'
//     })
// })

app.get('', (req, res) => {
    // .render 讓同樣模板名稱的數據(html文件)可以模板結合
    res.render('index', {
        title: 'Weather App',
        content: 'Alex Tsai',
        created: 'Alex Tsai'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        content: '2023年 8月的 node 學習案例',
        created: 'Alex Tsai'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        content: '客服(沒人)',
        created: 'Alex Tsai'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: '需要所在位置資訊!'
        })
    }
                                                    // 設置空物件 = {} 默認參數以防止報錯，才會轉入 error
    getGeoCode.geocode(req.query.address, (error, {lat, lon, currentLocation} = {}) => {
    
        if (error) {
            return res.send({error});
        } 
    
        // callback Chain 回調鏈模式
        // 通過將一個非同步操作的結果傳遞給下一個操作，從而形成一個連續的操作序列。
        forecast.getForecast(lat, lon, (error, forecastdata) => {

            if (error) {
                return res.send({error});
            }
            // callback Chain 回調鏈模式
            res.send({
                currentLocation,
                forecast: forecastdata,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    // ! 邏輯運算子運用，都參數為否，輸出 .send error
    if (!req.query.search) {
        // 使用 return 在觸發時會停止向下執行，就不會另外觸發兩個 .send 的錯誤。
        return res.send({
            error: '提供錯誤'
        })
    }
    res.send({
        products: []
    })
})

// 特定模式請求
// 在指定字串後加上通配符
app.get('/help*', (req, res) => {
    res.send('找不到幫助文章')
})

// 設置 404 page
// * 通配選擇到所有會產生錯誤的 page
app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        content: '找不到文章',
        created: 'Alex Tsai'
    })
})

// 能啟動伺服器並且監聽特定端口，以回應請求與響應。
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})

