import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  X, 
  Move, 
  Eye, 
  Download, 
  RotateCw, 
  Crop, 
  Maximize2,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';
import { IndustrialButton, IndustrialAlert, IndustrialSpinner } from './IndustrialComponents';

/**
 * Service Image Management Component
 * Handles drag-and-drop upload, preview, reordering, and optimization
 */

interface ServiceImage {
  id: string;
  url: string;
  thumbnail_url?: string;
  filename: string;
  size: number;
  type: string;
  alt_text?: string;
  is_primary?: boolean;
  upload_date: string;
}

interface ServiceImageManagerProps {
  images: ServiceImage[];
  onImagesChange: (images: ServiceImage[]) => void;
  maxImages?: number;
  maxFileSize?: number; // in MB
  allowedTypes?: string[];
  showOptimization?: boolean;
}

export function ServiceImageManager({
  images,
  onImagesChange,
  maxImages = 5,
  maxFileSize = 5,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  showOptimization = true,
}: ServiceImageManagerProps) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ServiceImage | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFiles = useCallback((files: File[]) => {
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    if (images.length + files.length > maxImages) {
      newErrors.push(`Solo puedes subir un máximo de ${maxImages} imágenes. Ya tienes ${images.length} y estás intentando añadir ${files.length}.`);
      return { valid: [], errors: newErrors }; // Stop further validation if max images exceeded
    }

    files.forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        newErrors.push(`El archivo '${file.name}' tiene un tipo no permitido: ${file.type}. Tipos permitidos: ${allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}.`);
        return;
      }
      if (file.size > maxFileSize * 1024 * 1024) {
        newErrors.push(`El archivo '${file.name}' (${formatFileSize(file.size)}) excede el tamaño máximo permitido de ${maxFileSize}MB.`);
        return;
      }
      validFiles.push(file);
    });

    return { valid: validFiles, errors: newErrors };
  }, [images, maxImages, allowedTypes, maxFileSize]);

  // File Upload Handler
  const handleFileUpload = useCallback(async (files: File[]) => {
    const { valid: validFiles, errors: validationErrors } = validateFiles(files);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setUploading(true);
    setErrors([]);

    try {
      const newImages: ServiceImage[] = [];

      for (const file of validFiles) {
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        
        // Simulate upload process - in real implementation, upload to storage service
        const uploadedImage: ServiceImage = {
          id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          url: previewUrl, // In real app, this would be the uploaded URL
          thumbnail_url: previewUrl, // In real app, generate thumbnail
          filename: file.name,
          size: file.size,
          type: file.type,
          alt_text: `Servicio automotriz - ${file.name}`,
          is_primary: images.length === 0 && newImages.length === 0, // First image is primary
          upload_date: new Date().toISOString(),
        };

        // Simulate optimization if enabled
        if (showOptimization) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate processing time
        }

        newImages.push(uploadedImage);
      }

      onImagesChange([...images, ...newImages]);
    } catch (error) {
      setErrors(['Error al subir las imágenes. Inténtalo de nuevo.']);
    } finally {
      setUploading(false);
    }
  }, [allowedTypes, images, maxFileSize, maxImages, onImagesChange, showOptimization]);

  // Drag and Drop Handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  }, [handleFileUpload]);

  // Remove Image
  const removeImage = (imageId: string) => {
    const updatedImages = images.filter(img => img.id !== imageId);
    
    // If removed image was primary, make first remaining image primary
    if (updatedImages.length > 0 && !updatedImages.some(img => img.is_primary)) {
      updatedImages[0].is_primary = true;
    }
    
    onImagesChange(updatedImages);
  };

  // Set Primary Image
  const setPrimaryImage = (imageId: string) => {
    const updatedImages = images.map(img => ({
      ...img,
      is_primary: img.id === imageId,
    }));
    onImagesChange(updatedImages);
  };

  // Reorder Images
  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images];
    const [movedImage] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedImage);
    onImagesChange(updatedImages);
  };

  // Update Alt Text
  const updateAltText = (imageId: string, altText: string) => {
    const updatedImages = images.map(img =>
      img.id === imageId ? { ...img, alt_text: altText } : img
    );
    onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${dragOver 
            ? 'border-accent-400 bg-accent-50' 
            : 'border-primary-300 hover:border-accent-400 hover:bg-accent-50/50'
          }
          ${uploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allowedTypes.join(',')}
          onChange={(e) => e.target.files && handleFileUpload(Array.from(e.target.files))}
          className="hidden"
        />

        {uploading ? (
          <div className="space-y-4">
            <IndustrialSpinner size="lg" />
            <p className="text-primary-600 font-medium">
              {showOptimization ? 'Subiendo y optimizando imágenes...' : 'Subiendo imágenes...'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-accent-100 rounded-full">
                <Upload className="w-12 h-12 text-accent-600" />
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold text-primary-800 mb-2">
                Arrastra imágenes aquí o haz clic para seleccionar
              </p>
              <p className="text-sm text-primary-600">
                {allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')} hasta {maxFileSize}MB cada una
              </p>
              <p className="text-xs text-primary-500 mt-1">
                Máximo {maxImages} imágenes • {images.length}/{maxImages} usadas
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <IndustrialAlert
          variant="danger"
          title="Errores de Validación"
          icon={<AlertCircle className="w-5 h-5" />}
          dismissible
          onDismiss={() => setErrors([])}
        >
          <ul className="list-disc list-inside space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-sm">{error}</li>
            ))}
          </ul>
        </IndustrialAlert>
      )}

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-primary-800 heading-automotive">
              Imágenes del Servicio ({images.length})
            </h3>
            {showOptimization && (
              <div className="flex items-center gap-2 text-sm text-success-600">
                <CheckCircle className="w-4 h-4" />
                Optimizadas automáticamente
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white rounded-lg shadow-industrial border border-primary-200 overflow-hidden group"
              >
                {/* Image Preview */}
                <div className="relative aspect-video">
                  <img
                    src={image.thumbnail_url || image.url}
                    alt={image.alt_text || image.filename}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Primary Badge */}
                  {image.is_primary && (
                    <div className="absolute top-2 left-2 bg-accent-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      PRINCIPAL
                    </div>
                  )}

                  {/* Action Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedImage(image)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      title="Ver imagen completa"
                    >
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => setPrimaryImage(image.id)}
                      className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                      title="Establecer como principal"
                    >
                      <Maximize2 className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => removeImage(image.id)}
                      className="p-2 bg-danger-600/80 backdrop-blur-sm rounded-full hover:bg-danger-600 transition-colors"
                      title="Eliminar imagen"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Image Info */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-800 truncate">
                      {image.filename}
                    </span>
                    <span className="text-xs text-primary-500">
                      {formatFileSize(image.size)}
                    </span>
                  </div>

                  {/* Alt Text Input */}
                  <input
                    type="text"
                    value={image.alt_text || ''}
                    onChange={(e) => updateAltText(image.id, e.target.value)}
                    placeholder="Descripción de la imagen..."
                    className="w-full px-3 py-2 text-sm border border-primary-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
                  />

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {index > 0 && (
                        <button
                          onClick={() => moveImage(index, index - 1)}
                          className="p-1 text-primary-500 hover:text-accent-600 transition-colors"
                          title="Mover hacia la izquierda"
                        >
                          <Move className="w-4 h-4" />
                        </button>
                      )}
                      {index < images.length - 1 && (
                        <button
                          onClick={() => moveImage(index, index + 1)}
                          className="p-1 text-primary-500 hover:text-accent-600 transition-colors"
                          title="Mover hacia la derecha"
                        >
                          <Move className="w-4 h-4 rotate-180" />
                        </button>
                      )}
                    </div>
                    
                    <div className="text-xs text-primary-500">
                      Posición {index + 1}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-lg shadow-2xl max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-primary-200 flex items-center justify-between">
                <h3 className="font-semibold text-primary-800">{selectedImage.filename}</h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 hover:bg-primary-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt_text || selectedImage.filename}
                  className="max-w-full max-h-[70vh] object-contain mx-auto"
                />
              </div>
              <div className="p-4 border-t border-primary-200 bg-primary-50">
                <div className="flex items-center justify-between text-sm text-primary-600">
                  <span>Tamaño: {formatFileSize(selectedImage.size)}</span>
                  <span>Subida: {new Date(selectedImage.upload_date).toLocaleDateString('es-ES')}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Section */}
      {images.length === 0 && (
        <IndustrialAlert
          variant="info"
          title="Consejos para Imágenes de Servicios"
          icon={<ImageIcon className="w-5 h-5" />}
        >
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Usa imágenes de alta calidad que muestren el trabajo realizado</li>
            <li>La primera imagen será la principal y se mostrará en las listas</li>
            <li>Incluye fotos antes/después cuando sea posible</li>
            <li>Agrega descripciones detalladas para mejor SEO</li>
            <li>Las imágenes se optimizan automáticamente para web</li>
          </ul>
        </IndustrialAlert>
      )}
    </div>
  );
}