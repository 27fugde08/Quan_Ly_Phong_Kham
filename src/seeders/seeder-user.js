'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Thêm dữ liệu vào bảng "Users"
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@gmail.com',
        password: '123456',
        firstName: 'Nguyen Trong',
        lastName: 'Duy',
        address: 'USA',
        gender: true,
        roleId: 'ROLE',
        positionId: 'R1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
