import ObjectID from 'bson-objectid'

class Prompt {
  constructor(user_id, user_name, title, type, categories) {
    this._id = ObjectID()
    this.user_id = user_id
    this.user_name = user_name
    this.created = Date.now()
    this.title = title
    this.type = type
    this.categories = categories
    this.status = 'submitted'
  }
}

export default Prompt
