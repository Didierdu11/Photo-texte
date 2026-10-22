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
