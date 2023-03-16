import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question';
import Answer from 'App/Models/Answer';

export default class QuestionsController {
  //metodo para crear Question con try catch
  public async create({request,response}:HttpContextContract){
    const {question}=request.all();
    try{
      const question1 = await Question.create({question});
      return response.status(201).json(question1);
    }catch(error){
      return response.status(400).json(error);
    }
  }

  //metodo get para consultar las preguntas con try catch
  public async list({response}:HttpContextContract){
    try{
      const question = await Question.all();
      return response.status(200).json(question);
    }catch(error){
      return response.status(400).json(error);
    }
  }

  //metodo delete para preguntas con try catch
  public async delete({params,response}:HttpContextContract){
    try{
      const question = await Question.findOrFail(params.id);
      await question.delete();
      return response.status(200).json({message:'Question deleted'});
    }catch(error){
      return response.status(400).json(error);
    }
  }

  //metodo put para editar preguntas con try catch
  public async edit({params,request,response}:HttpContextContract){
    const {question}=request.all();
    try{
      const question1 = await Question.findOrFail(params.id);
      question1.question=question;
      await question1.save();
      return response.status(200).json(question1);
    }catch(error){
      return response.status(400).json(error);
    }
  }

  //metodo para consultar las opciones de respuesta de una pregunta por medio de las answer asociadas mediante la relacion con Answer
  public async getAnswers({params,response}:HttpContextContract){
    try{
      const answer = await Answer.findOrFail(params.id);
      const answers = await answer.related('answerQuestion').query();
      return response.status(200).json(answers);
    }catch(error){
      return response.status(400).json(error);
    }
  }

}
