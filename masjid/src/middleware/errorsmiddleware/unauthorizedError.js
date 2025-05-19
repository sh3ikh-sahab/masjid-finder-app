
const unauthorizedError = (err, req, res) => {

    console.error('Error:', err);

    res.status(401).json({

      status: 'error',

      message: 'UNAUTHORIZED_ERROR',

    });

  };
  
export default unauthorizedError;
  