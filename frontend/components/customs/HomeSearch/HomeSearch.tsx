"use client";

import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Camera, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const HomeSearch = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isImageSearch, setIsImageSearch] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [searchImage, setSearchImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Text search
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
  };

  // Image search placeholder (no API yet)
  const handleImageSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchImage) {
      toast.error("Please upload an image first");
      return;
    }
    toast.info("Image search feature coming soon!");
  };

  // Image drop handler with validation
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      setIsUploading(true);
      setSearchImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setIsUploading(false);
        toast.success("Image uploaded successfully");
      };
      reader.onerror = () => {
        setIsUploading(false);
        toast.error("Failed to read the image");
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    multiple: false,
    maxFiles: 1,
  });

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 px-4">
      {/* Text Search Form */}
      <form onSubmit={handleTextSubmit}>
        <div className="relative">
          {/* Search Icon */}
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />

          {/* Input */}
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Enter make, model, or use our AI Image search..."
            className="pl-12 pr-28 py-6 w-full rounded-full border border-gray-300 bg-white/90 shadow-md focus-visible:ring-2 focus-visible:ring-blue-400 transition"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            size="sm"
            className="absolute right-12 top-1/2 -translate-y-1/2 rounded-full px-4 py-2 text-sm"
          >
            Search
          </Button>

          {/* Camera Icon */}
          <Camera
            size={32}
            onClick={() => setIsImageSearch((prev)=>!prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1 rounded-full"
            style={{
              backgroundColor: isImageSearch ? "black" : "transparent",
              color: isImageSearch ? "white" : "black",
            }}
          />
        </div>
      </form>

      {/* Image Search Dropzone */}
      {isImageSearch && (
        <form onSubmit={handleImageSearch}>
          <div className="mt-4 p-4 border border-dashed rounded-lg bg-white/80 shadow">
            {imagePreview ? (
              <div className="mb-4 flex flex-col items-center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-40 rounded-lg shadow mb-3"
                />
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setSearchImage(null);
                    setImagePreview(null);
                    toast.info("Image removed");
                  }}
                >
                  Remove Image
                </Button>
              </div>
            ) : (
              <div
                {...getRootProps()}
                className="cursor-pointer p-6 border-2 border-dashed border-gray-400 text-center rounded-lg hover:bg-gray-100 transition"
              >
                <input {...getInputProps()} />
                {isDragActive && !isDragReject ? (
                  <p>Drop the image here...</p>
                ) : (
                  <p>
                    Drag & drop a car image here, or click to select for AI search
                  </p>
                )}
                {isDragReject && <p className="text-red-500">Invalid image type</p>}
                <p className="text-gray-400 text-sm mt-2">
                  Supports: JPG, PNG (max 5MB)
                </p>
              </div>
            )}

            {imagePreview && (
              <Button
                type="submit"
                className="mt-4 w-full"
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Search with Image"}
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default HomeSearch;
