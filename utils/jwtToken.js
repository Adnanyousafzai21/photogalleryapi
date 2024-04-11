


export const sendToken = async (user, res, message, statusCode) => {
    try {
        const token = await user.getJwtToken();

        // Send the response with the token and other data in the body
        res.status(statusCode).json({ success: true, message, user, token });
    } catch (error) {
        console.error("Error sending token:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
