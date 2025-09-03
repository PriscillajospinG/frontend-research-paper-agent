/**
 * FileUpload Component - Handles draft and format template uploads
 * Matches backend endpoints: /upload-draft and /upload-format
 */
import React, { useState, useCallback, useMemo } from 'react';
import apiService from '../services/api';

const FileUpload = ({ type = 'draft', onUploadSuccess, onUploadError }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  // File type restrictions based on backend
  const allowedTypes = useMemo(() => ({
    draft: ['pdf', 'docx', 'txt'],
    format: ['json', 'docx']
  }), []);

  const maxFileSize = useMemo(() => 50 * 1024 * 1024, []); // 50MB

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validateFile = useCallback((file) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const allowedExtensions = allowedTypes[type];

    if (!allowedExtensions.includes(fileExtension)) {
      throw new Error(`Invalid file type. Allowed: ${allowedExtensions.join(', ')}`);
    }

    if (file.size > maxFileSize) {
      throw new Error(`File too large. Maximum size: ${maxFileSize / (1024 * 1024)}MB`);
    }

    return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, allowedTypes, maxFileSize]);

  const handleFiles = useCallback(async (files) => {
    if (files.length === 0) return;

    const file = files[0];

    try {
      validateFile(file);
      setUploading(true);
      setUploadProgress(0);

      let response;
      if (type === 'draft') {
        response = await apiService.uploadDraft(file);
      } else {
        response = await apiService.uploadFormat(file);
      }

      setUploadedFile({
        ...response,
        originalFile: file
      });

      setUploadProgress(100);
      
      if (onUploadSuccess) {
        onUploadSuccess(response);
      }

    } catch (error) {
      console.error('Upload failed:', error);
      if (onUploadError) {
        onUploadError(error);
      }
    } finally {
      setUploading(false);
    }
  }, [type, onUploadSuccess, onUploadError, validateFile]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, [handleFiles]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
  };

  const getIcon = () => {
    if (type === 'draft') {
      return (
        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    } else {
      return (
        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
          <path d="M9 12h6m6 0h6m6 0h6M9 16h6m6 0h6m6 0h6M9 20h6m6 0h6m6 0h6M9 24h6m6 0h6m6 0h6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
  };

  const getTitle = () => {
    return type === 'draft' ? 'Upload Draft Document' : 'Upload Format Template';
  };

  const getDescription = () => {
    const extensions = allowedTypes[type].join(', ').toUpperCase();
    return type === 'draft' 
      ? `Upload your research draft or existing content (${extensions})`
      : `Upload format template or schema (${extensions})`;
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">{getTitle()}</h3>
        <p className="mt-1 text-sm text-gray-500">{getDescription()}</p>
      </div>

      {!uploadedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
            dragActive
              ? 'border-blue-400 bg-blue-50'
              : uploading
              ? 'border-gray-300 bg-gray-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            {getIcon()}
            
            {uploading ? (
              <div className="mt-4">
                <div className="text-sm font-medium text-gray-900 mb-2">
                  Uploading... {uploadProgress}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <>
                <div className="mt-4">
                  <label htmlFor={`file-upload-${type}`} className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Drop files here, or{' '}
                      <span className="text-blue-600 hover:text-blue-500">browse</span>
                    </span>
                    <input
                      id={`file-upload-${type}`}
                      name={`file-upload-${type}`}
                      type="file"
                      className="sr-only"
                      accept={allowedTypes[type].map(ext => `.${ext}`).join(',')}
                      onChange={handleChange}
                      disabled={uploading}
                    />
                  </label>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500">
                    {allowedTypes[type].join(', ').toUpperCase()} up to {maxFileSize / (1024 * 1024)}MB
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-green-800">
                  File uploaded successfully
                </h4>
                <div className="mt-1 text-sm text-green-700">
                  <p><strong>Filename:</strong> {uploadedFile.filename}</p>
                  {uploadedFile.content_length && (
                    <p><strong>Content length:</strong> {uploadedFile.content_length} characters</p>
                  )}
                  {uploadedFile.format_schema && (
                    <p><strong>Format schema:</strong> Parsed successfully</p>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="flex-shrink-0 text-green-400 hover:text-green-500"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {uploadedFile.content_preview && (
            <div className="mt-3 p-3 bg-white border border-gray-200 rounded">
              <p className="text-xs text-gray-500 mb-1">Content Preview:</p>
              <p className="text-sm text-gray-700 font-mono leading-relaxed">
                {uploadedFile.content_preview}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
