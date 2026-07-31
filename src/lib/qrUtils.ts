/**
 * Batch QR Code Utilities and URL Builder
 * Used by Frontend & CMS to build standardized QR verification links and validate batch formats.
 */

export const BATCH_CODE_REGEX = /^VV-[A-Z]{3,4}-\d{4}-\d{3}$/;

/**
 * Validates whether a batch code matches strict Vedah Vital syntax (e.g. VV-ASH-2026-001).
 */
export const validateBatchCodeFormat = (batchCode: string): boolean => {
  if (!batchCode) return false;
  return BATCH_CODE_REGEX.test(batchCode.trim().toUpperCase());
};

/**
 * Builds unique QR verification URL for bottle label printing and QR code generators.
 */
export const buildBatchQrUrl = (batchCode: string, siteUrl?: string): string => {
  const normalizedCode = batchCode.trim().toUpperCase();
  const base = siteUrl || import.meta.env.VITE_SITE_URL || 'https://vedahvital.com';
  const cleanBase = base.replace(/\/+$/, '');
  return `${cleanBase}/verify?batch=${encodeURIComponent(normalizedCode)}&source=qr`;
};

/**
 * Generates metadata object for batch QR code export (PNG / SVG print labels).
 */
export const getBatchQrMetadata = (batchCode: string) => {
  const normalizedCode = batchCode.trim().toUpperCase();
  const isValid = validateBatchCodeFormat(normalizedCode);
  const targetUrl = buildBatchQrUrl(normalizedCode);

  return {
    batchCode: normalizedCode,
    isValidFormat: isValid,
    targetUrl,
    suggestedFilename: `QR_${normalizedCode}.png`,
    printLabelText: `Scan to Verify Batch: ${normalizedCode}`,
  };
};
