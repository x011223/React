let express = require('express')
let axios = require('axios')

let app = express();
let apiRoutes = express.Router()

// 获取书籍排行列表
apiRoutes.get('/getRanks', function (req, res) {
    let url = 'http://api.zhuishushenqi.com/ranking/gender'
    // let url = BOOK_MALL_API.rank.rankCategory
    //通过axios发送http请求,修改headers
    axios.get(url, {
        // headers: {
        //   //发送http 请求修改referer,host
        //   referer: 'http://m.zhuishushenqi.com/?from=www.zhuishushenqi.com',
        //   //欺骗手段
        //   host: 'm.zhuishushenqi.com'
        // },    
    }).then((response) => {
        res.json(response.data)
        // console.log(res)
        // console.log(response)
    }).catch((e) => {
      console.log(e)
    })
})

// 获取排行榜书籍列表
// 排行榜ID
apiRoutes.get('/jumpToRanks', function (req, res) {
    let url = `http://api.zhuishushenqi.com/ranking/${req.query.id}`
    //通过axios发送http请求,修改headers
    axios.get(url, {
        headers: {
          //发送http 请求修改referer,host
          referer: 'http://m.zhuishushenqi.com/?from=www.zhuishushenqi.com',
          //欺骗手段
          host: 'm.zhuishushenqi.com'
        },    
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
})

// 获取书籍详情
// 书籍ID
apiRoutes.get('/getBookDetail', function (req, res) {
    let url = `http://api.zhuishushenqi.com/book/${req.query.id}`
    //通过axios发送http请求,修改headers
    axios.get(url).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
})


// 获取所有书源
// 书籍ID
apiRoutes.get('/getBookSource', function (req, res) {
    let url = `http://api.zhuishushenqi.com/atoc?view=summary&book=${req.query.id}`
    //通过axios发送http请求,修改headers
    axios.get(url, {
        headers: {
          //发送http 请求修改referer,host
          referer: 'http://m.zhuishushenqi.com/?from=www.zhuishushenqi.com',
          //欺骗手段
          host: 'm.zhuishushenqi.com'
        },    
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
})

// 获取书籍章节列表.
// 书源ID 
apiRoutes.get('/getBookChapters', function (req, res) {
    let url = `http://api.zhuishushenqi.com/toc/${req.query.id}?view=chapters`
    //通过axios发送http请求,修改headers
    axios.get(url, {
        headers: {
          //发送http 请求修改referer,host
          referer: 'http://m.zhuishushenqi.com/?from=www.zhuishushenqi.com',
          //欺骗手段
          host: 'm.zhuishushenqi.com'
        },    
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
})

// 获取章节内容
// 章节列表得到  link
apiRoutes.get('/getChapterContent', function (req, res) {
    let url = `http://chapter2.zhuishushenqi.com/chapter/${req.query.link}`
    //通过axios发送http请求,修改headers
    axios.get(url, {
        headers: {
          //发送http 请求修改referer,host
          referer: 'http://m.zhuishushenqi.com/?from=www.zhuishushenqi.com',
          //欺骗手段
          host: 'chapter2.zhuishushenqi.com'
        },    
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
})

app.use('/api', apiRoutes)
// app.use(express.static("./build"))
let port = 4396;

module.exports = app.listen(port, (err) => {
    if(err) {
        console.log(err)
        return
    }
    console.log(port+'\n')
})



// apiRoutes.get('/post_text', function(req, res) {
//     const data = {
//         access_token: req.query.access_token,
//         status: req.query.status
//     }
//     request.post({
//         url: "https://api.weibo.com/2/statuses/update.json",
//         form: data,
//         encoding:'utf8'
//     },
//     function(error, response, body){
//         if(response.statusCode == 200){
//             res.json(body)
//         }else{
//             console.log(body)
//             console.log(response.statusCode);
//         }
//     })
// })