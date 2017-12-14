export class LocalStorage {

  isEmpty(): boolean {
    if (localStorage.length === 0) {
      return true;
    }
    return false;
  }

  setIdUtilisateur(idUser: number): void {
    localStorage.setItem('currentUserId', idUser.toString());
  }

  getIdUtilisateur(): String {
    if (localStorage.getItem('currentUserId')) {
      return localStorage.getItem('currentUserId');
    }
  }

}
