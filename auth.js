// middleware/auth.ts
import supabase  from './supabase';

export const isBrother = async (userEmail) => {
  if (userEmail) {
    const { data, error } = await supabase.from('Brothers').select('*').eq('email', userEmail);
    return data?.length === 1 && !error;
  }
  return false;
};

export const isPledge = async (userEmail) => {
  if (userEmail) {
    const { data, error } = await supabase.from('Pledges').select('*').eq('email', userEmail);
    return data?.length === 1 && !error;
  }
  return false;
};