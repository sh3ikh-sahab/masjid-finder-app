const successRequest = (err, req, res) => {

    console.error('Sucessfull:', err);

    res.status(400).json({

      status: 'Sucessfull',

      message: 'REQUEST_SUCCESSFULLY',

    });

  };
  
export default successRequest;