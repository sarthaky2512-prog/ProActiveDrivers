export type Language = 'en' | 'es';

export interface ConfigurableBenefit {
  slot_key: string;
  title_en: string;
  title_es: string;
  description_en: string;
  description_es: string;
  availability_note_en: string;
  availability_note_es: string;
  sort_order: number;
}

export interface SiteLocationConfig {
  name: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  whatsapp: string;
  email: string;
}

export interface SiteConfigResponse {
  ok: boolean;
  location: SiteLocationConfig;
  benefits: ConfigurableBenefit[];
}
