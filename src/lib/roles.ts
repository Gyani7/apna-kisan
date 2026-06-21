import { z } from 'zod';

export const Role = z.enum(['super_admin', 'admin', 'farmer', 'buyer', 'expert']);

export type Role = z.infer<typeof Role>;

export const permissions = {
  super_admin: ['*'],
  admin: [
    'manage_users',
    'manage_products',
    'manage_orders',
    'manage_announcements',
    'view_analytics',
  ],
  farmer: [
    'create_product',
    'manage_own_products',
    'view_own_orders',
    'view_community_feed',
    'create_post',
  ],
  buyer: [
    'view_products',
    'create_order',
    'view_own_orders',
    'view_community_feed',
    'create_post',
  ],
  expert: ['view_community_feed', 'create_post', 'answer_question'],
};

export const hasPermission = (role: Role, permission: string) => {
  if (permissions[role].includes('*')) {
    return true;
  }

  return permissions[role].includes(permission);
};
