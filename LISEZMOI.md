# Visite sécurité – mise en place GitHub

## 1. Publier l'application
1. Dépôt GitHub **public** → *Settings → Pages* → Source : branche `main`, dossier `/ (root)`.
2. Envoyer à la racine du dépôt : `index.html`, `sw.js`, `manifest.webmanifest`, `memo.json`, les 5 icônes `.png` et `bump-version.js`.
3. Créer le fichier `.github/workflows/version.yml` (*Add file → Create new file*, taper le chemin complet pour créer les dossiers) et y copier le contenu du fichier fourni.
4. *Settings → Actions → General → Workflow permissions* : cocher **Read and write permissions**.

## 2. Version automatique
À chaque envoi sur `main` (y compris une modification de l'aide-mémoire depuis l'application), GitHub Actions augmente le dernier chiffre (v1.8.0 → v1.8.1), inscrit la date du jour dans `index.html` (pied de page, PDF, Excel) et dans `sw.js`. Les utilisateurs reçoivent alors le message de mise à jour.

## 3. Connexion GitHub et publication (aide-mémoire et zones)
1. GitHub → *Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token*.
   - Repository access : **Only select repositories** → ce dépôt.
   - Permissions → Repository permissions → **Contents : Read and write**.
2. Dans l'application : **⚙️ Paramètres → 🔗 GitHub**. Vérifier propriétaire / dépôt / branche, puis les deux fichiers : **aide-mémoire = `memo.json`** et **zones = `zones.json`** (ils doivent être différents), coller le jeton, *Enregistrer*. Le jeton reste sur cet appareil, jamais dans les fichiers.
3. Aide-mémoire : **⚙️ → 📋 Aide-mémoire**, modifier le texte, puis **💾 Enregistrer** → mot de passe → `memo.json` est mis à jour sur GitHub. Zones : **⚙️ → 📍 Zones**, même principe avec `zones.json`.
4. Les appareils relisent ces fichiers à l'ouverture (copie gardée pour le mode hors ligne).

## 4. Enregistrement du fichier Excel sur l'intranet
Réglage dans l'application : bouton **⚙️ Paramètres** (à droite du bouton Aide-mémoire), onglet **🌐 Intranet**. Trois modes :

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

## 5. Zone des photos
- Chaque photo doit recevoir une **zone**, choisie dans une liste placée sous l'action. Le champ est obligatoire : sans zone, la photo ne peut pas être ajoutée au rapport.
- La liste se modifie dans **⚙️ Paramètres**, onglet **📍 Zones** : texte, ajout, suppression, ordre. L'enregistrement demande le mot de passe, et la liste doit garder au moins une zone.
- La liste est **partagée** : elle est enregistrée dans le fichier `zones.json` du dépôt. Après l'enregistrement (mot de passe), l'application l'envoie sur GitHub avec la même connexion que l'aide-mémoire (bouton « 🔗 Connexion GitHub » de l'onglet Zones, à renseigner une fois sur l'appareil de l'administrateur). Le workflow augmente alors la version et les appareils reçoivent la nouvelle liste à la prochaine ouverture.
- Ajouter `zones.json` à la racine du dépôt, avec les autres fichiers. Liste de départ : Production, Stockage / Entrepôt, Expédition, Maintenance, Extérieur, Bureaux. Si l'envoi échoue, la liste reste sur l'appareil et un bandeau propose « ↻ Republier ».
- La zone apparaît dans la liste des photos, dans le PDF et dans l'Excel. Colonnes de l'Excel : N°, Date de visite, Zone, Commentaire, Action, Gravité, Photo, Photo après (l'Excel base complète ajoute ensuite Doublon, Fait par, Heure, etc.).
- Supabase : la zone est enregistrée dans la colonne `photos` (JSON) de la table `visites`, sous la clé `zone`. Aucune modification de la base n'est nécessaire.
