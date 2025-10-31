# 💰 Projet : Système de Budget Familial Intelligent

## 🎯 Objectif général
Créer une application web moderne pour **gérer le budget familial** (famille de 5 personnes), avec :
- un **tableau de bord visuel**,  
- une **gestion complète des dépenses et revenus**,  
- une **interface administrateur** centralisée,  
- une **intégration IA** pour suggérer des optimisations financières.

---

## 🧩 Architecture globale

### 📁 Structure du projet
/budget-familial/
│
├── index.html → Vue d'ensemble (suivi général)
├── login.html → Page de connexion
├── admin.html → Interface principale d'administration
│
├── transactions.html → Gestion des transactions (CRUD complet)
├── utilisateurs.html → Gestion des utilisateurs (rôles et mots de passe)
├── report.html → Rapports et graphiques
├── ai.html → Suggestions IA
│
├── /assets/
│ ├── styles.css → Thème visuel (luxe, verre, violet-cyan)
│ └── scripts/ → Scripts JS modulaires
│
└── /firebase/
└── config.js → Configuration Firebase

yaml
Copier le code

---

## 💻 Technologies principales
- **Frontend :** HTML5, CSS3, JavaScript (ES Modules)
- **Backend :** Firebase
  - Firestore (base de données)
  - Auth (authentification)
- **Visualisation :** Chart.js / ApexCharts
- **Design :**  
  - Thème sombre, verre transparent (*glassmorphism*)
  - Dégradé violet → cyan
  - Police : *Manrope* (Google Fonts)

---

## ⚙️ Firebase Firestore – Collections

| Collection       | Description                              | Champs clés |
|------------------|-------------------------------------------|-------------|
| `transactions`   | Revenu et dépenses                        | date, montant, type, utilisateur |
| `utilisateurs`   | Membres de la famille                     | nom, email, motdepasse, role |
| `categories`     | Catégories de dépenses (optionnel)        | nom, couleur |
| `suggestions`    | Recommandations IA                        | texte, date, utilisateur |

---

## 💼 Fonctionnalités principales (20 au total)

### 🔐 Authentification
1. Connexion utilisateur (Firebase Auth)  
2. Gestion des rôles (admin / membre)  
3. Redirection automatique selon le rôle  

### 👨‍💼 Interface Admin
4. Vue d’ensemble du budget  
5. Résumé des dépenses récentes  
6. Graphiques (revenus vs dépenses)  
7. Suggestions IA automatiques  
8. Navigation vers sous-pages  

### 💰 Transactions (`transactions.html`)
9. Ajout de revenus/dépenses  
10. Modification d’une transaction  
11. Suppression d’une transaction  
12. Tableau filtrable par type / utilisateur  
13. Stockage automatique Firestore  

#### Schéma Firestore
```js
{
  date: "2025-10-29T23:57:19.234Z",
  description: "Allo",
  montant: 200000,
  type: "revenu",
  categorie: "Nourriture",
  utilisateur: "Omran",
  createdAt: serverTimestamp()
}
👥 Utilisateurs (utilisateurs.html)
Ajout manuel d’utilisateurs

Suppression d’utilisateurs

Définition du rôle et du mot de passe

Liste dynamique depuis Firestore

Schéma Firestore
js
Copier le code
{
  nom: "Omran",
  email: "omran@example.com",
  motdepasse: "********",
  role: "admin",
  createdAt: serverTimestamp()
}
📊 Rapports (report.html)
Visualisation des données par utilisateur/catégorie

Graphiques interactifs

Export CSV / PDF

🧠 IA intégrée (ai.html)
L’assistant IA analyse les données financières en temps réel pour :

détecter les excès ou déséquilibres ;

proposer des ajustements personnalisés ;

générer des suggestions automatiques (ex. réduire abonnements inutiles).

Exemples de suggestions :

“Vos dépenses de nourriture ont augmenté de 20% ce mois-ci.”

“Essayez de réduire les sorties de 15% pour équilibrer votre budget.”

💅 Charte visuelle
🎨 Palette
Élément	Valeur
Fond	radial-gradient(circle at top left, #0b0f1d, #020617)
Accent	linear-gradient(90deg,#7c3aed,#06b6d4)
Texte	#e2e8f0
Secondaire	#94a3b8
Bordures	rgba(255,255,255,0.08)

🪞 Style
Effet verre : backdrop-filter: blur(10px)

Ombres douces : box-shadow: 0 8px 25px rgba(0,0,0,0.3)

Bords arrondis : border-radius: 16px

Typo : Manrope, sans-serif

🧩 Interaction entre pages
Page	Rôle
login.html	Authentification (Firebase Auth)
admin.html	Accès central (avec sidebar et iframe)
transactions.html	Gestion CRUD des transactions
utilisateurs.html	Gestion des membres et rôles
report.html	Statistiques et graphiques
ai.html	Suggestions intelligentes

🔄 Évolutions prévues
Auth Firebase complète (login + reset password)

Modification utilisateur via popup

Catégories et filtres avancés

Notifications de dépassement de budget

Mode multi-famille

IA prédictive des dépenses (tendances)

Synchronisation mobile (PWA)

🧠 Contexte pour agents IA
Le Budget Familial est un projet web Firebase en architecture multi-pages.
Chaque page correspond à une fonction spécifique (transactions, utilisateurs, rapports, IA).
Le design suit un thème sobre et luxueux en verre violet-cyan.

L’objectif est d’offrir un système de gestion budgétaire familiale intelligent :

Interface admin centralisée (avec sidebar et iframe)

Transactions CRUD complètes (Firestore)

Gestion des rôles utilisateurs

Analyses et suggestions automatiques (AI)

🧩 Auteur
Projet initié par : Omran
Langages : HTML, CSS, JavaScript
Base de données : Firebase Firestore
Date de démarrage : Octobre 2025

🪶 Licence
Projet éducatif libre — usage personnel autorisé.