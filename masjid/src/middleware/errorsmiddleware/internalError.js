
const internalError = (err, req, res) => {

    console.error('Error:', err);

    res.status(500).json({

      status: 'error',

      message: 'INTERNAL_SERVER_ERROR',

    });

  };
  
export default internalError;
  