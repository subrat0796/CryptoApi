# Backend Task

## Table of Contents

- [Project Structure](#project-structure)
- [Routes](#routes)

## Project Structure

```
src\
  |--controllers\  # Route controllers (controllers layer)
  |--utils\      # Helper classes and functions
  |--middlewares\  # Custom express middlewares
  |--models\       # Mongoose models (data layer)
  |--routes\       # Routes
  |--services\     # Business logic (service layer)
  |--config\           # Envoriment variables and configuration related things
  |--app.js            # Express app
  |--index.js          # App entry point
```

## Routes

```
1. /api/ether/getBalanceAndPrice/:userId - gives the user balance and current ether price
2. /api/ether/getNormalTransactions/:userId - gives the normal transactions done by the user
```
