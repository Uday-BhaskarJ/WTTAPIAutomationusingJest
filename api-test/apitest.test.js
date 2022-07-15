var supertest = require('supertest')
const request = supertest('https://reqres.in/')

it('Get all users', async ()=>{
   const response = await request.get('api/users?page=2')
   console.log(response.body)
     
})