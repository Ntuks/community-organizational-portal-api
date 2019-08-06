/* eslint-disable class-methods-use-this */
const User = require('./User');

class OrganizationManager extends User {
  constructor(name, surname, email, password, role) {
    super(name, surname, email, password);
    this._role = role;
  }

  signup() {
    //
  }
}

module.exports = OrganizationManager;
