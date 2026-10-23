# Visite sécurité – mise en place GitHub

## 1. Publier l'application
1. Dépôt GitHub **public** → *Settings → Pages* → Source : branche `main`, dossier `/ (root)`.
2. Envoyer à la racine du dépôt : `index.html`, `sw.js`, `manifest.webmanifest`, `memo.json`, les 5 icônes `.png` et `bump-version.js`.
3. Créer le fichier `.github/workflows/version.yml` (*Add file → Create new file*, taper le chemin complet pour créer les dossiers) et y copier le contenu du fichier fourni.
4. *Settings → Actions → General → Workflow permissions* : cocher **Read and write permissions**.

## 2. Version automatique
À chaque envoi sur `main` (y compris une modification de l'aide-mémoire depuis l'application), GitHub Actions augmente le dernier chiffre (v1.8.0 → v1.8.1), inscrit la date du jour dans `index.html` (pied de page, PDF, Excel) et dans `sw.js`. Les utilisateurs reçoivent alors le message de mise à jour.

## 3. Enregistrer l'aide-mémoire sur GitHub
1. GitHub → *Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token*.
   - Repository access : **Only select repositories** → ce dépôt.
   - Permissions → Repository permissions → **Contents : Read and write**.
2. Dans l'application : *Aide-mémoire → ✏️ Modifier → ⚙️ GitHub*, vérifier propriétaire / dépôt / branche, coller le jeton, *Enregistrer*. Le jeton reste sur cet appareil, jamais dans les fichiers.
3. Modifier le texte, puis **💾 Enregistrer** → mot de passe → le fichier `memo.json` est mis à jour sur GitHub. Tous les appareils le lisent depuis GitHub à l'ouverture de l'aide-mémoire (copie gardée pour le mode hors ligne).

## 4. Enregistrement du fichier Excel sur l'intranet
Réglage dans l'application : bouton **🌐 Enregistrement sur l'intranet**. Trois modes :

- **Désactivé** : téléchargement habituel.
- **Dossier réseau** : Chrome ou Edge sur ordinateur ou tablette Windows. On saisit le chemin (ex. `\\serveur\partage\Visites`) puis on choisit le dossier dans la fenêtre Windows (le chemin est copié, il suffit de le coller dans la barre d'adresse). Le chemin et le dossier sont mémorisés sur l'appareil après saisie du mot de passe ; le navigateur peut redemander l'autorisation d'écriture à chaque session. Le compte Windows de la tablette doit avoir le droit d'écrire dans le partage. Rien à installer côté serveur.
- **Serveur intranet** : fonctionne aussi sur téléphone. L'application envoie le fichier en `PUT` (WebDAV : adresse + nom du fichier) ou en `POST` (formulaire avec les champs `file` et `filename`), avec une authentification Basic facultative.

À prévoir avec le service informatique pour le mode « Serveur intranet » :
1. Une adresse **https** (une page https ne peut pas envoyer vers du http : le navigateur bloque).
2. Le serveur doit répondre aux requêtes CORS depuis le site de l'application, par exemple :
   `Access-Control-Allow-Origin: https://<proprietaire>.github.io`
   `Access-Control-Allow-Methods: PUT, POST, OPTIONS`
   `Access-Control-Allow-Headers: Authorization, Content-Type`
   et, pour un serveur en adresse privée appelé depuis un site public, `Access-Control-Allow-Private-Network: true`.
3. Le téléphone doit être sur le Wi-Fi de l'entreprise ou en VPN.

Le bouton « Tester l'envoi » dépose `test-visite-securite.txt` pour vérifier. En cas d'échec, le fichier Excel est toujours téléchargé sur l'appareil.
