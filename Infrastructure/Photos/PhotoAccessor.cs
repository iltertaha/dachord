using Application.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;
        public PhotoAccessor(IOptions<CloudinaryConfigs> config) 
        {
            var cloudinaryAccount = new Account(
                config.Value.CloudName,config.Value.ApiKey,config.Value.ApiSecret);
            
            _cloudinary = new Cloudinary(cloudinaryAccount);
        }

        public async Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
            if(file.Length > 0)
            {
                // use "using" keyword to dispose the resource after use
                await using var fileStream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, fileStream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadImageResult = await _cloudinary.UploadAsync(uploadParams);

                if(uploadImageResult.Error != null)
                {
                    throw new Exception(uploadImageResult.Error.Message);
                }

                // happy path
                return new PhotoUploadResult
                {
                    PublicId = uploadImageResult.PublicId,
                    Url = uploadImageResult.SecureUrl.ToString()
                };
            }
            return null;
        }

        public async Task<string> DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var deletionResult = await _cloudinary.DestroyAsync(deleteParams);

            return deletionResult.Result == "ok" ? deletionResult.Result : null;
        }
    }
}
