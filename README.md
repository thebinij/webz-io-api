# webz-io-api

### 1. Installation

Install the dependencies:

```bash
npm run install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

### 2. Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm run start
```

Testing:

```bash
# run all tests
npm run test
```

Build:

```bash
npm run build
```

Build in docker

```bash
npm run docker:dev
```

### 3. Project Structure

```plaintext
├── src                       
│   ├── config                              
│   │   ├── database.ts                  # Database configuration
│   │   ├── environment.d.ts             # Environment types
│   │   └── winston.ts                   # Logger configuration (Winston)
│   ├── controllers                         
│   │   ├── apiConfig.controller.ts      # Controller for API config logic
│   │   ├── dataIngestion.controller.ts  # Controller for data ingestion logic
│   │   └── index.ts                     # Main controller file
│   ├── interfaces                          
│   │   └── api.interface.ts             # API request/response types
│   ├── lib                                 
│   │   ├── apiMethodBuilder.ts          # API method builder utility
│   ├── main.ts                          # Main entry file for the app
│   ├── middlewares                         
│   │   ├── error.ts                     # Error handling middleware
│   │   ├── index.ts                     # Main middleware exports
│   │   └── winston.ts                   # Winston logger middleware
│   ├── routes                              
│   │   └── index.ts                     # Main route file
│   ├── services                              
│   │   ├── apiConfig.service.ts         # Service for API configuration logic
│   │   └── dataIngestion.service.ts     # Service for data ingestion logic
│   └── utils                            # Utility functions
│       ├── catchAsync.ts                # Utility for handling async errors
│       ├── common.ts                    # Common utility functions
│       ├── httpHandler.ts               # HTTP response utility
│       └── index.ts                     # General utility exports

```

### 4. Documentation

For detailed service design, refer to the [Data Ingestion Service Design](docs/data-ingestion-service-design.md).