import supertest from "supertest";
import prisma from "../../src/database/database";
import app from '../../src/app'
import * as auth_factory from '../factories/user_factory'
import * as thought_factory from '../factories/thought_factory'
import dotenv from 'dotenv'
dotenv.config()


beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE users RESTART IDENTITY CASCADE`
    
  });

  
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Testa POST /sign-up ', () => {
    it('Deve retornar 201, se cadastrado usuario no formato correto', async()=>{
      const body= await auth_factory.fixed_user()
  
      const result = await supertest(app).post('/sign-up').send(body)
  
      const status = result.status
  
      expect(status).toEqual(201)
  
    });

    it('Deve retornar 422, se informações vierem vazias', async()=>{
      const body= await auth_factory.empty_logup_info()
  
      const result = await supertest(app).post('/sign-up').send(body)
  
      const status = result.status
  
      expect(status).toEqual(422)
  
    });

    it('Deve retornar 409, ao tentar cadastrar um item que exista', async()=>{
      const body= await auth_factory.fixed_user()
  
      await supertest(app).post('/sign-up').send(body)

      const result = await supertest(app).post('/sign-up').send(body);
      
      const status = result.status
  
      expect(status).toEqual(409)
    });
  });

  describe('Testa POST /sign-in', ()=>{
    it('Deve retornar 200 se o login for bem sucedido', async()=>{
      
      const user = await auth_factory.fixed_user()

      const body = await auth_factory.user_login()

      await supertest(app).post('/sign-up').send(user)

      const result = await supertest(app).post('/sign-in').send(body)

      const status = result.status

      expect(status).toEqual(200)

    })

    it('Deve retornar 401 se a senha digitada estiver incorreta',async()=>{

      const user = await auth_factory.fixed_user()

      const body = await auth_factory.user_login_wrong_password()

      await supertest(app).post('/sign-up').send(user)

      const result = await supertest(app).post('/sign-in').send(body)

      const status = result.status

      expect(status).toEqual(401)
    })

    it('Deve retornar 404 se email digitado estiver incorreto',async()=>{

      const user = await auth_factory.fixed_user()

      const body = await auth_factory.user_login_wrong_email()

      await supertest(app).post('/sign-up').send(user)

      const result = await supertest(app).post('/sign-in').send(body)

      const status = result.status

      expect(status).toEqual(404)
    })

    it('Deve retornar 422 se vier informações vazias',async()=>{

      const user = await auth_factory.fixed_user()

      const body = await auth_factory.user_login_empty()

      await supertest(app).post('/sign-up').send(user)

      const result = await supertest(app).post('/sign-in').send(body)

      const status = result.status

      expect(status).toEqual(422)
    })
  })

  describe('Testa POST /home ', () => {
    it('Deve retornar 201, se cadastrado corretamente', async()=>{
        const user = await auth_factory.fixed_user()

        const body = await auth_factory.user_login()
  
        await supertest(app).post('/sign-up').send(user)

        const login_data = await supertest(app).post('/sign-in').send(body)

        //When using Supertest, the result comes as result.body
        const token = login_data.body.token;
        console.log(login_data)

        const correct_thought = await thought_factory.correct_thought()

        const send_thought = await supertest(app).post('/home').send(correct_thought).set("Authorization", `Bearer ${token}`)

        const status = send_thought.status
  
        expect(status).toEqual(201)
    });

    it('Deve retornar 422 se dados vierem vazios', async()=>{
      const user = await auth_factory.fixed_user()

      const body = await auth_factory.user_login()

      await supertest(app).post('/sign-up').send(user)

      const login_data = await supertest(app).post('/sign-in').send(body)

      //When using Supertest, the result comes as result.body
      const token = login_data.body.token;
      console.log(login_data)

      const correct_thought = ''

      const send_thought = await supertest(app).post('/home').send(correct_thought).set("Authorization", `Bearer ${token}`)

      const status = send_thought.status

      expect(status).toEqual(422)
  });

    it('Deve retornar 401 quando token vier vazio', async()=>{

      const user_for_logup = await auth_factory.fixed_user()

      const user = await auth_factory.user_login()

      const correct_thought = await thought_factory.correct_thought()

      await supertest(app).post('/sign-up').send(user_for_logup)

      const login_data = await supertest(app).post('/sign-in').send(user);

      //When using Supertest, the result comes as result.body
      const token = login_data.body.token;

      //using set to send the Authorization Bearer Token correctly
      const send_thought = await supertest(app).post('/home').send(correct_thought)

      const status = send_thought.status

      expect(status).toEqual(401)

    })

    it('Deve retornar 401 quando vier com Authorization errado', async()=>{

      const user_for_logup = await auth_factory.fixed_user()

      const user = await auth_factory.user_login()

      const correct_thought = await thought_factory.correct_thought()

      await supertest(app).post('/sign-up').send(user_for_logup)

      const login_data = await supertest(app).post('/sign-in').send(user);

      //When using Supertest, the result comes as result.body

      const token = login_data.body.token;

      //using set to send the Authorization Bearer Token correctly
      const send_thought = await supertest(app).post('/home').send(correct_thought).set("A", `Bearer ${token}`)

      const status = send_thought.status

      expect(status).toEqual(401)

    })

    it('Deve retornar 401 para Bearer incorreto', async()=>{

      const user_for_logup = await auth_factory.fixed_user()

      const user = await auth_factory.user_login()

      const correct_thought = await thought_factory.correct_thought()

      await supertest(app).post('/sign-up').send(user_for_logup)

      const login_data = await supertest(app).post('/sign-in').send(user);

      //When using Supertest, the result comes as result.body

      const token = login_data.body.token;

      //using set to send the Authorization Bearer Token correctly
      const send_thought = await supertest(app).post('/home').send(correct_thought).set("Authorization", `B ${token}`)

      const status = send_thought.status

      expect(status).toEqual(401)

    })
})

describe('Testa GET /diagnostic ', () => {
  it('Deve retornar 200, se dados vierem corretamente', async()=>{
    const user_for_logup = await auth_factory.fixed_user()

    const user = await auth_factory.user_login()

    const correct_thought = await thought_factory.correct_thought()

    await supertest(app).post('/sign-up').send(user_for_logup)

    const login_data = await supertest(app).post('/sign-in').send(user);

    const token = login_data.body.token;

    const send_thought = await supertest(app).post('/home').send(correct_thought).set("Authorization", `Bearer ${token}`)

    const result = await supertest(app).get('/diagnostic').set("Authorization", `Bearer ${token}`)

    const status = result.status

    expect(status).toEqual(200)

  });

  it('Deve retornar 401 quando token vier vazio', async()=>{
    const user_for_logup = await auth_factory.fixed_user()

    const user = await auth_factory.user_login()

    const correct_thought = await thought_factory.correct_thought()

    await supertest(app).post('/sign-up').send(user_for_logup)

    const login_data = await supertest(app).post('/sign-in').send(user);

    const token = login_data.body.token;

    const send_thought = await supertest(app).post('/home').send(correct_thought).set("Authorization", `Bearer ${token}`)

    const result = await supertest(app).get('/diagnostic').set("Authorization", `Bearer ${''}`)

    const status = result.status

    expect(status).toEqual(401)

  });

  it('Deve retornar 401 quando vier com Authorization errado', async()=>{
    const user_for_logup = await auth_factory.fixed_user()

    const user = await auth_factory.user_login()

    const correct_thought = await thought_factory.correct_thought()

    await supertest(app).post('/sign-up').send(user_for_logup)

    const login_data = await supertest(app).post('/sign-in').send(user);

    const token = login_data.body.token;

    const send_thought = await supertest(app).post('/home').send(correct_thought).set("Authorization", `Bearer ${token}`)

    const result = await supertest(app).get('/diagnostic').set("A", `Bearer ${token}`)

    const status = result.status

    expect(status).toEqual(401)

  });
})
