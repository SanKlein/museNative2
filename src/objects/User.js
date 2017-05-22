import ObjectID from 'bson-objectid'

class User {
  constructor(_id, name, password, started, created, answered, favorites, saved, daily, categories) {
    this._id = ObjectID()
    this.name = name
    this.password = password
    this.started = Date.now()
  }
}

export default Prompt
