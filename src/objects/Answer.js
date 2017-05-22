import ObjectID from 'bson-objectid'

class Answer {
  constructor(user_id, user_name, prompt_id, prompt_title, type, categories) {
    this._id = ObjectID()
    this.user_id = user_id
    this.user_name = user_name
    this.prompt_id = prompt_id
    this.prompt_title = prompt_title
    this.answered = Date.now()
    this.modified = Date.now()
    this.text = ''
    this.type = type
    this.categories = categories
  }
}

export default Answer
