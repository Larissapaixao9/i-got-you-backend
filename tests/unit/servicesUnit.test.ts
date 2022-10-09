import prisma from "../../src/database/database";
import { jest } from '@jest/globals';

import * as auth_repository from '../../src/repositories/auth_repository'
import * as auth_services from '../../src/services/authServices'
import * as auth_factory from '../factories/user_factory'



  describe('Cria um novo usuario', ()=>{
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
      });

    it('Deve verificar se senhas são iguais', async()=>{
        const body = await auth_factory.passwords()

        const password = 'la'

        const confirm_password='laa'

        const result=await auth_services.verify_password(body.confirm_password, body.password)

        console.log('oii')
        console.log(result)

        //  expect(result).rejects.toEqual({
            
        //     message:"senhas digitadas não são iguais"
        // })

        // await expect(auth_services.verify_password('l','l1')).rejects.toEqual({
        //     type:"conflict",
        //     message:"usuario já cadastrado"
        // })
        await expect(result).rejects.toEqual({message:"usuario já cadastrado"})
    })

    it('deve criar novo usuario', async()=>{

    })
})
