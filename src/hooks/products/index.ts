/**
 * Products hooks index file
 * Exports all product-related hooks for easy importing
 */

// Export all hooks
export * from './useProducts';
export * from './useProductDetail';
export * from './useProductMutation';
export * from './useProductVendors';
export * from './useProductStock';
export * from './useInventoryReport';
export * from './useUnpaidInventory';

// Backward compatibility exports
export { useProducts as useFetchProducts } from './useProducts';
export { useProductDetail as useProductDetailStandardized } from './useProductDetail';
