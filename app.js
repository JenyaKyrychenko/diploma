const express = require('express')
const config = require('config')
const path = require('path')
const app = express()

//app.use(express.static('./public'))

app.use(express.json({extended:true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/speciality', require('./routes/speciality.routes'))
app.use('/api/researchwork', require('./routes/researchwork.routes'))
app.use('/api/declaration', require('./routes/declaration.routes'))
app.use('/api/exam', require('./routes/exam.routes'))
app.use('/api/examresults', require('./routes/examresult.routes'))
app.use('/api/mentor', require('./routes/mentor.routes'))

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

async function start(){
    try {
        app.listen(PORT,()=>{
            console.log(`Server has been started on port ${PORT}`)
        })
    }catch (e) {
        console.log('Error CONNECT')
    }
}

start()

