import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from 'App/Controllers/Http/UsersController'
import User from 'App/Models/User'

export default class AuthAdmin {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authorizationHeader: any = ctx.request.header('authorization')

    try{
      const usuariosController = new UsersController()
      const {id} = await usuariosController.obtainPayload(authorizationHeader)
      const usuario = await User.find(id)

      if(!usuario){
        return ctx.response.status(401).json({
          msj: 'No valid Token'
        })
      }

      if( usuario.rol_id != 1){
        return ctx.response.status(401).json({
          msj: 'You don´t have permissions to acces this route'
        })
      }
      await next()
    }catch(error){
      console.log(error);
      ctx.response.status(400).json({"msj": "No valid Token"})
    }
  }
}
