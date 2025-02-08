module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Plants", "is_deleted", {
      type: Sequelize.BOOLEAN,
      defaultValue: false, // Default to false (not deleted)
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Plants", "is_deleted");
  }
};
