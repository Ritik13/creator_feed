# Creator Revenue & Payout Tracker

A real-world Node.js backend platform that simulates how platforms like Substack or YouTube manage creator earnings and payouts. This API tracks revenue through user engagement, logs transactions, and enables secure and auditable payouts — with a modular and microservice-ready architecture.

## Features

- Creator Management (CRUD)
- Transaction Logging
  - Logs views, subscriptions, referrals, etc.
  - Automatically adds to `total_earned`
- Payout Processing
  - Validates balance before payouts
  - Records payout method, status, reference ID
  - Updates `total_paid_out`
- Ledger-style History
  - Transaction and payout views per creator
- JWT Auth & Role-Based Access Control (Admin-only endpoints)
- Rate Limiting and basic security headers
- Queued Payouts with BullMQ and Redis (asynchronous job handling)
- Centralized logging with Winston

## Tech Stack

- Node.js with Express
- PostgreSQL with Sequelize ORM
- Redis (for queues and rate limiting)
- BullMQ for job processing
- JWT for Authentication

## Folder Structure

```
creator-revenue-tracker/
├── src/
│   ├── modules/
│   │   ├── creator/
│   │   ├── transaction/
│   │   └── payout/
│   ├── config/
│   ├── jobs/
│   ├── middlewares/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints (MVP)

### Creators
- `POST /creators` - Create a new creator
- `GET /creators` - List all creators
- `GET /creators/:id` - Get creator by ID
- `PATCH /creators/:id` - Update creator
- `DELETE /creators/:id` - Delete creator

### Transactions
- `POST /transactions` - Log a new earning for a creator
- `GET /transactions/:creator_id` - View all transactions for a creator

### Payouts
- `POST /payouts` - Trigger payout for a creator (admin-only)
- `GET /payouts/:creator_id` - View payout history for a creator

## Environment Variables

```
DB_NAME=creator_revenue_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
PORT=5000
JWT_SECRET=your_jwt_secret
```

## Setup Instructions

1. Clone the repo
2. Run `npm install`
3. Set up PostgreSQL and Redis locally
4. Add your `.env` file
5. Run `npm start` to start the dev server

## Future Enhancements

- Admin dashboard with analytics
- CSV export for payout/transaction history
- Email notifications for payouts
- Microservice conversion for scalability

