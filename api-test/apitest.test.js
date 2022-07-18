var supertest = require('supertest')
const request = supertest('https://reqres.in/')

let job;

describe('user manage test suit',()=>{
     beforeAll(()=>{
      console.log('-------Started running Test Cases-------')
     });

     afterAll(()=>{
       console.log('-------Finished running Test Cases-------')
     });

     test.each([1,2,3])('GET-> all users from page (%s)', async(page)=>{
        const response = await request.get(`api/users?page=${page}`)
        console.log('Recevied all users',response.body)

        expect(response.status).toBe(200)
     });

     test.each(Array.from(Array(5).keys()))('GET-> all users from page (%s)', async(page)=>{
        const response = await request.get(`api/users?page=${page}`)
        console.log('Recevied all users',response.body)

        expect(response.status).toBe(200)
     });

     test('POST-> create a new user', async()=>{
         let user ={
                       "name": "Anu",
                       "job": "SDET"
                   }
         const response = await request.post('api/users').send(user)
         job = response.body.job
         console.log('New user created:',response.body)

         expect(response.body.job).toBe("SDET")
         expect(response.status).toBe(201)
     });

     test.each(["Shruti","Nidhi"])('POST-> create a new user (%s)', async(name)=>{
         let user ={
                       "name": `${name}`,
                       "job": "SDET"
                   }
         const response = await request.post('api/users').send(user)
         job = response.body.job
         console.log('New user created:',response.body)

         expect(response.body.job).toBe("SDET")
         expect(response.status).toBe(201)
     });

     test.each([["Shruti","SDET"],["Nidhi","Officer"]])('POST-> create a new user-> (%s) (%s)', async(name,job)=>{
         let user ={
                       "name": `${name}`,
                       "job": `${job}`
                   }
         const response = await request.post('api/users').send(user)
         job = response.body.job
         console.log('New user created:',response.body)

         expect(response.body.job).toBe(`${job}`)
         expect(response.status).toBe(201)
     });

     test('PUT-> update the single user', async()=>{
         let updateUser = {
                              "name": "Utkarsh",
                              "job": `${job}`
                          }
         const response = await request.put('api/users/2').send(updateUser)
         console.log('Updated user:',response.body)

         expect(response.body.name).toBe('Utkarsh')
         expect(response.body.job).toBe(`${job}`)
         expect(response.status).toBe(200)
     });

     test('DELETE-> delete the single user', async()=>{
        const response = await request.delete('api/users/2')
         console.log('Deleted the user:',response.body)

         expect(response.status).toBe(204)
     });
});