import { PhoneNumberUtil } from 'google-libphonenumber';
export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export function getInitials(firstName?: string, lastName?: string): string {
  const first = firstName?.[0] || '';
  const last = lastName?.[0] || '';
  return (first + last).toUpperCase() || '?';
}

// export function sumTotalcampaignMessages(data: any) {
//   let total = 0;
//   Object.keys(data).forEach((channel) => {
//     const channelData = data[channel];
//     if (channelData) {
//       total += channelData.total_messages ?? 0;
//     }
//   });
//   return total;
// }

// Decode a base64 string to UTF-8
export const decodeBase64 = (input: string): string => {
  // Convert base64 string to Uint8Array
  const uint8Array = Buffer.from(input, 'base64');
  // Convert Uint8Array to string
  return new TextDecoder().decode(uint8Array);
};

const phoneUtil = PhoneNumberUtil.getInstance();

export const isPhoneValid = (phone: any) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

export function formatCurrency(amount: any) {
  // Remove non-numeric characters and convert to a number
  const cleanedAmount = amount?.toString()?.replace(/[^\d.-]/g, '');
  const number = parseFloat(cleanedAmount);

  // Check if the input is a valid number
  if (isNaN(number)) {
    return '---';
  }

  // Use toLocaleString to format the number with commas
  return number.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function getDaysLeft(deadline?: string): string {
  if (!deadline) return 'No deadline';

  const deadlineDate = new Date(deadline);
  const today = new Date();

  // Calculate the difference in milliseconds
  const diffTime = deadlineDate.getTime() - today.getTime();

  // Convert to days
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return daysLeft > 0 ? `${daysLeft} Days Left` : 'Expired';
}
