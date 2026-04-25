'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Services', [
      {
        name: 'CORTE_MAQUINA',
        price: 25.00,
        duration: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'CORTE_TESOURA',
        price: 35.00,
        duration: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'BARBA',
        price: 20.00,
        duration: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Services', null, {});
  },
};