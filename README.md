# Breadit

Breadit is a modern Next.js Reddit clone designed to provide users with a seamless and efficient platform for content sharing and discussion. It leverages a powerful stack of technologies to deliver a high-performance web application.

## Key Features

- **Server-side rendering**: Built with Next.js, Breadit ensures fast page loads and optimal SEO performance through server-side rendering and static site generation.
- **Efficient data handling**: Prisma ORM facilitates seamless interaction with the PostgreSQL database, ensuring type-safe queries and enhancing developer productivity.
- **Caching for performance**: Redis acts as a caching layer, improving response times by storing frequently accessed data in memory and reducing the load on the primary database.
- **State management with React Query**: Breadit utilizes React Query for managing server state and handling data fetching, resulting in a smoother user experience and optimized network requests.
- **Sleek and responsive design**: Tailwind CSS enables rapid UI development and easy customization, ensuring Breadit maintains a sleek and responsive design across various devices and screen sizes.
- **Type-safe development**: Developed using TypeScript, Breadit benefits from static typing, code maintainability, and improved error detection, leading to a more robust and scalable codebase.

## Technologies Used

- Next.js
- Prisma ORM
- PostgreSQL
- Redis
- React Query
- Tailwind CSS
- TypeScript

## Getting Started

To get started with Breadit locally, follow these steps:

1. **Clone the Repository:**

   ```bash
     git clone https://github.com/RishivinKannan/personal_bookshelf.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd <project_directory>
   ```

3. **Install dependencies:**

   ```bash
       npm install
   ```

4. **Set up your PostgreSQL and Redis databases.**

5. **Configure environment variables using .env.example as needed.**

    ```

    DATABASE_URL=
    DIRECT_URL=

    NEXTAUTH_SECRET=

    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=

    UPLOADTHING_SECRET=
    UPLOADTHING_APP_ID=

    REDIS_URL=
    REDIS_SECRET=

    ```

5. **Run the development server:**

   ```bash
       npm run dev
   ```
