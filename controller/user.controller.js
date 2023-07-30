const User = require('../models/user_details');
const InvalidRequestException = require('../exceptions/invalid-request');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Signup API
const createUser = (request, response, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userDetailsPayload = {
                name: request.body.name.trim(),
                email: request.body.email,
                mobile: request.body.mobile,
                password: request.body.password.trim(),
            };
            const userData = await User.findOne({ email: request.body.email });
            if (userData) {
                throw new InvalidRequestException('user already exists');
            }
            userDetailsPayload.password = await bcrypt.hash(request.body.password.trim(), 10);
            const userDetails = await User.create(userDetailsPayload);
            return resolve(
                response.json({
                    success: true,
                    message: 'user created successfully.',
                    result: userDetails
                })
            );
        } catch (error) {
            next(error)
        }
    })
}

// Login API
const loginUser = (request, response, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userDetailsPayload = {
                email: request.body.email,
                password: request.body.password.trim(),
            };
            const userData = await User.findOne({ email: request.body.email });
            if (!userData) {
                throw new InvalidRequestException('user does not exists');
            }
            if (userData && (await bcrypt.compare(request.body.password.trim(), userData.password))) {
                const accessToken = jwt.sign({
                    user: {
                        id: userData.id,
                        username: userData.name,
                        email: userData.email
                    }
                }, process.env.ACCESS_TOKEN,
                    { expiresIn: "24h" }
                );
                const userDetails = await User.updateOne({ email: request.body.email },
                    {
                        $set: {
                            token: accessToken,
                            last_login_at: new Date(),
                            expiry: new Date().getTime() + 86400000,
                        }
                    });

                resolve(
                    response.json({
                        success: true,
                        message: 'Login Successfully',
                        result: {
                            id: userData.id,
                            username: userData.name,
                            email: userData.email,
                            token: accessToken
                        },
                    })
                );
            } else {
                throw new InvalidRequestException('email or password is invalid.');
            }
        } catch (error) {
            next(error)
        }
    })
}
// Change password
const changePassword = (request, response, next) => {
    return new Promise(async (resolve, reject) => {
        try {
            const password = request.body.password.trim();
            const newPassword = await bcrypt.hash(password, 10)
            const token = request.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, process.env.ACCESS_TOKEN);

            const id = user.user.id;
            const resetPassword = await User.update({ id: id },
                {
                    $set: {
                        password: newPassword,
                    }
                }
            );

            resolve(
                response.json({
                    success: true,
                    message: 'password updated successfully.',
                    result: {},
                })
            );
        } catch (error) {
            next(error);
        }
    });
};
module.exports = { createUser, loginUser, changePassword }
