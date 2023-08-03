const otplib = require('otplib');
const QRCode = require('qrcode');
const  FIXED_USER = {
    usename: 'lqnhat',
    password: 'lqnhat1',
    secretKey: generateSecretUnique(),
    isEnable2FA: true,
}

const login = (req, res) => {
    try {
        const user = FIXED_USER;
        const {username, password} = req.body;
        if(username == user.usename && password == user.password)
        {
            if(user.isEnable2FA)
            {
                return res.status(200).json({
                    isEnable2FA: false,
                    isCorrectAccount: true,
                    isLoggedIn: false,
                });
            }
            return res.status(200).json({
                isCorrectAccount: true,
                isEnable2FA: false,
                isLoggedIn: true
            })
        }
        return res.status(405).json({
            isCorrectAccount: false,
            isLoggedIn: false
        });
    } catch (error) {
        return res.status(500).json({
            err: error.toString()
        })
    }
}

const connect2FA = async (req, res) => {
    try {
        const user = FIXED_USER;
        const serviceName = 'lqnhat authenticator';

        const otp = generateOTPCode(user.username, serviceName, user.secretKey);

        const qrCodeImage = await generateQRCode(otp);
        return res.status(200).json({
            imageQR: qrCodeImage
        })
    } catch (error) {
        console.error(error);
    }
}

const verify2FA = async (req, res) => {
    const user = FIXED_USER;
    const { otp } = req.body;
    const isValid = verifyOTPToken(otp, user.secretKey);
    res.status(200).json({ success: isValid });
}

function verifyOTPToken(otp, secretKey)
{
    return otplib.authenticator.verify({
        token: otp,
        secret: secretKey,
    });
}

function generateOTPCode(username, serviceName, secretKey){
    return otplib.authenticator.keyuri(username, serviceName, secretKey);
}

function generateSecretUnique(){
    return otplib.authenticator.generateSecret();

}

async function generateQRCode(input){
    try {
        return imageURL = await QRCode.toDataURL(input);
    } catch (error) {
        console.error(error);
    }
}

module.exports = { login, connect2FA, verify2FA }