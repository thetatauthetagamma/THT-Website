// middleware/auth.ts
import supabase from './supabase';

export const isBrother = async (userEmail) => {
  try {
    if (userEmail) {
      const { data, error } = await supabase.from('Brothers').select('*').eq('email', userEmail.value);
      return data?.length === 1 && !error;
    }
    return false;
  } catch (error) {
    console.error('Error checking brother status:', error);
    return false;
  }
};

export const isPledge = async (userEmail) => {
  try {
    if (userEmail) {
      const { data, error } = await supabase.from('Pledges').select('*').eq('email', userEmail.value);
      return data?.length === 1 && !error;
    }
    return false;
  } catch (error) {
    console.error('Error checking pledge status:', error);
    return false;
  }
};
