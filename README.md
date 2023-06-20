<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

CARKUS is the culmination of Kampus Merdeka's final project at Skilvul, in partnership with the Asean Youth Forum. This platform aims to create a safe and inclusive space where young individuals can freely express their opinions and seek answers to their questions. With a strong emphasis on responsible engagement, CARKUS encourages respectful discussions and provides moderation tools to ensure a positive environment. Its interactive Q&A feature enables users to share knowledge and engage in insightful conversations. CARKUS empowers the youth to voice their thoughts and inquiries, fostering a vibrant community of diverse perspectives.

## Entity Relationship Diagram (ERD)

The following is the Entity Relationship Diagram (ERD) for the CARKUS application:

![CARKUS ERD](https://github.com/baim-portofolio/carkus/blob/main/assets/ERD%20CARKUS.png)

The ERD illustrates the relationships between different entities in the CARKUS database. Here is a brief explanation of each entity:

- **Users**: Represents the users of the application. Users can have a role of either "USER" or "ADMIN". They can create threads and leave comments.

- **Admins**: Represents the administrators of specific campuses. Each admin is associated with a user and a campus. Admins have additional privileges and responsibilities compared to regular users.

- **Campus**: Represents the campuses where discussions and threads take place. Each campus has a name, address, description, and associated admins. Campuses can have multiple threads.

- **Comments**: Represents the comments left by users on threads. Each comment is associated with a user and a thread. Comments capture the user's input and are timestamped.

- **Threads**: Represents the discussion threads created by users. Each thread belongs to a specific campus and is associated with a user. Threads contain a title, content, and a collection of comments.

This ERD provides a visual representation of the database structure and the relationships between entities in the CARKUS application. It can help in understanding the data model and designing queries or data operations accordingly.

## Tools
CARKUS is built using the following technologies and tools:

- **Typescript**: CARKUS utilizes TypeScript, a statically typed superset of JavaScript, to enhance code readability, maintainability, and developer productivity.

- **NestJS**: CARKUS leverages the power of NestJS, a progressive Node.js framework, for building efficient and scalable server-side applications. NestJS provides a modular architecture, dependency injection, and a rich set of features for developing robust APIs.

- **Prisma**: CARKUS integrates Prisma, a modern database toolkit, for efficient and type-safe database access. Prisma enables seamless database management, schema migrations, and query building, ensuring reliable data operations.

- **PassportJS**: CARKUS employs PassportJS, a popular authentication middleware for Node.js, to handle user authentication and authorization. PassportJS offers a flexible and modular approach to implement various authentication strategies, ensuring secure user access to the platform.

- **PostgreSQL**: CARKUS utilizes PostgreSQL, a powerful open-source relational database management system, as the underlying data storage. PostgreSQL provides robust data integrity, transaction support, and scalability, ensuring the reliability of CARKUS' data management.

These technologies and tools have been carefully selected to provide a solid foundation for developing a high-quality, secure, and performant platform for youth engagement with CARKUS.

## Installation

```bash
$ npm install
```
## Variables

The following variables are used in the `.env` file for configuring the application:

- `DATABASE_URL`: This variable is used to specify the URL or connection string for the PostgreSQL database. It allows the application to establish a connection with the database and perform data operations.

- `SECRET_KEY`: This variable represents a secret key used for generating secure hashes. The secret key is crucial for maintaining the security and integrity of the application's data and user interactions.

## Running the app
Make sure to create the CARKUS database in PostgreSQL before running the application. After creating the database, perform a database pull to synchronize the schema and populate any necessary initial data. This ensures that the application has the required database structure and data for proper functionality.

```bash
$ npx prisma generate

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentation

The documentation for CARKUS can be found [here](https://documenter.getpostman.com/view/19404602/2s93sjW9dA). It provides comprehensive information about the CARKUS API, including available endpoints, request methods, parameters, and example requests/responses.

The [CARKUS API Documentation](https://documenter.getpostman.com/view/19404602/2s93sjW9dA) serves as a valuable resource for developers, offering all the necessary details to effectively integrate and interact with the platform. It enables users to express their opinions, ask questions, and engage responsibly.

Visit the [CARKUS API Documentation](https://documenter.getpostman.com/view/19404602/2s93sjW9dA) to explore the endpoints and understand how to interact with CARKUS efficiently.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
