// just an interface for type safety.
class CartePostale {
  id?: VarianteCarte;
  idCarte: VarianteCarte;
  codeEditeur?: number;
  editeur?: Editeur;
  monuments?: Monument;
  commune?: Commune;
  latitude?: number;
  longitude?: number;
  nomEditeur?: string;
  nomCommune?: string;
  legende: string;
  nomMonument: string;
  icon: string;
}
