class UsersService {
  constructor() {
    this.users = new Set();

    setInterval(() => {}, 1000);
  }

  addUser(name) {
    this.users.add(name);
  }

  removeUser(name) {
    this.users.delete(name);
  }

  getAll() {
    return [...this.users];
  }
}

module.exports = new UsersService();
