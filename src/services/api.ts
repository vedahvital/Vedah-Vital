import axios from 'axios';
import { LAB_REPORTS, type LabTestReport } from '../lib/mockData';

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
const API_BASE_URL = rawBaseUrl
  ? rawBaseUrl.endsWith('/api/public')
    ? rawBaseUrl
    : `${rawBaseUrl.replace(/\/$/, '')}/api/public`
  : '';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ContactPayload {
  name: string;
  email: string;
  batchCode?: string;
  message: string;
}

export interface CounterfeitPayload {
  batchCode: string;
  notes?: string;
}

/**
 * Fetches batch report details from backend API with fallback to local mock data.
 */
export const fetchBatchReport = async (batchCode: string): Promise<LabTestReport | null> => {
  const normalizedCode = batchCode.trim().toUpperCase();
  if (!normalizedCode) return null;

  if (!API_BASE_URL) {
    // Fallback to static mock data when API URL is not set
    return LAB_REPORTS[normalizedCode] || null;
  }

  try {
    const response = await apiClient.get<{ report: LabTestReport }>(`/verify/${encodeURIComponent(normalizedCode)}`);
    return response.data?.report || null;
  } catch (error) {
    console.warn(`[Vedah API] Failed to fetch report for batch ${normalizedCode}, checking mock data:`, error);
    return LAB_REPORTS[normalizedCode] || null;
  }
};

/**
 * Submits user contact/support inquiry to backend API.
 */
export const submitContactForm = async (payload: ContactPayload): Promise<{ success: boolean; message?: string }> => {
  if (!API_BASE_URL) {
    // Simulated success delay when backend URL is missing
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true, message: 'Message recorded locally.' };
  }

  try {
    const response = await apiClient.post<{ ok?: boolean; success?: boolean; message?: string }>('/contact', payload);
    const isSuccess = response.data?.ok === true || response.data?.success === true;
    return { success: isSuccess, message: response.data?.message || 'Message sent successfully!' };
  } catch (error) {
    console.error('[Vedah API] Contact submission error:', error);
    // Return graceful response so UI displays fallback error message
    return { success: false, message: 'Unable to reach backend service. Please try again.' };
  }
};

/**
 * Sends newsletter subscription email to backend API for promotional mailing lists.
 */
export const subscribeNewsletter = async (email: string): Promise<{ success: boolean; message: string }> => {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) return { success: false, message: 'Please enter a valid email address.' };

  if (!API_BASE_URL) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { success: true, message: 'Subscribed to promotional updates!' };
  }

  try {
    const response = await apiClient.post<{ ok?: boolean; success?: boolean; message?: string }>('/subscribe', { email: cleanEmail });
    const isSuccess = response.data?.ok === true || response.data?.success === true;
    return { success: isSuccess, message: response.data?.message || 'Subscribed successfully!' };
  } catch (error) {
    console.error('[Vedah API] Newsletter subscription error:', error);
    return { success: false, message: 'Unable to subscribe right now. Please try again.' };
  }
};

/**
 * Sends counterfeit QR alert report to backend.
 */
export const reportCounterfeit = async (payload: CounterfeitPayload): Promise<boolean> => {
  if (!API_BASE_URL) return true;

  try {
    const response = await apiClient.post<{ success: boolean }>('/counterfeit/report', payload);
    return response.data.success;
  } catch (error) {
    console.error('[Vedah API] Counterfeit alert report error:', error);
    return false;
  }
};


