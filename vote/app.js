const express = require('express')
const cookieParser = require('cookie-parser')
// const nodemailer = require('nodemailer')   匹配不封装邮件的写法 
const mailer = require('./mailer')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')
const { response } = require('express')

const port = 8080
const app = express()

const base = __dirname + '/db/votes.db'

const dbPromise = sqlite.open({
  filename:base, 
  driver: sqlite3.Database
})
let db

const chengePasswordTokenMap = {}



app.use((req, res, next) => {
  res.set('Content-Type', 'text/html; charset=UTF-8')
  next()
})

app.use(cookieParser('my secret'))

app.use(express.static(base + './static'))

app.use(express.urlencoded({
  extended: true
}))

app.get('/',(req, res, next) => {
  // console.log(base)
  // console.log(req.url)
  if(req.signedCookies.user) {
    res.send(`
    <div>
      <span>欢迎用户：${req.signedCookies.user}</span>
      <a href="/create">创建投票</a> 
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
      <form action="/register" method="post">
        用户名：<br>
        <input type="text" name="name"></input> <br>
        邮  箱：<br>
        <input type="text" name="email"></input> <br>
        密  码：<br>
        <input type="password" name="password"></input> <br>
        <button>注册</button>
      </form>
    `)
  })
  .post(async (req, res, next) => {
    var userInfo = req.body
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
      await db.run('INSERT INTO users (name, email, password) VALUES(?,?,?)',userInfo.name,userInfo.email,userInfo.password)
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
        <a href="/forget">忘记密码</a>
        <button>登录</button>
      </form>
    `)
  //   <script>
  //   loginform.onsubmit = e => {
  //     var name = document.querySelector('[name="name"]').value
  //     var password = document.querySelector('[name="password"]').value
  //     e.preventDefault()
  //     var xhr = new XMLHttpRequest()
  //     xhr.open('post','/login')
  //     xhr.onload = () => {
  //       var data = JSON.parse(xhr.responseText)
  //       if(data.code == 0) {
  //         alert('login sucess')
  //         location.href = '/'              ajax写法   接在上面括号内
  //       } else {
  //         alert('login failed')
  //       }
  //     }
  //     xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8')
  //     xhr.send('name=' + name + '&password=' + password)
  //   }
  // </script>
  })
  .post(async (req, res, next) => {
    var loginUser = req.body
    var user = await db.get('SELECT * FROM users WHERE name=? AND password=?', loginUser.name,loginUser.password)
    if(user) {
      res.cookie('user', loginUser.name, {
        signed: true
      })
      // res.json({code:0})
      // return   ajax 写法
      res.end(`
        登陆成功,即将返回首页......
        <script>
          setTimeout(() => {
          location.href = '/'
          },1000)
        </script>
      `)
    } else {
      // res.json({code:-1})
      // return
      res.end(`
        用户名或密码错误，<span id="count">3</span>秒后返回登陆界面请重新登陆......
        <script>
          var countSign = 2
          setInterval(() => {
          count.textContent = countSign--
          }, 1000)
          setTimeout(() => {
            location.href = '/login'
          },3000)
        </script>
      `)
    }
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
    var link = `http://localhost:8080/change-password/${token}`

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
      await db.run('UPDATE users SET password=? WHERE email=?',password,email)
      res.end('密码已重置')
  })

app.get('/logout',(req, res, next) => {
  res.clearCookie('user')
  res.redirect('/')
})

app.get('/create', (req, res, next) => {

})
dbPromise.then(dbObject => {
  db = dbObject
  app.listen(port, () => {
    console.log(port)
  })
})