/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(()=>{
  Route.post('/create','UsersController.register');
  Route.post('/login','UsersController.login');
  Route.get('/getUsers','UsersController.list').middleware("admin");
  Route.put('/update/:id','UsersController.edit');
  Route.get('/getUser/:id','UsersController.details');
}).prefix('/api/v1/user')

Route.group(()=>{
  Route.post('/create','QuestionsController.create').middleware("admin");
  Route.get('/getQuestions','QuestionsController.list');
  Route.delete('/deleteQuestion/:id','QuestionsController.delete');
  Route.put('/updateQuestion/:id','QuestionsController.edit');
  Route.get('/getOptions/:id','QuestionsController.getAnswers');
}).prefix('/api/v1/questions').middleware("student")


Route.group(()=>{
  Route.post('/postquestions','FormsController.create');
  Route.get('/getQuestions','FormsController.list');
}).prefix('api/v1/form').middleware("student")
