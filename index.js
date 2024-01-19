const express = require('express')  // require : import 처럼 모듈을 불러옴 
const fs = require('fs');  // fs 문서 가져와서 읽고, 쓰게하는 것
const cors = require('cors')  // cors 가져옴
const bodyParser = require('body-parser');
const app = express();
let data = JSON.parse(fs.readFileSync('./data.json')); //  fs.readFileSync 문서를 읽어내는 메소드

app.use(cors());  // cors 사용함
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/test', function (req, res) {  // /test 경로에 따라서 -> req 데이터값  res 응답
    res.send(data.test);
})

app.get('/test/:id', function (req, res) { //id 값으로 가져오기
    const { id } = req.params;
    const findData = data.test.find(obj => obj.id == id)  // filter 는 배열로 반환 , find 객체형태로 반환(1개의 값)
    res.send(findData)
})

app.post('/test', function (req, res) {

    data.test.push(req.body);            //프론트의 값을 받아서 데이터에 값을 추가
    const body = JSON.stringify(data);
    const dataInsert = fs.writeFileSync('./data.json', body);

    res.send(data.test);  //등록된 데이터값만 
})

app.delete('/test/:id', function (req, res) {
    const { id } = req.params;
    data.test = data.test.filter(obj => obj.id != id)
    const body = JSON.stringify(data);
    fs.writeFileSync('./data.json', body);
    res.send(data.test);
})

app.put('/test/', function (req, res) {
    const updateBody = req.body;

    data.test = data.test.map(obj => {
        if (obj.id == updateBody.id) {
            obj = updateBody;
        }
        return obj;
    })
    const body = JSON.stringify(data);
    fs.writeFileSync('./data.json', body);
    res.send(data.test);
})



const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Server is running... prot :${PORT}`)
})