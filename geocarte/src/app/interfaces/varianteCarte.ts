// just an interface for type safety.
interface VarianteCarte {
  id: VarianteCarte;
  varianteCarte?: VarianteCarte;
  cartePostale: CartePostale;
  legende: string;
  legende2?: string;
  face?: string;
  base64Photo?: string;
  nomEditeur?: string;
  nomCommune?: string;
  latitude?: string;
  longitude?: string;
}
