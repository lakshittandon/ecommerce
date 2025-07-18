const sendToken = (user, statusCode, res) => {
    // Create JWT token
    const token = user.getJwtToken();

    // Options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        sameSite: 'none',   // <-- allow cross-site
        secure: true  
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
} 
module.exports = sendToken;