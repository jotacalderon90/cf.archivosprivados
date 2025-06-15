"use strict";

//import { v2 as cloudinary } from 'cloudinary';
const cloudinary = require('cloudinary').v2;

module.exports = async function(fileImageURL){
	try{
		
		cloudinary.config({ 
			cloud_name: process.env.CLOUDINARY_NAME, 
			api_key: process.env.CLOUDINARY_API_KEY, 
			api_secret: process.env.CLOUDINARY_API_SECRET
		});
		
		const fileImageName = fileImageURL.split('/').filter(Boolean).pop();
		
		const uploadResult = await cloudinary.uploader.upload(fileImageURL, {public_id: fileImageName})
			.catch((error) => {
				console.log('error en catch interno de cloudinary.uploader.upload');
				console.log(error);
			});
		
		// Optimize delivery by resizing and applying auto-format and auto-quality
		uploadResult.optimizeUrl = await cloudinary.url(fileImageName, {
			fetch_format: 'auto',
			quality: 'auto'
		});
		
		// Transform the image: auto-crop to square aspect_ratio
		uploadResult.autoCropUrl = await cloudinary.url(fileImageName, {
			crop: 'auto',
			gravity: 'auto',
			width: 500,
			height: 500,
		});
		
		return uploadResult;
		
	}catch(error) {
		console.log(error);
		logger.error(error);
		return null;
	}
}