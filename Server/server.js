const app = require('./app'); // Import the app

const PORT = process.env.PORT || 5001; // Define the port

app.listen(PORT, () => {  console.log(`Server running on port ${PORT}`); }); // Start the server

app.get('/', (req, res)=>{
    try{
        console.log(req);
        res.status(200).send('CPSC 499 Group Project');
    } catch(error){
        res.status(404).send('Uh oh, something went wrong!')
    } 
});