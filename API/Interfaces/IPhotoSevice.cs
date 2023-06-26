﻿using CloudinaryDotNet.Actions;

namespace API.Interfaces
{
    public interface IPhotoSevice
    {
        Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}
