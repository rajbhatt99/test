import express from 'express';
import { AppDataSource } from './database/datasource';
import bodyParser from 'body-parser';
import mainRoutes from "./routes/mainRoute"

const app = express();
const port = 3000;


AppDataSource.initialize()
    .then(() => {
        console.log("database connected!!");
    })
    .catch((error: any) => console.log(error))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use('', mainRoutes)


app.listen(port, () => {
    return console.log(port);
})


