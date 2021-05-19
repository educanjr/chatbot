# NodeJs + Reactjs Chat

## Requirements

In order to test and run the solution, you will need the following:

1. [NodeJS and npm](https://nodejs.org/en/) (requiered to install the packages of the frontend application).
2. A [MySQL data base server](https://dev.mysql.com/downloads/) running locally (we recomend the full installation).
4. An IDE, we recommend [VS Code](https://code.visualstudio.com/download).


## Local setup 

### Clone Solution: 
You can use the method of your preference; we recommend using Git Desktop or Git CLI. 
To clone using Git CLI run the command:
```bash
git clone https://github.com/educanjr/chatbot.git
```


### Configure Backend Solution: 
The backend has been developed completelly with JavaScript using: 

1. Express to manage the API.
2. Socket.io to manage the Chat connections.
3. Sequelize as ORM to manage the database and its migrations.
4. Axios to request data for external sources. 

#### Install dependencies 
This step is equal for all the project which use npm dependencies, just browse to the backend application root [chatbot-backend](/chatbot-backend) and type in your preferred terminal:
```bash
npm install 
```

#### Setup environment
To run the backend application you will need to add the proper configurations to the environment file. So, open the [.env](/chatbot-backend/.env) file in your prefered editor and set the right value to all the properties. 
>_Note:_ The properties realted to the Express server "_APP\_*_" and properties related to the bot timezone request "_BOT\_*_ are configured with default values, but you can change those values if you want to use other configurations. 

```
APP_KEY={the key used to generate your app token}
APP_URL={the base URL of the Express server}
APP_PORT={the port in with the Express server will run}

DB_HOST={URL host in which your MySQL instance is running, by default 127.0.0.1}
DB_USER={the user that the application will use to connect with your database}
DB_PASSWORD={the password that the application will use to connect with your database}
DB_DATABASE={the database name}

BOT_PLATFORM_URL={the URL used by the Bot service to connect with WorldTime API}
BOT_API_TIMEZONE={the WorldTime API method used to fetch the current time in a timezone}
BOT_DEFAULT_RESULT={the default result provider for the Bot service if something fails}
```

#### Migrate database
You will need to run the migrations tu create the tables in the database in which all the data will be stored.
In your prefered terminal run the command:

```bash
npx sequelize-cli db:migrate
```

#### Run the backend API 
In your prefered terminal run the command:
```bash
npm start
```
> _Note:_ In development environment the application run with _nodemon_, so if you change and save a file in your project the server will be automatically restarted.


### Configure Frontend Application: 
The frontend has been developed completelly with JavaScript using: 

1. ReactJs as framework to present the application.
2. Redux to manage centralized states states.
3. Socket.io-client to connect via websockets with the Chat service in the backend.
4. Axios to request data for external sources.

#### Install dependencies
This step is equal for all the project which use npm dependencies, just browse to the frontend application root [chatbot-frontend](/chatbot-frontend) and type in your preferred terminal:
```bash
npm install 
```

#### Configure API base URL
If you keep the default values in your backend _.env_ file, you don't need to do any change here. But if you changed the properties _APP\_URL_ and/or _APP\_PORT_ you will need to update your request base URL.

Browse to the file [api.js](/chatbot-forntend/src/services/api.js) and replase the Axios instance base URL:
From:
```
baseURL: "http://127.0.0.1:5000
```

To:
```
baseURL: "<APP_URL>:<APP_PORT>
```
 
#### Run the frontend application 
To run the application, you must use your preferred terminal with npm and the following command:
```bash
npm start 
```

### Run several instances in your own computer
To run several instances in your browser you will need to disble the capability of the frontend application to read the locally stored token and values.

Browse to the file [api.js](/chatbot-forntend/src/services/api.js) and remove the Authorization setup property for your Axios instance.
Brouse to the file [reducers/auth.js](/chatbot-forntend/src/store/reducers/auth.js), comment the _initialState_ properties and uncomment the _initialState_ properties below de line _// FOR LOCAL TEST_.

Now you can login into the application with several users at the same time.
>_Note:_ Every time that you refresh the page you will be redirected to the _login_ page.