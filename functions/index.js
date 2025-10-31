const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');
admin.initializeApp();

exports.analyzeData = functions.https.onRequest(async (req, res) => {
  // CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, X-API-KEY');
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  // Récupérer la question
  let userQuestion = '';
  if (req.method === 'POST') {
    if (req.body && req.body.userQuestion) {
      userQuestion = req.body.userQuestion;
    } else if (req.body && req.body.data && req.body.data.userQuestion) {
      userQuestion = req.body.data.userQuestion;
    }
  } else if (req.method === 'GET') {
    userQuestion = req.query.userQuestion || '';
  }

  // 1. Lire les transactions Firestore
  const txSnap = await admin.firestore().collection('transactions').orderBy('createdAt','desc').limit(50).get();
  const txs = txSnap.docs.map(d => d.data());

  // 2. Construire le contexte
  let resume = '';
  let totalDep = 0, totalRev = 0, perCat = {};
  txs.forEach(t => {
    const montant = Number(t.montant||0);
    if(t.type === 'depense') totalDep += montant; else totalRev += montant;
    perCat[t.categorie] = (perCat[t.categorie]||0) + montant;
  });
  resume = `Dépenses: ${totalDep.toFixed(2)}$, Revenus: ${totalRev.toFixed(2)}$, Catégories: ${Object.entries(perCat).map(([k,v])=>k+':'+v.toFixed(2)+'$').join(', ')}`;

  // 3. Construire le prompt
  const prompt = `Voici le résumé de mes finances: ${resume}\nQuestion: ${userQuestion}\nDonne une réponse claire, concise et des conseils personnalisés.`;

  // 4. Appeler Mistral AI (API agent)
  try {
    const mistralApiKey = functions.config().mistral.key;
    const agentId = "ag_019a378268a9742f88a687d67427184c";
    
    const resp = await fetch('https://api.mistral.ai/v1/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': mistralApiKey
      },
      body: JSON.stringify({
        agent_id: agentId,
        inputs: `Résumé: ${resume}\nQuestion: ${userQuestion}`,
        stream: false
      })
    });

    if (!resp.ok) {
      const errorData = await resp.text();
      console.error('Mistral API error:', errorData);
      throw new Error(`API error: ${resp.status}`);
    }

    const result = await resp.json();
    const answer = result.outputs?.[0] || result.choices?.[0]?.message?.content || "Aucune réponse générée.";
    res.json({ 
      success: true,
      answer,
      context: {
        totalExpenses: totalDep,
        totalRevenue: totalRev,
        categories: perCat
      }
    });
  } catch (error) {
    console.error('Error in analyzeData:', error);
    res.status(500).json({
      success: false,
      error: "Une erreur est survenue lors de l'analyse.",
      details: error.message
    });
  }
});