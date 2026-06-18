export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  avatar?: string;
  createdAt: string;
}

export interface Game {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  icon?: string;
  thumbnail?: string;
  banner?: string;
  publisher?: string;
  genre?: string;
  isActive: boolean;
  isFeatured: boolean;
  sortOrder: number;
  createdAt: string;
  products?: Product[];
}

export interface Product {
  id: string;
  gameId: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  stock: number;
  isActive: boolean;
  isPopular: boolean;
  sortOrder: number;
  game?: Pick<Game, "name" | "slug" | "icon">;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  gameUserId?: string;
  gameServerId?: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "REFUNDED";
  totalAmount: number;
  paymentMethodId?: string;
  notes?: string;
  createdAt: string;
  orderItems?: OrderItem[];
  paymentMethod?: PaymentMethod;
  transaction?: Transaction;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product?: Product;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: "BANK_TRANSFER" | "E_WALLET" | "PULSA" | "VOUCHER";
  icon?: string;
  accountName?: string;
  accountNumber?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  status: string;
  paymentMethod?: string;
  paymentChannel?: string;
  referenceId?: string;
  paidAt?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
