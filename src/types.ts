export type User = {
  id: string;
  email: string;
  isAdmin: boolean;
};

export type SketchType = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  estimatedDays: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  sketchType: string;
  size: string;
  photoUrl: string;
  notes?: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'rejected';
  createdAt: string;
};

export type GalleryImage = {
  id: string;
  url: string;
  description: string;
  createdAt: string;
};