'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const adminPassword = await bcrypt.hash('123456', 10);
    const userPassword = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('barbershops', [
      {
        id: 1,
        name: 'Barbearia Central',
        address: 'Rua A, 100',
        city: 'Rio de Janeiro',
        neighborhood: 'Centro',
        latitude: -22.9068,
        longitude: -43.1729,
        openingTime: '08:00:00',
        closingTime: '18:00:00',
        cancellationLimitHours: 2,
        dailyAppointmentLimit: 30,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Admin',
        email: 'admin@email.com',
        password: adminPassword,
        phone: '11999999999',
        role: 'ADMIN',
        barbershopId: null,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        name: 'Barbeiro Teste',
        email: 'barbeiro@email.com',
        password: userPassword,
        phone: '11988888888',
        role: 'BARBEIRO',
        barbershopId: 1,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        name: 'Cliente Teste',
        email: 'cliente@email.com',
        password: userPassword,
        phone: '11977777777',
        role: 'CLIENTE',
        barbershopId: null,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    await queryInterface.bulkInsert('services', [
      { id: 1, name: 'CORTE_MAQUINA', price: 25.0, duration: 20, barbershopId: 1, isActive: true, createdAt: now, updatedAt: now },
      { id: 2, name: 'CORTE_TESOURA', price: 35.0, duration: 30, barbershopId: 1, isActive: true, createdAt: now, updatedAt: now },
      { id: 3, name: 'BARBA', price: 20.0, duration: 15, barbershopId: 1, isActive: true, createdAt: now, updatedAt: now },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('services', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('barbershops', null, {});
  },
};
