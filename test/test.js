const request = require("supertest");
const router = require("../app/route/user.routes");

  // Api 1st
  test('test case for Signup API', ()=>{
  var request_payload = {
                          "email":"abc@gmail.com",
                          "name":"Majid",
                          "password":"majid123",
                          "active":true
                        }
  const response = request(router)
    .post('/signup', request_payload)
    .expect(200);

    console.log("response=="+JSON.stringify(response))
  })

    // Api 2nd
    test('test case for Login API', ()=>{
      var request_payload = { email:"mazidkhan0018@gmail.com",password:"majid1"}

      const response = request(router)
        .post('/login', request_payload)
        .expect(200);

        console.log("response=="+JSON.stringify(response))
    })

    // Api 3rd
    test('test case for Search by QeuryParam API', ()=>{
      const response = request(router)
        .get('/news?search=india&token=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwibmFtZSI6IlNhdXJhYmgiLCJlbWFpbCI6Im1hemlka2h')
        .expect(200);

        console.log("response=="+JSON.stringify(response))
    })

    // Api 4th
    test('test case for Weather API', ()=>{
      const response = request(router)
        .get('/weather')
        .expect(200);

        console.log("response=="+JSON.stringify(response))
    })
