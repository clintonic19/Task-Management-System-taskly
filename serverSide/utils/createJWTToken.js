const express = require('express');
const jwt = require('jsonwebtoken');

const createJWTToken = (async (res, userId) =>{
    try{
        // const { id } = req.body;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'none', //PREVENT CSRF ATTACKS
            maxAge: 1000 * 60 * 60 * 24, // 1day
        });
        res.status(200).json({ status: true, token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = { createJWTToken };