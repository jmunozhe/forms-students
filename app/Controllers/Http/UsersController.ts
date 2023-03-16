import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const bcryptjs = require('bcryptjs')
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'
import User from 'App/Models/User'


export default class UsersController {
  public async register({request}:HttpContextContract){
    const{id,first_name,second_name,surname,second_sur_name,type_document,document_number,email,password,rol_id,phone,state}= request.all();
    const salt =bcryptjs.genSaltSync();
    const user = new User();
    user.id=id;
    user.first_name=first_name;
    user.second_name=second_name;
    user.surname=surname;
    user.second_sur_name=second_sur_name;
    user.type_document=type_document;
    user.document_number=document_number;
    user.email=email;
    user.password=bcryptjs.hashSync(password,salt);
    user.rol_id=rol_id;
    user.phone=phone;
    user.state=state;
    await user.save();
    return {user, "msg": "User registered"};
  }

  public async login({request,response}:HttpContextContract){
    const email=request.input('email');
    const password=request.input('password');

    try{
      const user = await User.findBy('email',email);
      if(!user){
        return response.status(400).json({error:{message:'Invalid user'}})
      }
      const validPassword = await bcryptjs.compareSync(password,user.password);
      if(!validPassword){
        return response.status(400).json({message:'Invalid password'})
      }
      const payload ={
        'id':user.id,
        'first_name':user.first_name,
      }
      const token:string=this.generateToken(payload);
      response.json({
        token,
        "msg":"User logged"
      })
    } catch(error){
      response.json({"msg":"Invalid credentials"})
    }
  }

  public generateToken(payload:any):string{
    const options={
      expiresIn:"10 mins"
    }
    return jwt.sign(payload,Env.get('JWT_SECRET_KEY'),options)
  }

  public verifyToken(authorizationHeader:string){
    let token= authorizationHeader.split(' ')[1]
    token=jwt.verify(token,Env.get('JWT_SECRET_KEY'),(error)=>{
      if(error){
        throw new Error("Expired token");

      }
    })
    return true
  }

  public obtainPayload (authorizationHeader:string){
    let token=authorizationHeader.split(' ')[1]
    const payload=jwt.verify(token,Env.get("JWT_SECRET_KEY"), {complete: true}).payload
    console.log(payload)
    return payload
  }

  public async list({response}:HttpContextContract){
    try{
      const users = await User.all();
      response.json({
        "msg":"Users listed",
        users
      })
    }catch(error){
      response.json({"msg":"Users not listed"})
    }
  }
  // cambia el metodo edit pidiendo el id de user por la ruta
  public async edit({request,response,params}:HttpContextContract){
    const {id}=params;
    const{first_name,second_name,surname,second_sur_name,type_document,document_number,email,password,rol_id,phone,state}= request.all();
    const salt =bcryptjs.genSaltSync();
    const user = await User.findOrFail(id);
    user.id=id;
    user.first_name=first_name;
    user.second_name=second_name;
    user.surname=surname;
    user.second_sur_name=second_sur_name;
    user.type_document=type_document;
    user.document_number=document_number;
    user.email=email;
    user.password=bcryptjs.hashSync(password,salt);
    user.rol_id=rol_id;
    user.phone=phone;
    user.state=state;
    await user.save();
    return {user, "msg": "User edited"};
  }


  //metodo put para editar users con respuesta ok o fail


  //cambia el metodo details pidiendo el id por la ruta con el try y el catch
  public async details({response,params}:HttpContextContract){
    const {id}=params;
    try{
      const user = await User.findOrFail(id);
      response.json({
        "msg":"User details",
        user
      })
    }catch(error){
      response.json({"msg":"User not found"})
    }
  }

}
