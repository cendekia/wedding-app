'use client';

import React, { useState, useRef } from 'react';
import { uploadPhoto } from '@/lib/images';
import { Button } from '@/components/ui/Button';

interface PhotoUploadProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onSuccess,
  onError,
  className = '',
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'COUPLE' | 'CEREMONY' | 'RECEPTION' | 'ENGAGEMENT' | 'FAMILY' | 'GUESTS' | 'OTHER'>('OTHER');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: 'COUPLE', label: 'Couple' },
    { value: 'CEREMONY', label: 'Ceremony' },
    { value: 'RECEPTION', label: 'Reception' },
    { value: 'ENGAGEMENT', label: 'Engagement' },
    { value: 'FAMILY', label: 'Family' },
    { value: 'GUESTS', label: 'Guests' },
    { value: 'OTHER', label: 'Other' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Generate preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      
      // Set default title based on filename
      const fileName = selectedFile.name.split('.')[0];
      if (!title) {
        setTitle(fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setTitle('');
    setDescription('');
    setCategory('OTHER');
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !title) {
      onError?.('Please select a file and enter a title');
      return;
    }
    
    setUploading(true);
    
    try {
      // In a real implementation, we would first upload the file to Cloudinary or similar
      // and then call our API with the URL

      // For now, we'll just simulate the upload with a local URL
      const fakeImageUrl = preview || '';
      
      // Call the upload function
      const result = await uploadPhoto({
        title,
        description,
        imageUrl: fakeImageUrl,
        category,
        featured: false,
      });
      
      if (result) {
        // Reset form after successful upload
        resetForm();
        onSuccess?.();
      } else {
        onError?.('Failed to upload photo');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      onError?.(error instanceof Error ? error.message : 'An error occurred during upload');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-xl font-semibold mb-4">Upload a Photo</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File upload area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            ${preview ? 'border-primary' : 'border-gray-300 hover:border-gray-400'}
            transition-colors duration-200`}
          onClick={triggerFileInput}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          {preview ? (
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={preview} 
                alt="Preview" 
                className="max-h-64 mx-auto rounded-lg" 
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  resetForm();
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                aria-label="Remove image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12 text-gray-400 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500">Click to select or drag a photo here</p>
              <p className="text-sm text-gray-400 mt-1">JPG, PNG, or GIF up to 10MB</p>
            </div>
          )}
        </div>
        
        {/* Title input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Photo Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your photo"
            className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
            required
          />
        </div>
        
        {/* Description input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description (optional)"
            rows={3}
            className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
          />
        </div>
        
        {/* Category select */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        
        {/* Submit button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={uploading || !file || !title}
            isLoading={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Photo'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PhotoUpload; 