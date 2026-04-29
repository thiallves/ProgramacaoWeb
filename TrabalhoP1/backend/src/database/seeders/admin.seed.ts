module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      name: 'Admin',
      email: 'admin@email.com',
      password: '123456',
      role: 'ADMIN',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  }
};