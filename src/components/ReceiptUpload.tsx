import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface ReceiptUploadProps {
  onUploadSuccess: () => void;
}

export default function ReceiptUpload({ onUploadSuccess }: ReceiptUploadProps) {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    if (!user || acceptedFiles.length === 0) return;
    
    setUploading(true);
    const file = acceptedFiles[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}/${Math.random()}.${fileExt}`;

    try {
      // 1. Upload to Storage
      const { error: uploadError, data } = await supabase.storage
        .from('payment-proofs')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // 2. Insert into receipts table
      const { error: dbError } = await supabase
        .from('receipts')
        .insert([
          {
            user_id: user.id,
            upload_url: data?.path,
            status: 'pending',
            amount: 0 // User should probably enter this
          }
        ]);

      if (dbError) throw dbError;

      onUploadSuccess();
    } catch (error) {
      console.error('Error uploading receipt:', error);
      alert('Failed to upload receipt.');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': [], 'application/pdf': []} });

  return (
    <div {...getRootProps()} className={`border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all ${isDragActive ? 'border-brand-primary bg-brand-primary/5' : 'border-black/10 hover:border-brand-primary/50'}`}>
      <input {...getInputProps()} />
      <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
        {uploading ? <Loader2 className="animate-spin text-brand-primary" size={32} /> : <Upload className="text-brand-primary" size={32} />}
      </div>
      <h3 className="text-xl font-bold mb-2">Upload Payment Proof</h3>
      <p className="text-black/40 font-medium">Drag & drop or click to select your bank transfer proof (Image/PDF).</p>
    </div>
  );
}
