module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      userId: Sequelize.INTEGER,
      serviceId: Sequelize.INTEGER,
      barbershopId: Sequelize.INTEGER,
      date: Sequelize.DATE,
      status: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('appointments');
  }
};