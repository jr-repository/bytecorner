import type { PortfolioItem, Service } from "./storage";

export const WHATSAPP_PHONE_DISPLAY = "+62 877-9028-8325";
export const WHATSAPP_PHONE_NUMBER = "6287790288325";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function serviceWhatsappUrl(service: Service, title: string) {
  return whatsappUrl(`Halo ByteCorner.id, saya tertarik dengan service "${title}". Dapatkah saya mendapatkan informasi lebih lanjut terkait layanan ini?`);
}

export function portfolioWhatsappUrl(portfolio: PortfolioItem, title: string) {
  return whatsappUrl(`Halo ByteCorner.id, saya tertarik dengan project "${title}" untuk client ${portfolio.client}. Dapatkah saya mendapatkan informasi lebih lanjut?`);
}
