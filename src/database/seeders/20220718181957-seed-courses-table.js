// src/database/seeders/XXXXXXXXXXXXXX-seed-courses-table.js

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const [courses] = await queryInterface.sequelize.query('SELECT id FROM categories;')

    await queryInterface.bulkInsert('courses', [
      { name: 'Programador Full-stack Javascript', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: courses[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Dominando a Linguagem Ruby', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: courses[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Micro-serviços com Node.js', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: courses[1].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Criando APIs Profissionais com Ruby on Rails', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: courses[1].id, created_at: new Date(), updated_at: new Date() },
      { name: 'TDD na Prática: Testando APIs Node.js', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: courses[1].id, created_at: new Date(), updated_at: new Date() },
      { name: 'TDD na Prática: Testando Aplicações React', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: courses[2].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Especialista Front-end: Vue.js', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: courses[2].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Criando Sites e Apps 3D com Three.js', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: courses[2].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Dominando o Bootstrap 5', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: courses[2].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Visual Studio para Programadores Javascript', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: courses[3].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Comandos do Terminal Linux: Um Guia Completo', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: courses[3].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Como ser um Programador Produtivo', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: courses[4].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Comunicação e Trabalho em Equipe', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: courses[5].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Programador Nômade', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: courses[7].id, created_at: new Date(), updated_at: new Date() },
      { name: 'O Guia do Programador Freelancer', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: courses[7].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Inglês Técnico para Programadores', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: courses[6].id, created_at: new Date(), updated_at: new Date() }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('courses', null, {})
  }
};