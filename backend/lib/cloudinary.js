"use strict";

//import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require('cloudinary').v2;
console.log(cloudinary);

if(process.env.CLOUDINAY_NAME && process.env.CLOUDINAY_NAME != ''){
	cloudinary.config({ 
		cloud_name: process.env.CLOUDINAY_NAME, 
		api_key: process.env.CLOUDINAY_API_KEY, 
		api_secret: process.env.CLOUDINAY_API_SECRET
	});
}

module.exports = async function(fileImageURL, fileImageID){
	try{
		
		const uploadResult = await cloudinary.uploader.upload(fileImageURL, {public_id: fileImageID})
			.catch((error) => {
				console.log('error en catch interno de cloudinary.uploader.upload');
				console.log(error);
			});
			
		console.log('uploadResult',uploadResult);
		
		// Optimize delivery by resizing and applying auto-format and auto-quality
		const optimizeUrl = cloudinary.url(fileImageID, {
			fetch_format: 'auto',
			quality: 'auto'
		});
		
		console.log('optimizeUrl',optimizeUrl);
		
		// Transform the image: auto-crop to square aspect_ratio
		const autoCropUrl = cloudinary.url(fileImageID, {
			crop: 'auto',
			gravity: 'auto',
			width: 500,
			height: 500,
		});
		
		console.log('autoCropUrl',autoCropUrl);
		
	}catch(error) {
		console.log(error);
		logger.error(error);
	}
}