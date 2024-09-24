# RSS News API

This project is an RSS News API that fetches RSS feeds from various sources, stores them in a Supabase database, and sends notifications to a Telegram channel.

![RSS News API](https://kufgxlvheldohsqwdpxo.supabase.co/storage/v1/object/public/pub/a0b1fbaf-d47f-480e-a0a1-14f8504b6fa8.jpeg)

## Getting Started

### Prerequisites

- Hono
- npm
- Cloudflare Workers
- Supabase account
- Telegram Bot

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/rss-news-api.git
    cd rss-news-api
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Configuration

1. Configure the `wrangler.toml` file for Cloudflare Workers:
    ```toml
    name = "rss-news-api"
    type = "javascript"

    [env]
    SUPABASE_URL = "https://your-supabase-url.supabase.co"
    SUPABASE_KEY = "your-supabase-key"
    TELEGRAM_BOT_URL = "https://api.telegram.org/bot<your-bot-token>/sendMessage"
    CHAT_ID = "-100232xxxxxx"

    [[triggers.crons]]
    schedule = "*/1 * * * *" # Runs every minute
    ```

### Running the Project

1. Start the development server:
    ```sh
    wrangler dev
    ```

2. Deploy to Cloudflare Workers:
    ```sh
    wrangler publish
    ```

### Usage

The API provides the following endpoints:

- `GET /`: Returns a welcome message.
- `GET /news`: Fetches news from the database.
- `GET /health`: Checks the health of the Supabase connection.
- `GET /check-feeds`: Manually triggers the RSS feed check and notification process.

### Project Structure

- `src/index.ts`: Main entry point for the Cloudflare Worker.
- `src/services/rssService.ts`: Contains the logic for fetching RSS feeds and sending notifications.
- `src/db/supabase.ts`: Contains the logic for interacting with the Supabase database.
- `wrangler.toml`: Configuration file for Cloudflare Workers.

### Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgements

- [Hono](https://hono.dev/) - A small, simple, and fast web framework for Cloudflare Workers.
- [Supabase](https://supabase.io/) - An open-source Firebase alternative.
- [Telegram Bot API](https://core.telegram.org/bots/api) - The Bot API is an HTTP-based interface created for developers keen on building bots for Telegram.
