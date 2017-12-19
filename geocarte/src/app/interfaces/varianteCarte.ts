// just an interface for type safety.
interface VarianteCarte {
  id: VarianteCarte;
  varianteCarte?: VarianteCarte;
  cartePostale: CartePostale;
  legende: string;
  legende2?: string;
  face?: string;
  base64Photo?: string;
}
