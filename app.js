const express = require('express')
const config = require('config')
const app = express()

app.use(express.json({extended:true}))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/speciality', require('./routes/speciality.routes'))
app.use('/api/researchwork', require('./routes/researchwork.routes'))
app.use('/api/declaration', require('./routes/declaration.routes'))
app.use('/api/exam', require('./routes/exam.routes'))
app.use('/api/mentor', require('./routes/mentor.routes'))

const PORT = config.get('port') || 5000

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

