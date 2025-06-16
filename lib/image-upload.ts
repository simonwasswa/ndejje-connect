export class ImageUploadService {
  private static instance: ImageUploadService
  private uploadedImages: Map<string, string> = new Map()

  static getInstance(): ImageUploadService {
    if (!ImageUploadService.instance) {
      ImageUploadService.instance = new ImageUploadService()
    }
    return ImageUploadService.instance
  }

  async uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith("image/")) {
        reject(new Error("Please select a valid image file"))
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        reject(new Error("Image size must be less than 5MB"))
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        const imageId = `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        this.uploadedImages.set(imageId, result)
        resolve(result)
      }
      reader.onerror = () => reject(new Error("Failed to read image file"))
      reader.readAsDataURL(file)
    })
  }

  getImage(imageId: string): string | null {
    return this.uploadedImages.get(imageId) || null
  }

  deleteImage(imageId: string): boolean {
    return this.uploadedImages.delete(imageId)
  }

  getAllImages(): Array<{ id: string; url: string }> {
    return Array.from(this.uploadedImages.entries()).map(([id, url]) => ({ id, url }))
  }
}

export const imageUploadService = ImageUploadService.getInstance()
