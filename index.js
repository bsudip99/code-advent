const express = require('express');
const app = express();

// Define routes
app.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  let pathD = ``;
  try {
    if(!Number.isInteger(id))
    {
      const pathArr = String(id).split('.');
      const param1 = pathArr[0];
      const param2 = pathArr[1];
      pathD = `./pages/${param1}/${param2}.js`;
    }
    else{
      pathD = `./pages/${id}/index.js`;
    }
    const pageFunction = require(pathD);
    delete require.cache[require.resolve(pathD)];
    pageFunction(req, res);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Handling 404 - Page Not Found
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
