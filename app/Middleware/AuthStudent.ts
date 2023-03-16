import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from 'App/Controllers/Http/UsersController'
import type  User  from 'App/Models/User'

export default class AuthStudent {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader = ctx.request.header('authorization')

    if(authorizationHeader == undefined){
      return ctx.response.status(400).send({
        mensaje: "Fail related to the authorization",
        estado: 401,
      })
    }

    try{
      const usuariosController = new UsersController()
      usuariosController.verifyToken(authorizationHeader)
      await next()
    }catch(error){
      console.log(error);
      ctx.response.status(400).send("Fail related to the token")
    }
  }
}
