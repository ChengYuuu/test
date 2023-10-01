# Time Series SPA for Schroders take home assignment

This project shows a single page application where a user can select stocks from the US stock exchange and plot them on a Time Series Chart. The user will be able to plot up to 3 charts at a single point of time. They can also select between the different price type, date range and the interval of each price candle.

## Functionality
**Starting the app**
1. Open `.env` and add your FINNHUB API Key to `VITE_FINNHUB_API_KEY`. You can use your own API key. If not, you can use ``.
2. To start the dev server. You can run `npm run dev`
3. To create a production ready build. You can run `npm run build` and the required files will be generated in the `dist` folder. You can double click the HTML file to start using the application

**Using the app**
1. When you start the app, you will be shown only the search bar. You can search and select the stock you want to generate a time series chart for (Note: You need to key in at least 2 characters for the search to start showing results).
2. You can select the stock you want by clicking on the stock (Keyboard interactions are not built out here yet).
3. After you select the stock, a chart will be displayed below with the stock's name.
4. You will be able to select more stock (up to 3) and the new stock charts will overlay against the current ones.
5. You can remove a stock from the time series chart by clicking the "X" button beside the stock's name.
6. You can toggle the date time, price type and the kind of candle (daily/weekly/monthly) by clicking on the appropriate toggles. The chart will automatically refresh.

## Code explanation
The code is written with typescript to ensure the return values of each function is well defined. This reduces the chance of being surprised by a different type when a user interacts with the page.

We used Tailwind CSS to style our components because it gives us standardised CSS values and it is also easy to write.

- The code entry point is via `App.tsx`. It then renders our only page: `TimeSeriesPage.tsx`, which is wrapped in an ErrorBoundary.
- There are 2 main components inside `TimeSeriesPage.tsx`. They are `Search.tsx` and `Card.tsx`.
- `Search.tsx` contains the functionality to search, filter and select stock symbols (provided by an API).
- `Card.tsx` will take the selected values from `Search.tsx` and render the appropriate time series chart. `Card.tsx` component is also responsible for fetching the appropriate time series data and also storing the different React states to re-fetch/re-render the chart data.
- There are various child component used in `Card.tsx`. The "main state" is stored in `Card.tsx` and the child component can modify the "main state" when we pass the "set state" function to the child component.

### Code Structure

The code is structured into a few folders

- assets
- components
- hooks
- pages
- tests
- types

#### Assets
This folder contains any kind of assets which is used in the website. E.g. Image, Files and Videos

### Components
This folder stores all reusable React components which can be reused on multiple pages

### Hooks
This folder stores custom defined hook to help us with different functionality

### Pages
This folder stores the high level page component (one for each page)

### Tests
This folder should store the unit tests that we need to write

### Types
This folder stores custom defined type definition


## Possible improvements
- Add tests (unit/E2E). I faced some issues integrating vitest as there were dependency issues with Nivo (charting library used)
- Better interactions for search component. E.g. Adding keyboard interactions
- Having daily or minute candle charts. Currently there is a big gap in the chart due to no weekend data for stocks (which makes the daily/minute chart looks weird)
