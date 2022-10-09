import supertest from "supertest";
import prisma from "../../src/database/database";
import app from '../../src/app'
import * as auth_factory from '../factories/user_factory'
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