import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name', 100)
      table.string('second_name', 100)
      table.string('surname', 100)
      table.string('second_sur_name', 100)
      table.integer('type_document')
      table.integer('document_number').references('id').inTable('type_documents')
      table.string('email', 100).notNullable()
      table.string('password', 100).notNullable()
      table.integer('rol_id').references('id').inTable('roles')
      table.string('phone', 100)
      table.boolean('state')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
