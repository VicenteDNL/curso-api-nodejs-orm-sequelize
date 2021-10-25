'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Niveis', [
      {
				descri_nivel: 'básico',
				createdAt: new Date(),
				updatedAt: new Date()			
			},
			{
				descri_nivel: 'intermediário',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				descri_nivel: 'avançado',
				createdAt: new Date(),
				updatedAt: new Date()
			} 
    ], {});
    
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
