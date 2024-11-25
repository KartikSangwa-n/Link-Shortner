require('dotenv').config();
const { format } = require('date-fns');
const ShortUniqueId = require('short-unique-id');
const axios = require('axios');
const uid = new ShortUniqueId({ length: 10 });
const URL = require('../models/url');


exports.shortUrlGenerator = async(req, res) => {
    try{
        const { originalUrl } = req.body;
        const shortId = uid.rnd();

        let urlPack = new URL(
            {
                shortId,
                redirectUrl: originalUrl,
                visitHistory: []
            }
        )

        await urlPack.save();
        await res.json(urlPack)
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to generate URL'});
    }
}

exports.redirectUrl = async(req, res) => {
    const shortId = req.params.shortId;
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const hostIp = ipAddress.split(',')[0].trim();
    console.log(hostIp);

    let location = {};
    try {
        const response = await fetch(`http://ipinfo.io/${hostIp}/json?token=${process.env.IPINFO_TOKEN}`);
        location = await response.json();
    } catch (err) {
        console.error('Error fetching location data:', err);
    }

    const currTimestamp = format(Date.now(), 'MMM d, yyyy HH:mm')
    const urlPack = await URL.findOneAndUpdate({
        shortId,
    },{ $push: {visitHistory:{timestamp: currTimestamp , ipAddress: hostIp, location} } } );

    if (!urlPack) 
    {
        return res.status(404).json({ error: 'URL not found' });
    }

    res.redirect(urlPack.redirectUrl);
}

exports.getAnalytics = async(req, res) => {
    const shortId = req.params.shortId;

    const urlPack = await URL.findOne({shortId});

    if(!urlPack){
        return res.status(404).json({error: 'URL not found'});
    }

    const analytics = {
        totalVisits: urlPack.visitHistory.length,
        // lastVisit: format(urlPack.visitHistory[urlPack.visitHistory.length - 1].timestamp, 'MMM d, yyyy HH:mm')
        analytics: urlPack.visitHistory
    }

    res.json(analytics);
}