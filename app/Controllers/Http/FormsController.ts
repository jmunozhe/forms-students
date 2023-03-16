import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Form from 'App/Models/Form';
import Answer from 'App/Models/Answer';

export default class FormsController {
  //metodo para listar todos los formularios con try catch
  public async list({response}:HttpContextContract){
    try{
      const form = await Form.all();
      return response.status(200).json(form);
    }catch(error){
      return response.status(400).json(error);
    }
  }



  //metodo post para almacenar respuestas relacionado con Question y Answer que reciba id de user y una lista de answer_id
  public async create({request,response}:HttpContextContract){
    const {student_id,answer_id}=request.all();
    try{
      const form = await Form.create({student_id,answer_id});
      return response.status(201).json(form);
    }catch(error){
      return response.status(400).json(error);
    }
  }



}
