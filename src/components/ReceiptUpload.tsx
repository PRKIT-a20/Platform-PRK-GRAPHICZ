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
  const [amount, setAmount] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const handleUpload = async () => {
    if (!user || !file || !amount) return;
    
    setUploading(true);
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
            amount: parseFloat(amount)
          }
        ]);

      if (dbError) throw dbError;

      onUploadSuccess();
      setFile(null);
      setAmount('');
    } catch (error: any) {
      console.error('Error uploading receipt:', error);
      alert(`Failed to upload receipt: ${error.message || 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: {'image/*': [], 'application/pdf': []} });

  return (
    <div className="bg-white rounded-3xl border border-black/5 p-8 space-y-6">
      <div {...getRootProps()} className={`border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all ${isDragActive ? 'border-brand-primary bg-brand-primary/5' : 'border-black/10 hover:border-brand-primary/50'}`}>
        <input {...getInputProps()} />
        <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <Upload className="text-brand-primary" size={32} />
        </div>
        <h3 className="text-xl font-bold mb-2">{file ? file.name : 'Upload Payment Proof'}</h3>
        <p className="text-black/40 font-medium">Drag & drop or click to select your bank transfer proof (Image/PDF).</p>
      </div>
      
      <div className="flex gap-4">
        <input 
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 px-4 py-4 bg-black/5 border border-transparent rounded-2xl outline-none font-medium"
        />
        <button 
          onClick={handleUpload}
          disabled={uploading || !file || !amount}
          className="px-8 py-4 bg-brand-primary text-brand-secondary rounded-2xl font-bold hover:bg-brand-secondary hover:text-brand-primary transition-all disabled:opacity-50"
        >
          {uploading ? <Loader2 className="animate-spin" /> : 'Upload'}
        </button>
      </div>
    </div>
  );
}
