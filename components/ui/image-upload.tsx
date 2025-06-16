"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, ImageIcon, Camera, Trash2 } from "lucide-react"
import { imageUploadService } from "@/lib/image-upload"

interface ImageUploadProps {
  currentImage?: string
  onImageChange: (imageUrl: string) => void
  label?: string
  className?: string
  aspectRatio?: "square" | "landscape" | "portrait"
  maxSize?: number // in MB
}

export function ImageUpload({
  currentImage,
  onImageChange,
  label = "Upload Image",
  className = "",
  aspectRatio = "landscape",
  maxSize = 5,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const aspectRatioClasses = {
    square: "aspect-square",
    landscape: "aspect-video",
    portrait: "aspect-[3/4]",
  }

  const handleFileSelect = async (file: File) => {
    if (!file) return

    setIsUploading(true)
    try {
      const imageUrl = await imageUploadService.uploadImage(file)
      onImageChange(imageUrl)
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const removeImage = () => {
    onImageChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <Label>{label}</Label>}

      <div className="space-y-3">
        {/* Image Preview */}
        {currentImage ? (
          <div className="relative group">
            <div
              className={`relative ${aspectRatioClasses[aspectRatio]} w-full max-w-md rounded-lg overflow-hidden border-2 border-gray-200`}
            >
              <img src={currentImage || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={openFileDialog}
                    className="bg-white/90 hover:bg-white text-gray-900"
                  >
                    <Camera className="w-4 h-4 mr-1" />
                    Change
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={removeImage}
                    className="bg-red-500/90 hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Upload Area */
          <div
            className={`
              relative ${aspectRatioClasses[aspectRatio]} w-full max-w-md
              border-2 border-dashed rounded-lg transition-colors cursor-pointer
              ${
                dragActive
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-300 hover:border-purple-400 hover:bg-gray-50"
              }
              ${isUploading ? "pointer-events-none opacity-50" : ""}
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={openFileDialog}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              {isUploading ? (
                <div className="space-y-2">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-600">Uploading...</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to {maxSize}MB</p>
                  </div>
                  <Button size="sm" variant="outline" className="mt-2">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hidden File Input */}
        <Input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

        {/* Upload Tips */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>
            • Recommended size:{" "}
            {aspectRatio === "square" ? "400x400px" : aspectRatio === "landscape" ? "800x450px" : "600x800px"}
          </p>
          <p>• Supported formats: JPEG, PNG, GIF</p>
          <p>• Maximum file size: {maxSize}MB</p>
        </div>
      </div>
    </div>
  )
}
