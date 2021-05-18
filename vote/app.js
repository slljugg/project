const express = require('express')  //express
const cors = require('cors')
const http = require('http')      //为创建ioserver引入
const cookieParser = require('cookie-parser')   //引用cookie
const socketIo = require('socket.io')  //为创建功能及时更新投票数据 引入socket.io模块
const md5 = require('md5')  //密码加密
const svgCaptcha = require('svg-captcha')  //验证码服务
const session = require('express-session') //验证码中间键服务
const fs = require('fs')
const fsp = fs.promises
// const nodemailer = require('nodemailer')   匹配不封装邮件的写法 
const mailer = require('./mailer')//封装邮件

const sqlite = require('sqlite')  //数据库
const sqlite3 = require('sqlite3') //数据库

const urlparse = require('urlparse') //解析路径
const jimp = require('jimp')  //注册头像修改图片大小

const multer = require('multer')  //解析图片
const upload = multer({dest: './upload/'}) //解析图片

const { response } = require('express')
const { fips } = require('crypto')

const app = express()
const server = http.createServer(app)
const ioserver = socketIo(server)

const port = 8090

app.locals.pretty = true//美化模板
app.set('views', __dirname + '/tpl')//设置模板引擎pug   当前文件夹tpl下

const base = __dirname + '/db/votes.db'
const dbPromise = sqlite.open({
  filename:base, //./db/votes.db  前面的是绝对路径  备注的是相对路径
  driver: sqlite3.Database
})  //用sqlite3打开sqlite数据库
let db

const chengePasswordTokenMap = {}


app.use(cookieParser('my secret')) //使用cookie

//app.use(session())
var sessions = {}
app.use(function session(req, res, next) {
  var sessionid = req.cookies.sessionid
  if(!sessionid) {
    sessionid = Math.random().toString(16).slice(2)
    res.cookie('sessionid',sessionid)
  } 
  if(!sessions[sessionid]) {
    sessions[sessionid] = {}
  }
  req.session = sessions[sessionid]
  next()
})    //验证码中间键  可用express-session代替

app.use(express.static(__dirname + '/static'))  //文件查询中间键
app.use('/upload',express.static(__dirname + '/upload'))



app.use(express.json())  // 解析json请求中间键
app.use(express.urlencoded({
  extended: true
}))  //解析url请求中间键

ioserver.on('connection', socket => {
  var path =urlparse (socket.request.headers.referer).path
  //console.log(path)
  socket.on('select room',roomid=> {
    socket.join('/vote/' + roomid) 
  })
})

app.use(cors({
  maxAge:86400,
  credentials:true,
  origin:'http://127.0.0.1:8080',
}))

app.use((req, res, next) => {
  res.set('Content-Type', 'text/html; charset=UTF-8')
  next()
})

app.get('/',async (req, res, next) => {
  // console.log(base)
  // console.log(req.url)
  var user = await db.get('SELECT * FROM users WHERE id=?',req.signedCookies.userid)
  if(req.signedCookies.userid) {
    res.send(`
    <div>
      <span>欢迎用户：${user.name}</span>
      <img src="/${user.avatar}" />
      <a href="/create.html">创建投票</a> 
      <a href="/logout">登出</a>
    </div>
    `)
  } else {
    res.send(`
    <div>
      <a href="/register">注册</a>
      <a href="/login">登录</a>
    </div>
  `)
  }
})

app.route('/register')
  .get((req, res, next) => {
    res.send(`
      <form action="/register" method="post"  enctype="multipart/form-data">
        用户名：<br>
        <input type="text" name="name"></input> <br>
        邮  箱：<br>
        <input type="text" name="email"></input> <br>
        密  码：<br>
        <input type="password" name="password"></input> <br>
        头  像：<br>
        <input type="file" name="avatar"></input> <br>
        <button>注册</button>
      </form>
    `)
  })
  .post(upload.single('avatar'), async (req, res, next) => {
    var userInfo = req.body
    
    //var imgBuf = await fsp.readFile(req.file.path)
    jimp.read(req.file.path,(err,lenna) => {
      if(err) throw err
      lenna
        .resize(15,15)
        .write(req.file.path)
    })

    var user = await db.get('SELECT * FROM users WHERE name=?',userInfo.name)
    if(user) {
      res.end(`
        用户名被注册，<span id="count">3</span>秒后将跳回注册页面请重新注册......
        <script>
          var countSign = 2
          setInterval(() => {
            count.textContent = countSign--
          }, 1000)

          setTimeout(() => {
            location.href = '/'
          },3000)
        </script>
      `)
    } else {
      await db.run('INSERT INTO users (name, email, password,avatar) VALUES(?,?,?,?)',userInfo.name,userInfo.email,md5(md5(userInfo.password)), req.file.path)
      res.end(`
        注册成功，即将返回首页......
        <script>
          setTimeout(() => {
            location.href = '/'
          },1000)
        </script>
      `)
    }
  })
  
  app.route('/login')
  .get((req, res, next) => {
    res.send(`
      <form id="loginform" action="/login" method="post">
        用户名：<br>
        <input type="text" name="name"></input> <br>
        密  码：<br>
        <input type="password" name="password"></input> <br>
        验证码：<br>
        <input type="text" name="captcha"></input> <br>
        <img src="/captcha" id="imgcaptcha" /> <br>
        <a href="/forget">忘记密码</a>
        <button>登录</button>
      </form>

      <script>
        var imgcaptcha = document.querySelector('#imgcaptcha')
        imgcaptcha.onclick = () => {
            imgcaptcha.src='/captcha?' + Date.now()
        }
        loginform.onsubmit = e => {
          var name = document.querySelector('[name="name"]').value
          var password = document.querySelector('[name="password"]').value
          var captcha = document.querySelector('[name="captcha"]').value
          e.preventDefault()
          var xhr = new XMLHttpRequest()
          xhr.open('post','/login')
          xhr.onload = () => {
            var data = JSON.parse(xhr.responseText)
            if(data.code == 0) {
              alert('login sucess')
              location.href = '/'
            } else {
              alert('login failed')
              imgcaptcha.click()
            }
          }
          xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8')
          xhr.send('name=' + name + '&password=' + password +'&captcha=' + captcha)
        }
      </script>
    `)
  })
  .post(async (req, res, next) => {
    var loginUser = req.body
    console.log(loginUser)
    if(loginUser.captcha != req.session.captcha) {
      res.json({code:-1,msg:'验证码错误'})
      return
    }
    var user = await db.get('SELECT * FROM users WHERE name=? AND password=?', loginUser.name,md5(md5(loginUser.password)))
    if(user) {
      res.cookie('userid', user.id, {
        signed: true
      })
      res.json({code:0})
      // return   ajax 写法
      // res.end(`
      //   登陆成功,即将返回首页......
      //   <script>
      //     setTimeout(() => {
      //     location.href = '/'
      //     },1000)
      //   </script>
      // `)
      //res.render('login.pug',{})
    } else {
      res.json({code:-1,msg:'用户名或密码错误'})
      //return
      // res.end(`
      //   用户名或密码错误，<span id="count">3</span>秒后返回登陆界面请重新登陆......
      //   <script>
      //     var countSign = 2
      //     setInterval(() => {
      //     count.textContent = countSign--
      //     }, 1000)
      //     setTimeout(() => {
      //       location.href = '/login'
      //     },3000)

      //     imgcaptcha.onclick = () => {
      //       var src = imgcaptcha.src
      //       imgcaptcha.src = ''
      //       setTimeout(() => {
      //         imgcaptcha.src = src
      //       },1)
      //     }
      //     imgcaptcha.click()
      //   </script>
      // `)
    }
  })

app.get('/captcha', (req, res, next ) => {
  var captcha = svgCaptcha.create({
    ignoreChars:'0oli1'
  })
  res.type('svg')
  res.end(captcha.data)
  req.session.captcha = captcha.text
})

app.route('/forget')
  .get((req, res, next) => {
    res.send(`
    <form action="/forget" method="post">
      请输入您的邮箱：<br>
      <input type="text" name="email"></input> <br>
      <button>确定</button>
    </form> 
    `)
  })
  .post(async (req, res, next) => {
    //console.log(req.body)
    var email = req.body.email
    var user = await db.get('SELECT * FROM users WHERE email=?',email)
    if(!user) {
      res.end(`
        不存在此邮箱，<span id="count">3</span>秒后返回重新填写用户邮箱......
        <script>
          var countSign = 2
          setInterval(() => {
          count.textContent = countSign--
          }, 1000)
          setTimeout(() => {
            location.href = '/forget'
          },3000)
        </script>
      `)
      return
    }
    var token = Math.random().toString().slice(2)
    chengePasswordTokenMap[token] = email
    var link = `http://localhost:8080/#/change-password/${token}`

    mailer.sendMail({
      from: '994192111@qq.com',
      to: '994192111@qq.com',
      subject: '大家好，我是lei',
      text: link,
    } ,(err,info) => {
      if(err) {
        return console.log(err)
      }
      console.log('Message sent: ' + info.response)
    })
    // var transport = nodemailer.createTransport('smtps://994192111%40qq.com:niymkasczvkhbfgc@smtp.qq.com')
    // var mailOptions = {
    //   from: '994192111@qq.com',
    //   to: '994192111@qq.com',
    //   subject: '大家好，我是lei',
    //   text: link,  
    // }     匹配不封装的邮件写法
    //   transport.sendMail(mailOptions, function(err, info){
    //   if(err){
    //     return console.log(err)
    //   }
    //   console.log('Message sent: ' + info.response)
    //   })
    res.end(`
    已经向您的邮箱发送重置链接，<span id= "count">3</span>秒后返回主页......
      <script>
        var countSign = 2
        setInterval(() => {
        count.textContent = countSign--
        }, 1000)
        setTimeout(() => {
          location.href = '/'
        },3000)
      </script>
    `)
  })

app.route('/change-password/:token')
  .get(async (req, res, next) => {
    var token = req.params.token
    var email = chengePasswordTokenMap[token]
    var user = await db.get('SELECT * FROM users WHERE email=?',email)
    if(!user) {
      res.end('此链接已失效')
      return
    }
    // var user = users.find(it => it.email == chengePasswordTokenMap[token])
    res.send(`
    此页面可以重置${user.name}的密码
    <form action="" method="post">
      <input type="password" name="password"></input> <br>
      <button>确定</button>
    </form>
    `)
  })
  .post(async (req, res, next) => {
    var token = req.params.token
    var email = chengePasswordTokenMap[token]
    var user = await db.get('SELECT * FROM users WHERE email=?',email)
    if(!user) {
      res.end('此链接已失效')
      return
    }

    setTimeout(() => {
      delete chengePasswordTokenMap[token]
    }, 60 * 1000 * 20)
    var password = req.body.password
      await db.run('UPDATE users SET password=? WHERE email=?',md5(md5(password)),email)
      res.end('密码已重置')
  })

app.get('/logout',(req, res, next) => {
  res.clearCookie('userid')
  res.redirect('/')
})

app.post('/create-vote', async (req, res, next) => {
  console.log(req.body)
  var infoVote = req.body
  var userid = req.signedCookies.userid
  await db.run('INSERT INTO votes (title,desc,userid,singleSelection,deadline,anonymouse) VALUES (?,?,?,?,?,?)',infoVote.title, infoVote.desc, userid, infoVote.singleSelection, new Date(infoVote.deadline).getTime(), infoVote.anonymouse)

  var vote = await db.get('SELECT * FROM votes ORDER BY id DESC LIMIT 1')
  await Promise.all(infoVote.options.map(option => {
    return db.run('INSERT INTO options (content,voteid) VALUES(?,?)',option,vote.id)
  }))
  if(req.is('json')) {
    res.json(vote)
  } else {res.end(`
    ${vote.id}号投票已经创建完成，<span id= "count">3</span>秒后前往投票成功页面......
    <script>
      var countSign = 3
      setInterval(() => {
      count.textContent = countSign--
      }, 1000)
      setTimeout(() => {
      location.href = '/vote/${vote.id}'
      },3000)
  </script>
  `)}
})
app.get('/voteinfo/:id', async (req, res, next) =>{
  var info = await db.get('SELECT * FROM votes WHERE id=?',req.params.id)
  var options = await db.all('SELECT * FROM options WHERE voteid=?',req.params.id)
  var voteups = await db.all('SELECT * FROM voteups WHERE voteid=?',req.params.id)
  res.json({
    info,
    options,
    voteups
  })
})
app.get('/vote/:id',async (req, res, next) =>{
  var id = req.params.id
  var votePromise = db.get('SELECT * FROM votes WHERE id=?',id)
  var optionsPromise = db.all('SELECT * FROM options WHERE voteid=?',id)

  var vote = await votePromise
  var options = await optionsPromise
  res.render('vote.pug',{
    vote: vote,
    options: options
  })
})



app.post('/voteup',async (req, res, next) => {
  //console.log(req.signedCookies.userid)
  //console.log(req.body)
  var userid = req.signedCookies.userid
  var body = req.body
  var voteid = req.body.voteid
  var voteupInfo = await db.get('SELECT * FROM voteups WHERE userid=? AND voteid=?',req.signedCookies.userid, req.body.voteid)
  if(voteupInfo) {
    //res.end()  //投过票不可更改选项
    await db.run ('UPDATE voteups SET optionid=? WHERE userid=? AND voteid=?',req.body.optionid, req.signedCookies.userid,  req.body.voteid) //投过票可以更改选项
  } else {
    await db.run ('INSERT INTO voteups (userid, optionid, voteid) VALUES (?,?,?)',req.signedCookies.userid, req.body.optionid, req.body.voteid)
  }

  ioserver.in(`/vote/${voteid}`).emit('new vote', {
    userid,
    voteid,
    optionid:body.optionid
  })//投票后在这个页面触发new vote事件  

  var voteups = await db.all('SELECT * FROM voteups WHERE voteid=?',req.body.voteid)
  res.json(voteups)
})

app.get('/voteup/:id/info',async (req, res, next) => {
  //console.log(req.body)
  var userid = req.signedCookies.userid
  //console.log(userid)
  var voteid = req.params.id
  var userVoteupInfo = await db.get('SELECT * FROM voteups WHERE userid=? AND voteid=?',userid, voteid)
  //console.log(userVoteupInfo)
  if(userVoteupInfo) {
    var voteups = await db.all('SELECT * FROM voteups WHERE voteid=?',voteid)
    res.json(voteups)
  } else {
    res.json(null)
  }
})


dbPromise.then(dbObject => {
  db = dbObject
  server.listen(port, () => console.log(port))
})