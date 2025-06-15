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
		
		const fileImageName = fileImageName.split('/').filter(Boolean).pop();
		console.log('fileImageName',fileImageName);
		
		const uploadResult = await cloudinary.uploader.upload(fileImageURL, {public_id: fileImageName})
			.catch((error) => {
				console.log('error en catch interno de cloudinary.uploader.upload');
				console.log(error);
			});
			
		console.log('uploadResult',uploadResult);
		
		// Optimize delivery by resizing and applying auto-format and auto-quality
		const optimizeUrl = await cloudinary.url(fileImageName, {
			fetch_format: 'auto',
			quality: 'auto'
		});
		
		console.log('optimizeUrl',optimizeUrl);
		
		// Transform the image: auto-crop to square aspect_ratio
		const autoCropUrl = await cloudinary.url(fileImageName, {
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