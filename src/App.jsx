import { useState } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const TEXTES = [
  {
    id: 1,
    numero: "n°1",
    titre: "Dom Juan",
    auteur: "Molière, 1665",
    acte: "Acte II, scène 4",
    oi: "On ne badine pas avec l'amour, Musset, 1834",
    parcours: "Les jeux du cœur et de la parole",
    mouvement_litteraire: "Classicisme — repose sur : Ordre, Sobriété, Mesure. Idéal de l'Homme. Molière, dramaturge du 17e s., écrit pour dénoncer un défaut de caractère.",
    genre: "Comédie — 3 types de comique : de mots (patois ≠ noble de DJ), de geste (aller-retour de DJ entre M et C), de caractère (DJ = caricature du libertin).",
    situation: "Milieu de la pièce. Affrontement entre 2 paysannes qui se disputent DJ → scène de double manipulation pour montrer le pouvoir de la parole de DJ. DJ = séducteur infidèle, prêt à tout pour épouser puis abandonner. Personnage immoral qui provoque Dieu.",
    personnages: "Dom Juan, Sganarelle, Charlotte, Mathurine",
    libertinage: "Du latin libertinus (affranchi). Au 17e s. = quelqu'un qui s'adonne aux plaisirs charnels sans se soucier des règles sociales et religieuses.",
    problematique: "Comment cette scène de double manipulation nous montre-t-elle le pouvoir de la parole de Dom Juan ?",
    mouvements: [
      {
        num: 1,
        titre: "Charlotte et Mathurine exigent la vérité des sentiments de DJ",
        lignes: "l. 1–18",
        couleur: "#6B5CE7",
        couleurL: "#EAE8FD",
        resume: "DJ = séducteur sans scrupule, sur le point d'être démasqué. Il déploie une stratégie en 3 temps pour esquiver : 1) apartés pour isoler et créer un tête-à-tête, 2) esquive les réponses en laissant entendre que l'autre ment, 3) crée de la complicité. Mais ÉCHEC : adverbe « non » (refus de manipulation), 2 formules impersonnelles (nécessité), anaphore (2 paysannes déterminées et impératives).",
        procedes: [
          { lignes: "l. 1–18",  nom: "Stichomythie",           exemple: "Alternance rapide de courtes répliques",                                         effet: "Rythme haché, tension : les femmes mettent DJ au pied du mur. Urgence de la confrontation." },
          { lignes: "l. 1–18",  nom: "Apartés (×2) — strat. 1",exemple: "« Bas, à Charlotte » / « Bas, à Mathurine »",                                   effet: "Isole chaque femme, crée un tête-à-tête artificiel. Double énonciation : le public voit tout, les femmes non." },
          { lignes: "l. 1–18",  nom: "Parallélismes — strat. 2",exemple: "DJ traite les paysannes en toute équité",                                       effet: "Ne fait aucune préférence apparente → chacune se croit l'élue. Esquive les réponses." },
          { lignes: "l. 1–18",  nom: "Complicité — strat. 3",   exemple: "Impression que chaque paysanne est privilégiée",                                effet: "Stratégie de persuasion : chacune pense avoir un avantage sur l'autre." },
          { lignes: "l. 9–10",  nom: "Adverbe + formules imp.",  exemple: "« Non » / « il faut savoir la vérité » / « il est question »",                 effet: "ÉCHEC de DJ : refus de manipulation. Les formules impersonnelles marquent la nécessité — les femmes sont déterminées." },
          { lignes: "l. 11–18", nom: "Anaphore",                 exemple: "Répétition de structures identiques dans les répliques",                        effet: "2 paysannes déterminées et impératives : elles exigent la vérité de façon coordonnée." },
          { lignes: "l. 11–12", nom: "Expressions populaires",   exemple: "« bec jaune » / « rende camuse »",                                             effet: "Registre paysan marqué → contraste social avec DJ. Comique de mots." },
        ]
      },
      {
        num: 2,
        titre: "Tirade de DJ — il reprend le pouvoir de la parole",
        lignes: "l. 19–31",
        couleur: "#0D9E75",
        couleurL: "#DCF5EC",
        resume: "DJ reprend le pouvoir. Question rhétorique initiale pour gagner du temps. Stratégie en 5 temps : 1) ne nomme pas les paysannes (pronoms indéfinis), 2) inverse les rôles (questions rhétoriques), 3) reporte la réponse + maxime générale + antithèse, 4) les rassure (apartés + hyperbole), 5) prend la fuite (prétexte un « ordre »). DJ remporte les jeux du cœur et de la parole.",
        procedes: [
          { lignes: "l. 19–20", nom: "Didascalie + Q. rhét. init.",exemple: "« embarrassé » / « Que voulez-vous que je dise ? »",                          effet: "Embarras feint pour gagner du temps. Q. rhétorique initiale : DJ reprend le contrôle de la parole." },
          { lignes: "l. 20–21", nom: "Pronoms indéfinis — strat. 1",exemple: "« chacune » / « celle » (sans nommer les femmes)",                          effet: "Chacune s'identifie dans le rôle de la promise. DJ ne tranche pas — ambiguïté entretenue volontairement." },
          { lignes: "l. 20–22", nom: "Questions rhét. — strat. 2", exemple: "« Est-ce que chacune de vous ne sait pas… ? » / « Pourquoi m'obliger… ? »",  effet: "Inverse les rôles : au lieu de répondre, suscite la méfiance. Les femmes mises en position d'accusées." },
          { lignes: "l. 24–25", nom: "Maxime générale — strat. 3", exemple: "« les effets décident mieux que les paroles »",                               effet: "Ton du donneur de leçon. Reporte la réponse. Paradoxe : un discours qui décrédibilise la parole." },
          { lignes: "l. 24–25", nom: "Antithèse — strat. 3",       exemple: "Parole vs action (« dire » / « faire »)",                                    effet: "Seule l'action compte selon DJ → repousse la question à plus tard. Ironie dramatique maximale." },
          { lignes: "l. 26–30", nom: "Apartés + hyperbole — strat. 4",exemple: "« Tous les visages sont laids auprès du vôtre »",                          effet: "Rassure chacune en secret. Hyperbole = séduit en flattant. Stratégie de persuasion par les sentiments." },
          { lignes: "l. 30–31", nom: "Prétérition / fuite — strat. 5",exemple: "« J'ai un petit ordre à donner… dans un quart d'heure »",                 effet: "Prétexte un « ordre » pour fuir. Comique de caractère : DJ ne résout rien, il s'esquive." },
        ]
      },
      {
        num: 3,
        titre: "Victoire de DJ → paysannes vaincues",
        lignes: "l. 32–33",
        couleur: "#C0392B",
        couleurL: "#FDECEA",
        resume: "Charlotte : « au moins » (doute). Mathurine : futur de valeur de certitude (conviction totale). Chacune pense avoir gagné. DJ remporte les jeux du cœur et de la parole. La scène se referme sur leur double illusion.",
        procedes: [
          { lignes: "l. 32",    nom: "Futur de certitude",      exemple: "« C'est moi qu'il épousera »",                                                  effet: "Mathurine : conviction absolue. Contraste avec Charlotte (« au moins » = doute). Illusion totale des deux femmes." },
          { lignes: "l. 32–33", nom: "Parallélisme final",       exemple: "« Je suis celle qu'il aime » / « C'est moi qu'il épousera »",                   effet: "DJ remporte les jeux du cœur et de la parole. Double illusion — comique amer, la scène se referme sur leur défaite." },
        ]
      }
    ],
    notions: ["Libertinage","Aparté","Stichomythie","Ironie dramatique","Double énonciation","Comique de caractère","Anaphore","Futur de certitude","Pronoms indéfinis","Questions rhétoriques","Maxime générale","Antithèse","Hyperbole","Scène comique"],
    synthese: "La scène révèle le portrait de DJ : LIBERTIN, MANIPULATEUR, LÂCHE — mais BRILLANT dans la maîtrise de l'éloquence. Molière ne condamne pas son personnage : il le rend admirable par ses qualités d'orateur, séducteur et manipulateur aux yeux du public. DJ remporte les jeux du cœur et de la parole.",
    conseil: "Lire les apartés à voix basse (léger pivot du corps). Bien distinguer les 3 types de comique. Sur l'« embarras » de DJ (l.19) : feint ou réel ? Laisser la question ouverte. Ouverture : raconter la suite (DJ châtié par Dieu) + comparer avec Perdican dans On ne badine pas avec l'amour.",
    conclusion: [
      "SC révèle le portrait de DJ : libertaire, manipulateur, lâche mais brillant dans la maîtrise de l'éloquence.",
      "Intention de Molière : rend DJ admirable par ses qualités d'orateur, de séducteur et de manipulateur — pour le public.",
      "Ouverture : la suite (DJ châtié par Dieu, envoyé en enfer) · comparer avec Perdican (On ne badine pas avec l'amour).",
    ],
  },
  {
    id: 2,
    numero: "n°6",
    titre: "Au Cabaret-Vert",
    auteur: "Rimbaud, 1870",
    acte: "Sonnet · Octobre 1870",
    oi: "Cahiers de Douai, Rimbaud, 1870",
    parcours: "Émancipations créatrices",
    mouvement_litteraire: "Entre Romantisme (influence V. Hugo — vocabulaire familier, métaphore) et Symbolisme naissant (influence Baudelaire — conception symbolique du poème, transfiguration du réel).",
    genre: "Sonnet (2 quatrains + 2 tercets) · Alexandrins · Rimes croisées ABAB/ABAB/CCD/EED. Forme libre issue du 16e s. (Pétrarque). Rythme volontairement déséquilibré : coupes pas au même endroit → émancipation poétique.",
    situation: "1870 : Rimbaud a 16 ans, écrit 22 poèmes lors de ses fugues → envoie à Paul Demeny. Poème daté (Octobre 1870) comme un journal intime/de bord. Rimbaud à Charleroi (Belgique), fugue. Pronom « je » → R se met en scène.",
    personnages: "Le poète-narrateur (Rimbaud) · La serveuse du cabaret",
    libertinage: "",
    problematique: "Comment, à travers ce récit d'une fugue, Rimbaud exprime-t-il son bonheur ?",
    mouvements: [
      {
        num: 1,
        titre: "L'arrivée au Cabaret — poème autobiographique",
        lignes: "v. 1–4",
        couleur: "#6B5CE7",
        couleurL: "#EAE8FD",
        resume: "Poème à caractère autobiographique : poème daté, pronom « je », lexique du vagabondage (errance), « Charleroi » (fugue en Belgique). Liberté renforcée par 2 enjambements. Mise en valeur du Cabaret par antéposition → cocon, havre de paix. Émancipation à la fois familiale et poétique : vocabulaire familier rappelle V. Hugo, rythme volontairement déséquilibré.",
        procedes: [
          { lignes:"v. 1–2", nom:"Lexique du vagabondage", exemple:"« bottines », « cailloux des chemins », « Charleroi »", effet:"Errance, fugue en Belgique. Poème daté = journal de bord. R se met en scène." },
          { lignes:"v. 1–2", nom:"Enjambements (×2)", exemple:"Rejets du v.1 au v.2 et v.3 au v.4", effet:"Liberté renforcée → émancipation poétique, liberté de casser le rythme et de déborder." },
          { lignes:"v. 3",   nom:"Antéposition", exemple:"« Au Cabaret-Vert » en tête de vers et de phrase", effet:"Mise en valeur du Cabaret = lieu central. Auberge = cocon, havre de paix." },
          { lignes:"v. 3–4", nom:"Imparfait du subj.", exemple:"« qui fût à moitié froid »", effet:"R prend confiance, s'émancipe de l'enfance → entrée dans l'âge adulte." },
          { lignes:"v. 3–4", nom:"Vocabulaire familier", exemple:"« tartines », « beurre », « jambon »", effet:"Rappelle V. Hugo — R encore sous son influence. Récit d'émancipation familiale ET poétique." },
          { lignes:"v. 5",   nom:"Rejet + antéposition", exemple:"« Bienheureux, j'allongeai les jambes… »", effet:"« Bienheureux » antéposé, liberté matérialisée par le rejet → liberté de casser le rythme et de déborder." },
        ]
      },
      {
        num: 2,
        titre: "Intervention de la serveuse — désir fantasmé",
        lignes: "v. 5–11",
        couleur: "#0D9E75",
        couleurL: "#DCF5EC",
        resume: "Désir fantasmé : hyperbole « adorable » (terme religieux et excessif) → naissance du désir. Périphrase → désir charnel et provocateur. Pronom démonstratif → très péjoratif. Adjectif « niaise » confirme. Audace poétique : non-respect de la Volta, tirets au v.9 rompent la fluidité → impression de conversation orale. R s'émancipe d'une tutelle morale, brave les règles du sonnet.",
        procedes: [
          { lignes:"v. 7",    nom:"Hyperbole", exemple:"« adorable » — terme religieux et excessif", effet:"Naissance du désir. Terme à valeur divine détourné → désir charnel et provocation." },
          { lignes:"v. 7–8",  nom:"Périphrase", exemple:"« la fille aux tétons énormes, aux yeux vifs »", effet:"Désir charnel et provocateur : évoque en 1 la poitrine, en 2 les yeux → intensité du désir." },
          { lignes:"v. 9",    nom:"Pronom démonstratif", exemple:"« Celle-là » — très péjoratif", effet:"Désir présenté comme réalisable. R rend le lecteur complice de sa séduction." },
          { lignes:"v. 9",    nom:"Adjectif péjoratif", exemple:"« niaise »", effet:"Confirme la posture de séducteur — serveuse = fille facile laissée entendre au lecteur." },
          { lignes:"v. 9",    nom:"Non-respect de la Volta", exemple:"Changement de sujet sans marquage", effet:"Audace poétique — R s'émancipe d'une tutelle morale, brave les règles du sonnet." },
          { lignes:"v. 9",    nom:"Tirets (×2)", exemple:"« – Celle-là, ce n'est pas… ! – »", effet:"Rompent la fluidité → déconstruire la phrase → impression de conversation orale spontanée." },
        ]
      },
      {
        num: 3,
        titre: "Accès au bonheur — transfiguration par les synesthésies",
        lignes: "v. 12–14",
        couleur: "#C0392B",
        couleurL: "#FDECEA",
        resume: "Le plaisir repose avant tout sur la nourriture. R transmet le plaisir avec 4 sens mêlés : Goût / Toucher / Vue / Odorat → le plat devient tableau (synesthésies). Les synesthésies permettent d'accéder à un monde supérieur : passage d'une réalité matérielle/terrestre à un monde idéal et céleste. R crée une illumination qui transfigure le réel → conception symboliste du poème (Baudelaire).",
        procedes: [
          { lignes:"v. 12–14", nom:"Synesthésies (4 sens)", exemple:"Goût / Toucher / Vue / Odorat — « jambon rose et blanc parfumé »", effet:"R transmet le plaisir par 4 sens mêlés. Le plat → tableau. Mélange des sens = synesthésie." },
          { lignes:"v. 12–13", nom:"Synesthésie 1", exemple:"Jambon : vue + odorat + goût", effet:"Passage d'une réalité matérielle et terrestre vers un monde idéal et céleste." },
          { lignes:"v. 13–14", nom:"Synesthésie 2", exemple:"Bière : toucher + vue (« mousse », « dorait »)", effet:"R crée une illumination qui transfigure le réel — conception symboliste du poème." },
          { lignes:"v. 14",    nom:"Métaphore symboliste", exemple:"« Que dorait un rayon de soleil arriéré »", effet:"Symbolisme (Baudelaire) : le poète déchiffre les symboles cachés. Transfiguration du réel." },
        ]
      }
    ],
    notions: ["Sonnet","Enjambement","Antéposition","Rejet","Synesthésie","Symbolisme","Hyperbole","Périphrase","Pronom démonstratif","Volta","Autobiographique","Vagabondage","Émancipation","Auto-dérision"],
    synthese: "À travers le récit de sa fugue, Rimbaud s'émancipe sur le plan familial (du père et de l'enjambement) et poétique (de V. Hugo par la métaphore, de Baudelaire par la conception symbolique). Le Cabaret-Vert, havre de paix, devient le lieu d'une triple émancipation : corporelle (plaisir des sens), amoureuse (désir fantasmé) et poétique (transfiguration du réel par les synesthésies).",
    conseil: "Bien distinguer les 3 types de bonheur (errance/liberté, désir, transfiguration). Insister sur la forme : sonnet à forme libre = déjà une émancipation poétique en soi. Sur les synesthésies : montrer le passage du matériel au céleste. Lien parcours : émancipations créatrices = R s'émancipe à la fois comme homme et comme poète.",
    conclusion: [
      "R s'émancipe sur le plan familial (du père, de l'enjambement) et poétique (V. Hugo, Baudelaire).",
      "Le bonheur s'exprime en 3 registres : errance/liberté, désir charnel, transfiguration symboliste.",
      "Ouvertures : influence V. Hugo (métaphore) et Baudelaire (symbolisme). Comparer avec d'autres poèmes du parcours Émancipations créatrices.",
    ],
  }
];

// ── UTILS ─────────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function getAllProcedes(texte) {
  return texte.mouvements.flatMap(m =>
    m.procedes.map(p => ({ ...p, mouvement: m.num, mouvTitre: m.titre, couleur: m.couleur, couleurL: m.couleurL }))
  );
}

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const C = {
  bg: "#0f0e17", surface: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.1)",
  violet: "#6B5CE7", violetL: "rgba(107,92,231,0.15)", violetB: "rgba(107,92,231,0.4)",
  teal: "#0D9E75", tealL: "rgba(13,158,117,0.12)", tealB: "rgba(13,158,117,0.35)",
  red: "#C0392B", redL: "rgba(192,57,43,0.12)", redB: "rgba(192,57,43,0.35)",
  text: "#fffffe", muted: "rgba(255,255,255,0.5)", hint: "rgba(255,255,255,0.3)",
};

const btn = (bg, border, color="#fffffe") => ({
  display:"block", width:"100%", padding:"13px", borderRadius:12,
  fontSize:14, fontWeight:"bold", cursor:"pointer",
  border:`1px solid ${border}`, background:bg, color,
  marginTop:10, fontFamily:"Georgia,serif",
});
const card = (extra={}) => ({
  background: C.surface, border:`1px solid ${C.border}`,
  borderRadius:14, padding:"14px 16px", marginBottom:10, ...extra
});
const pbar = { height:3, borderRadius:3, background:"rgba(255,255,255,0.1)", marginBottom:14, overflow:"hidden" };
const pfill = (pct, color=C.violet) => ({ height:"100%", borderRadius:3, background:color, width:`${pct}%`, transition:"width 0.3s" });
const badge = (color, bgColor) => ({
  display:"inline-block", fontSize:10, fontWeight:"bold", letterSpacing:"0.07em",
  textTransform:"uppercase", padding:"2px 8px", borderRadius:20,
  background:bgColor, color, marginBottom:6,
});
const sectionLabel = {
  fontSize:11, letterSpacing:"0.08em", textTransform:"uppercase",
  color:C.hint, marginBottom:10,
};

// ── SCORE SCREEN ───────────────────────────────────────────────────────────────
function Score({ correct, total, onBack, onRetry }) {
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const color = pct >= 80 ? C.teal : pct >= 50 ? "#D97706" : C.red;
  return (
    <div style={{ padding:"24px 20px", textAlign:"center" }}>
      <div style={{ fontSize:56, fontWeight:"bold", color, marginBottom:4 }}>{pct}%</div>
      <div style={{ fontSize:14, color:C.muted, marginBottom:28 }}>{correct} / {total} réussis</div>
      {onRetry && <button style={btn(C.violetL, C.violetB)} onClick={onRetry}>Recommencer</button>}
      <button style={btn("rgba(255,255,255,0.06)", C.border)} onClick={onBack}>← Retour au menu</button>
    </div>
  );
}

// ── FICHE TEXTE ───────────────────────────────────────────────────────────────
function FicheTexte({ texte, onBack }) {
  const [section, setSection] = useState("contexte");
  const tabs = [
    { id:"contexte", label:"Contexte" },
    { id:"plan",     label:"Plan" },
    { id:"procedes", label:"Procédés" },
    { id:"bilan",    label:"Bilan" },
  ];

  const mouv_colors = [C.violet, C.teal, C.red, "#D97706", "#2563EB"];

  return (
    <div>
      {/* Tab bar */}
      <div style={{
        display:"flex", borderBottom:`1px solid ${C.border}`,
        background:"rgba(0,0,0,0.3)", overflowX:"auto",
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setSection(t.id)} style={{
            flex:1, padding:"11px 6px", fontSize:12, fontWeight:"bold",
            border:"none", background:"none", cursor:"pointer", fontFamily:"Georgia,serif",
            color: section === t.id ? C.violet : C.muted,
            borderBottom: section === t.id ? `2px solid ${C.violet}` : "2px solid transparent",
            transition:"all 0.15s", whiteSpace:"nowrap",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding:"16px 18px", paddingBottom:32 }}>

        {/* ── CONTEXTE ── */}
        {section === "contexte" && (
          <div>
            {/* Header info card */}
            <div style={{ ...card(), borderLeft:`3px solid ${C.violet}`, borderRadius:"0 12px 12px 0", marginBottom:16 }}>
              <div style={{ fontSize:11, color:C.hint, marginBottom:2, textTransform:"uppercase", letterSpacing:"0.06em" }}>Œuvre intégrale</div>
              <div style={{ fontSize:12, color:C.muted, fontStyle:"italic", marginBottom:8 }}>{texte.oi}</div>
              <div style={{ fontSize:11, color:C.hint, marginBottom:2, textTransform:"uppercase", letterSpacing:"0.06em" }}>Parcours associé</div>
              <div style={{ fontSize:13, color:C.text, fontStyle:"italic" }}>{texte.parcours}</div>
            </div>

            {[
              { label:"Mouvement littéraire", val: texte.mouvement_litteraire },
              { label:"Genre & registres",    val: texte.genre },
              { label:"Personnages",           val: texte.personnages },
              { label:"Situation du texte",    val: texte.situation },
            ].map(row => (
              <div key={row.label} style={{ ...card(), marginBottom:8 }}>
                <div style={{ fontSize:10, letterSpacing:"0.07em", textTransform:"uppercase", color:C.hint, marginBottom:5 }}>{row.label}</div>
                <div style={{ fontSize:13, color:C.text, lineHeight:1.55 }}>{row.val}</div>
              </div>
            ))}

            {/* Problématique */}
            <div style={{ background:C.violetL, border:`1px solid ${C.violetB}`, borderLeft:`4px solid ${C.violet}`, borderRadius:"0 12px 12px 0", padding:"14px 16px", marginTop:6 }}>
              <div style={{ fontSize:10, letterSpacing:"0.08em", textTransform:"uppercase", color:C.violet, marginBottom:8 }}>Problématique</div>
              <div style={{ fontSize:14, fontStyle:"italic", color:"#c4bbff", lineHeight:1.55 }}>{texte.problematique}</div>
            </div>
          </div>
        )}

        {/* ── PLAN ── */}
        {section === "plan" && (
          <div>
            <div style={{ fontSize:12, color:C.muted, marginBottom:14, lineHeight:1.5 }}>
              Plan en {texte.mouvements.length} mouvements — à restituer dans l'ordre à l'oral.
            </div>
            {texte.mouvements.map((m, i) => (
              <div key={m.num} style={{ ...card(), borderLeft:`4px solid ${m.couleur}`, borderRadius:"0 12px 12px 0", marginBottom:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                  <div style={{
                    width:24, height:24, borderRadius:"50%", background:m.couleur,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:12, fontWeight:"bold", color:"white", flexShrink:0,
                  }}>{m.num}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:"bold", color:C.text, lineHeight:1.3 }}>{m.titre}</div>
                    <div style={{ fontSize:11, color:m.couleur, marginTop:2 }}>{m.lignes}</div>
                  </div>
                </div>
                <div style={{ fontSize:12, color:C.muted, lineHeight:1.55 }}>{m.resume}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── PROCÉDÉS ── */}
        {section === "procedes" && (
          <div>
            {texte.mouvements.map(m => (
              <div key={m.num} style={{ marginBottom:20 }}>
                {/* Mouvement header */}
                <div style={{
                  display:"flex", alignItems:"center", gap:8, marginBottom:10,
                  padding:"8px 12px", background:`${m.couleur}22`,
                  borderRadius:10, border:`1px solid ${m.couleur}44`,
                }}>
                  <div style={{
                    width:20, height:20, borderRadius:"50%", background:m.couleur,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:11, fontWeight:"bold", color:"white", flexShrink:0,
                  }}>{m.num}</div>
                  <div style={{ fontSize:12, fontWeight:"bold", color:C.text }}>{m.titre}</div>
                  <div style={{ marginLeft:"auto", fontSize:11, color:m.couleur }}>{m.lignes}</div>
                </div>

                {m.procedes.map((p, i) => (
                  <div key={i} style={{ ...card({ marginBottom:8, padding:"12px 14px" }) }}>
                    <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:6 }}>
                      <div style={{ fontSize:13, fontWeight:"bold", color:m.couleur }}>{p.nom}</div>
                      <div style={{ fontSize:10, color:C.hint }}>{p.lignes}</div>
                    </div>
                    <div style={{
                      fontSize:12, fontStyle:"italic", color:C.muted,
                      background:"rgba(255,255,255,0.04)", borderLeft:`2px solid ${m.couleur}66`,
                      padding:"6px 10px", borderRadius:"0 6px 6px 0",
                      marginBottom:6, lineHeight:1.4,
                    }}>{p.exemple}</div>
                    <div style={{ fontSize:12, color:C.text, lineHeight:1.5 }}>
                      <span style={{ color:C.teal, fontWeight:"bold" }}>→ </span>{p.effet}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── BILAN ── */}
        {section === "bilan" && (
          <div>
            {/* Synthèse / réponse à la problématique */}
            <div style={{ ...card({ borderLeft:`4px solid ${C.violet}`, borderRadius:"0 12px 12px 0" }), marginBottom:12 }}>
              <div style={{ fontSize:10, letterSpacing:"0.08em", textTransform:"uppercase", color:C.violet, marginBottom:8 }}>Réponse à la problématique</div>
              <div style={{ fontSize:13, color:C.text, lineHeight:1.6 }}>{texte.synthese}</div>
            </div>

            {/* Conclusion en 3 points */}
            {texte.conclusion && (
              <div style={{ marginBottom:14 }}>
                <div style={{ ...sectionLabel, marginBottom:8 }}>Conclusion — 3 points</div>
                {texte.conclusion.map((pt, i) => (
                  <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:8 }}>
                    <div style={{
                      width:20, height:20, borderRadius:"50%", background:C.teal, flexShrink:0,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:11, fontWeight:"bold", color:"white",
                    }}>{i+1}</div>
                    <div style={{ fontSize:13, color:C.text, lineHeight:1.55 }}>{pt}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Notions */}
            <div style={{ marginBottom:14 }}>
              <div style={{ ...sectionLabel, marginBottom:8 }}>Notions à maîtriser</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {texte.notions.map(n => (
                  <span key={n} style={{
                    fontSize:12, fontWeight:"bold", padding:"4px 10px", borderRadius:20,
                    background:C.violetL, color:"#c4bbff", border:`1px solid ${C.violetB}`,
                  }}>{n}</span>
                ))}
              </div>
            </div>

            {/* Conseil oral */}
            <div style={{ background:C.tealL, border:`1px solid ${C.tealB}`, borderLeft:`4px solid ${C.teal}`, borderRadius:"0 12px 12px 0", padding:"14px 16px" }}>
              <div style={{ fontSize:10, letterSpacing:"0.08em", textTransform:"uppercase", color:C.teal, marginBottom:8 }}>Conseils oral</div>
              <div style={{ fontSize:13, color:"#a8f0db", lineHeight:1.6 }}>{texte.conseil}</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ── MODE FLASHCARDS ────────────────────────────────────────────────────────────
function ModeFlashcards({ texte, onBack }) {
  const all = getAllProcedes(texte);
  const [cards] = useState(() => shuffle(all));
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [scores, setScores] = useState({ ok:0, ko:0 });
  const [done, setDone] = useState(false);

  const c = cards[idx];
  function answer(ok) {
    setScores(s => ({ ...s, [ok?"ok":"ko"]: s[ok?"ok":"ko"] + 1 }));
    if (idx + 1 >= cards.length) { setDone(true); return; }
    setIdx(i => i + 1); setFlipped(false);
  }
  function restart() { setIdx(0); setFlipped(false); setScores({ok:0,ko:0}); setDone(false); }

  if (done) return <Score correct={scores.ok} total={cards.length} onBack={onBack} onRetry={restart} />;

  return (
    <div style={{ padding:"16px" }}>
      <div style={pbar}><div style={pfill((idx/cards.length)*100)} /></div>
      <div style={{ fontSize:11, color:C.hint, textAlign:"right", marginBottom:14 }}>{idx+1} / {cards.length}</div>

      <div onClick={() => setFlipped(f=>!f)} style={{
        background: flipped ? C.violetL : C.surface,
        border: `1px solid ${flipped ? C.violetB : C.border}`,
        borderRadius:18, padding:"22px 18px", minHeight:200,
        cursor:"pointer", transition:"all 0.2s", marginBottom:14,
      }}>
        <div style={badge(c.couleur, c.couleurL+"55")}>M{c.mouvement} · {c.lignes}</div>
        <div style={{ fontSize:18, fontWeight:"bold", color:C.text, marginBottom:8 }}>{c.nom}</div>
        <div style={{ fontSize:13, fontStyle:"italic", color:C.muted, lineHeight:1.5, marginBottom: flipped?14:0 }}>{c.exemple}</div>
        {flipped ? (
          <div style={{ background:"rgba(107,92,231,0.1)", border:`1px solid ${C.violetB}`, borderRadius:10, padding:"12px 14px" }}>
            <div style={{ fontSize:10, letterSpacing:"0.06em", textTransform:"uppercase", color:C.violet, marginBottom:6 }}>Effet</div>
            <div style={{ fontSize:13, color:C.text, lineHeight:1.5 }}>{c.effet}</div>
          </div>
        ) : (
          <div style={{ textAlign:"center", fontSize:11, color:C.hint, marginTop:14 }}>Appuie pour voir l'effet</div>
        )}
      </div>

      {flipped && (
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          <button style={{ ...btn(C.redL, C.redB), marginTop:0 }} onClick={() => answer(false)}>✗ À revoir</button>
          <button style={{ ...btn(C.tealL, C.tealB), marginTop:0 }} onClick={() => answer(true)}>✓ Je sais</button>
        </div>
      )}
    </div>
  );
}

// ── MODE ORDRE ─────────────────────────────────────────────────────────────────
// ── GÉNÉRATEUR QCM ────────────────────────────────────────────────────────────
function generateQCM(texte) {
  const questions = [];
  const all = getAllProcedes(texte);

  questions.push({
    question: "Quelle est la problématique de ce texte ?",
    correct: texte.problematique,
    choices: shuffle([texte.problematique,
      "Comment Molière dénonce-t-il les abus de la noblesse à travers Dom Juan ?",
      "En quoi Dom Juan est-il une figure tragique condamnée par la société ?",
      "Comment le comique de situation permet-il de critiquer le mariage au 17e s. ?"]),
    explication: "La problématique cible l'enjeu précis du texte : la double manipulation et le pouvoir de la parole.",
  });

  questions.push({
    question: "À quel mouvement littéraire appartient Molière ?",
    correct: "Le Classicisme",
    choices: shuffle(["Le Classicisme", "Le Romantisme", "Le Réalisme", "Les Lumières"]),
    explication: "Molière (1622-1673) est un auteur classique : ses oeuvres reposent sur l'Ordre, la Sobriété et la Mesure.",
  });

  questions.push({
    question: "Quel est le registre principal de cette scène ?",
    correct: "Comique et satirique",
    choices: shuffle(["Comique et satirique", "Tragique et pathétique", "Lyrique et élégiaque", "Épique et héroïque"]),
    explication: texte.genre,
  });

  questions.push({
    question: "Quel est le titre du mouvement 1 (" + texte.mouvements[0].lignes + ") ?",
    correct: texte.mouvements[0].titre,
    choices: shuffle([
      texte.mouvements[0].titre,
      texte.mouvements[1].titre,
      texte.mouvements.length > 2 ? texte.mouvements[2].titre : "La réconciliation des deux femmes",
      "La fuite de Dom Juan face aux accusations",
    ]),
    explication: texte.mouvements[0].resume.slice(0, 120) + "...",
  });

  questions.push({
    question: "Quel est le titre du mouvement 2 (" + texte.mouvements[1].lignes + ") ?",
    correct: texte.mouvements[1].titre,
    choices: shuffle([
      texte.mouvements[1].titre,
      texte.mouvements[0].titre,
      "Le silence de Sganarelle face à la manipulation",
      "La révélation de la vérité par les paysannes",
    ]),
    explication: texte.mouvements[1].resume.slice(0, 120) + "...",
  });

  const p1 = all[0];
  const distracteurs1 = all.filter(p => p.nom !== p1.nom);
  questions.push({
    question: "Quel est l'effet de la " + p1.nom + " (" + p1.lignes + ") ?",
    correct: p1.effet,
    choices: shuffle([p1.effet, distracteurs1[1].effet, distracteurs1[3].effet, distracteurs1[5] ? distracteurs1[5].effet : distracteurs1[0].effet]),
    explication: "Exemple : " + p1.exemple,
  });

  const p2 = all[Math.floor(all.length / 2)];
  const autresNoms = [...new Set(all.filter(p => p.nom !== p2.nom).map(p => p.nom))];
  questions.push({
    question: "Comment s'appelle ce procédé : " + p2.exemple.slice(0, 60) + "... (" + p2.lignes + ") ?",
    correct: p2.nom,
    choices: shuffle([p2.nom, autresNoms[0], autresNoms[2] || "Métaphore filée", autresNoms[4] || "Euphémisme"]),
    explication: p2.effet,
  });

  questions.push({
    question: "Que signifie 'libertin' au 17e siècle ?",
    correct: "Quelqu'un qui s'adonne aux plaisirs sans se soucier des règles sociales et religieuses",
    choices: shuffle([
      "Quelqu'un qui s'adonne aux plaisirs sans se soucier des règles sociales et religieuses",
      "Un noble qui refuse de se marier par conviction philosophique",
      "Un personnage de comédie jouant le rôle du valet rusé",
      "Un auteur écrivant sans respecter les règles de la bienséance",
    ]),
    explication: "Du latin libertinus (affranchi). Au 17e s., le libertin transgresse les normes morales, sociales et religieuses.",
  });

  questions.push({
    question: "Qu'est-ce que la double énonciation ?",
    correct: "Les personnages se parlent entre eux ET simultanément au public",
    choices: shuffle([
      "Les personnages se parlent entre eux ET simultanément au public",
      "Deux personnages prononcent la même réplique en même temps",
      "Un personnage parle à voix haute et à voix basse dans la même scène",
      "Le narrateur intervient pour commenter les actions des personnages",
    ]),
    explication: "Ici, les apartés de DJ : les femmes n'entendent pas, le public voit tout - ironie dramatique maximale.",
  });

  questions.push({
    question: "Quel procédé clôt la scène (l. 32-33) et quel est son effet ?",
    correct: "Parallélisme final - symétrie ironique : chacune croit avoir gagné, les deux restent dans l'illusion",
    choices: shuffle([
      "Parallélisme final - symétrie ironique : chacune croit avoir gagné, les deux restent dans l'illusion",
      "Antithèse finale - DJ révèle enfin la vérité à l'une des deux femmes",
      "Stichomythie - les deux femmes s'affrontent une dernière fois devant DJ",
      "Aparté - DJ confie au public son vrai choix entre Charlotte et Mathurine",
    ]),
    explication: "Charlotte : 'au moins' (doute). Mathurine : futur de certitude. DJ remporte les jeux du coeur et de la parole.",
  });

  return shuffle(questions);
}

// ── MODE QCM ───────────────────────────────────────────────────────────────────
function ModeQCM({ texte, onBack }) {
  const [questions] = useState(() => generateQCM(texte));
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [scores, setScores] = useState({ ok:0, ko:0 });
  const [done, setDone] = useState(false);

  const q = questions[idx];
  const isCorrect = chosen === q.correct;

  function pick(choice) { if (chosen !== null) return; setChosen(choice); }
  function next() {
    setScores(s => ({ ...s, [isCorrect?"ok":"ko"]: s[isCorrect?"ok":"ko"]+1 }));
    if (idx + 1 >= questions.length) { setDone(true); return; }
    setIdx(i => i+1); setChosen(null);
  }
  function restart() { setIdx(0); setChosen(null); setScores({ok:0,ko:0}); setDone(false); }

  if (done) return <Score correct={scores.ok} total={questions.length} onBack={onBack} onRetry={restart} />;

  return (
    <div style={{ padding:"16px" }}>
      <div style={pbar}><div style={pfill((idx/questions.length)*100)} /></div>
      <div style={{ fontSize:11, color:C.hint, textAlign:"right", marginBottom:14 }}>Question {idx+1} / {questions.length}</div>

      <div style={{ ...card({ marginBottom:16, padding:"18px" }) }}>
        <div style={{ fontSize:11, letterSpacing:"0.07em", textTransform:"uppercase", color:C.hint, marginBottom:8 }}>Quiz</div>
        <div style={{ fontSize:15, fontWeight:"bold", color:C.text, lineHeight:1.5 }}>{q.question}</div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
        {q.choices.map((choice, i) => {
          const isPicked = chosen === choice;
          const isRight = chosen !== null && choice === q.correct;
          const isWrong = isPicked && !isRight;
          return (
            <div key={i} onClick={() => pick(choice)} style={{
              ...card({
                cursor: chosen ? "default" : "pointer", padding:"12px 16px",
                borderColor: isRight ? C.teal : isWrong ? C.red : C.border,
                background: isRight ? C.tealL : isWrong ? C.redL : C.surface,
                transition:"all 0.15s",
              })
            }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                <div style={{
                  width:22, height:22, borderRadius:"50%", flexShrink:0, marginTop:1,
                  border: `1.5px solid ${isRight ? C.teal : isWrong ? C.red : C.border}`,
                  background: isRight ? C.teal : isWrong ? C.red : "transparent",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:10, fontWeight:"bold",
                  color: (isRight || isWrong) ? "white" : C.hint,
                }}>
                  {isRight ? "✓" : isWrong ? "✗" : ["A","B","C","D"][i]}
                </div>
                <div style={{ fontSize:13, color: isRight ? "#064E3B" : isWrong ? "#7B1A1A" : C.text, lineHeight:1.5 }}>
                  {choice}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {chosen !== null && (
        <>
          <div style={{
            background: isCorrect ? C.tealL : C.redL,
            border: `1px solid ${isCorrect ? C.tealB : C.redB}`,
            borderLeft: `4px solid ${isCorrect ? C.teal : C.red}`,
            borderRadius:"0 10px 10px 0", padding:"10px 14px", marginBottom:12,
            fontSize:12, color: isCorrect ? "#064E3B" : "#7B1A1A", lineHeight:1.5,
          }}>
            <div style={{ fontWeight:"bold", marginBottom:4 }}>{isCorrect ? "Correct !" : "Pas tout à fait."}</div>
            {q.explication}
          </div>
          <button style={btn(C.violetL, C.violetB)} onClick={next}>
            {idx + 1 >= questions.length ? "Voir mon score" : "Question suivante"}
          </button>
        </>
      )}
    </div>
  );
}

function ModeMouvement({ texte, onBack }) {
  const all = getAllProcedes(texte);
  const [cards] = useState(() => shuffle(all));
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [scores, setScores] = useState({ ok:0, ko:0 });
  const [done, setDone] = useState(false);

  const c = cards[idx];
  const isCorrect = chosen === c.mouvement;

  function pick(num) {
    if (chosen !== null) return;
    setChosen(num);
  }
  function next() {
    setScores(s => ({ ...s, [isCorrect?"ok":"ko"]: s[isCorrect?"ok":"ko"]+1 }));
    if (idx + 1 >= cards.length) { setDone(true); return; }
    setIdx(i => i+1); setChosen(null);
  }
  function restart() { setIdx(0); setChosen(null); setScores({ok:0,ko:0}); setDone(false); }

  if (done) return <Score correct={scores.ok} total={cards.length} onBack={onBack} onRetry={restart} />;

  return (
    <div style={{ padding:"16px" }}>
      <div style={pbar}><div style={pfill((idx/cards.length)*100)} /></div>
      <div style={{ fontSize:11, color:C.hint, textAlign:"right", marginBottom:14 }}>{idx+1} / {cards.length}</div>

      <div style={{ ...card({ marginBottom:20, padding:"20px 18px" }) }}>
        <div style={{ fontSize:11, letterSpacing:"0.07em", textTransform:"uppercase", color:C.hint, marginBottom:10 }}>Dans quel mouvement ?</div>
        <div style={{ fontSize:18, fontWeight:"bold", color:C.text, marginBottom:8 }}>{c.nom}</div>
        <div style={{ fontSize:13, fontStyle:"italic", color:C.muted, lineHeight:1.5 }}>{c.exemple}</div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
        {texte.mouvements.map(m => {
          const isPicked = chosen === m.num;
          const isRight = chosen !== null && m.num === c.mouvement;
          const isWrong = isPicked && !isRight;
          return (
            <div key={m.num} onClick={() => pick(m.num)} style={{
              ...card({
                cursor: chosen ? "default" : "pointer",
                padding:"12px 16px",
                borderColor: isRight ? C.teal : isWrong ? C.red : isPicked ? C.violet : C.border,
                background: isRight ? C.tealL : isWrong ? C.redL : isPicked ? C.violetL : C.surface,
                transition:"all 0.2s",
              })
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{
                  width:22, height:22, borderRadius:"50%", flexShrink:0,
                  background: isRight ? C.teal : isWrong ? C.red : m.couleur,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:11, fontWeight:"bold", color:"white",
                }}>{m.num}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:12, fontWeight:"bold", color:C.text }}>{m.titre}</div>
                  <div style={{ fontSize:11, color:C.hint, marginTop:2 }}>{m.lignes}</div>
                </div>
                {isRight && <div style={{ fontSize:18, color:C.teal }}>✓</div>}
                {isWrong && <div style={{ fontSize:18, color:C.red }}>✗</div>}
              </div>
            </div>
          );
        })}
      </div>

      {chosen !== null && (
        <>
          <div style={{
            background: isCorrect ? C.tealL : C.redL,
            border: `1px solid ${isCorrect ? C.tealB : C.redB}`,
            borderRadius:10, padding:"10px 14px", marginBottom:12,
            fontSize:13, color: isCorrect ? "#064E3B" : "#7B1A1A", lineHeight:1.5,
          }}>
            {isCorrect
              ? `Correct ! Ce procédé appartient bien au mouvement ${c.mouvement} : "${texte.mouvements.find(m=>m.num===c.mouvement)?.titre}".`
              : `Pas tout à fait. Ce procédé appartient au mouvement ${c.mouvement} : "${texte.mouvements.find(m=>m.num===c.mouvement)?.titre}".`
            }
          </div>
          <button style={btn(C.violetL, C.violetB)} onClick={next}>
            {idx + 1 >= cards.length ? "Voir mon score" : "Procédé suivant →"}
          </button>
        </>
      )}
    </div>
  );
}


// ── MODE EXAMINATEUR ───────────────────────────────────────────────────────────
const EXAM_Q = [
  { q:"Quelle est la problématique de ce texte ?", a:"Comment cette scène de double manipulation nous montre-t-elle le pouvoir de la parole de Dom Juan ?" },
  { q:"Qu'est-ce que le libertinage au 17e siècle ?", a:"Du latin libertinus (affranchi). Au 17e s. = quelqu'un qui s'adonne aux plaisirs charnels sans se soucier des règles sociales et religieuses. DJ en est la figure archétypale : séducteur infidèle, prêt à tout pour épouser puis abandonner." },
  { q:"Quelle est la stratégie de DJ dans le mouvement 1 ? Cite ses 3 étapes.", a:"DJ sur le point d'être démasqué déploie 3 étapes : 1) apartés pour isoler et créer un tête-à-tête, 2) esquive les réponses en laissant entendre que l'autre ment, 3) crée de la complicité pour que chacune se croie privilégiée." },
  { q:"Pourquoi la stratégie du mouvement 1 échoue-t-elle ? Cite les procédés.", a:"ÉCHEC : adverbe « non » (refus de manipulation), 2 formules impersonnelles (« il faut savoir la vérité » = nécessité) et anaphore → 2 paysannes déterminées et impératives qui tiennent bon." },
  { q:"Quels sont les 5 temps de la stratégie de DJ dans le mouvement 2 ?", a:"1) Ne nomme pas les paysannes (pronoms indéfinis → chacune s'identifie en la promise), 2) inverse les rôles (questions rhétoriques), 3) reporte la réponse + maxime générale + antithèse, 4) les rassure (apartés + hyperbole flatteuse), 5) prend la fuite (prétexte un « ordre »)." },
  { q:"Qu'est-ce que la double énonciation ? Exemple ici.", a:"Les personnages se parlent entre eux ET au public. Ici, les apartés de DJ : les femmes n'entendent pas, le public voit tout → ironie dramatique maximale. Le spectateur sait ce que chaque paysanne ignore." },
  { q:"Quel est l'effet de la maxime générale (l. 24-25) ? Cite et explique.", a:"« Les effets décident mieux que les paroles » — ton du donneur de leçon. Paradoxe : c'est un discours qui décrédibilise la parole. Antithèse parole/action. DJ reporte la question à plus tard — ironie dramatique." },
  { q:"Cite les 3 types de comique présents dans la scène.", a:"Comique de mots (patois des paysannes ≠ langage noble de DJ), comique de geste (aller-retour de DJ entre M et C), comique de caractère (DJ = caricature du libertin prêt à épouser n'importe qui)." },
  { q:"Comment expliquer le futur dans la réplique finale de Mathurine (l. 33) ?", a:"Futur de valeur de certitude : « C'est moi qu'il épousera » — Mathurine est convaincue d'avoir gagné. Contraste avec Charlotte (« au moins » = doute). DJ remporte les jeux du cœur et de la parole — les deux restent dans leur double illusion." },
  { q:"Quelle est l'intention de Molière dans cette scène ? Comment conclure ?", a:"1) SC révèle portrait de DJ : libertin, manipulateur, lâche mais brillant orateur. 2) Molière ne condamne pas son personnage : il le rend admirable par l'éloquence et la séduction pour le public. 3) Ouverture : DJ châtié par Dieu à la fin / comparer avec Perdican (On ne badine pas)." },
];

function ModeExaminateur({ texte, onBack }) {
  const [qs] = useState(() => shuffle(EXAM_Q));
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);
  const [scores, setScores] = useState({ ok:0, ko:0 });
  const [done, setDone] = useState(false);

  const q = qs[idx];
  function ans(ok) {
    setScores(s => ({...s, [ok?"ok":"ko"]: s[ok?"ok":"ko"]+1}));
    if (idx+1 >= qs.length) { setDone(true); return; }
    setIdx(i=>i+1); setShow(false);
  }
  function restart() { setIdx(0); setShow(false); setScores({ok:0,ko:0}); setDone(false); }

  if (done) return <Score correct={scores.ok} total={qs.length} onBack={onBack} onRetry={restart} />;

  return (
    <div style={{ padding:"16px" }}>
      <div style={pbar}><div style={pfill((idx/qs.length)*100)} /></div>
      <div style={{ fontSize:11, color:C.hint, textAlign:"right", marginBottom:14 }}>Question {idx+1} / {qs.length}</div>
      <div style={{ background:C.violetL, border:`1px solid ${C.violetB}`, borderRadius:14, padding:"16px 18px", marginBottom:14 }}>
        <div style={{ fontSize:11, color:"#a89ff0", fontStyle:"italic", marginBottom:8 }}>Question de l'examinateur</div>
        <div style={{ fontSize:15, color:C.text, lineHeight:1.5, fontStyle:"italic" }}>« {q.q} »</div>
      </div>
      {show ? (
        <>
          <div style={{ background:C.tealL, border:`1px solid ${C.tealB}`, borderRadius:12, padding:"14px 16px", marginBottom:14 }}>
            <div style={{ fontSize:10, letterSpacing:"0.07em", textTransform:"uppercase", color:C.teal, marginBottom:8 }}>Éléments de réponse</div>
            <div style={{ fontSize:13, color:C.text, lineHeight:1.6 }}>{q.a}</div>
          </div>
          <div style={{ fontSize:11, color:C.hint, textAlign:"center", marginBottom:8 }}>Tu avais les bons éléments ?</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            <button style={{ ...btn(C.redL, C.redB), marginTop:0 }} onClick={() => ans(false)}>✗ Pas vraiment</button>
            <button style={{ ...btn(C.tealL, C.tealB), marginTop:0 }} onClick={() => ans(true)}>✓ Oui !</button>
          </div>
        </>
      ) : (
        <>
          <div style={{ background:"rgba(255,255,255,0.03)", border:`1px dashed ${C.border}`, borderRadius:12, padding:"32px 16px", textAlign:"center", color:C.hint, fontSize:13, marginBottom:10 }}>
            Prépare ta réponse à l'oral…
          </div>
          <button style={btn(C.violetL, C.violetB)} onClick={() => setShow(true)}>Voir la réponse attendue</button>
        </>
      )}
    </div>
  );
}

// ── MODES GRID (pour un texte) ────────────────────────────────────────────────
const MODES = [
  { id:"flashcards",   icon:"🃏", name:"Flashcards",      desc:"Procédé → exemple → effet" },
  { id:"qcm",          icon:"🧠", name:"Quiz",             desc:"QCM sur tous les éléments de la fiche" },
  { id:"mouvement",    icon:"🗂️", name:"Quel mouvement ?", desc:"Classe le procédé dans le bon mouvement" },
  { id:"examinateur",  icon:"👩‍🏫", name:"Examinateur",    desc:"Questions type oral du bac" },
];

// ── HOME ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [texteIdx, setTexteIdx] = useState(null);
  const [mode, setMode] = useState(null);

  const texte = texteIdx !== null ? TEXTES[texteIdx] : null;

  function goHome() { setScreen("home"); setTexteIdx(null); setMode(null); }
  function goTexteMenu(i) { setTexteIdx(i); setScreen("texte-menu"); setMode(null); }
  function goFiche() { setScreen("fiche"); }
  function goMode(m) { setMode(m); setScreen("mode"); }
  function goBack() {
    if (screen === "mode") { setScreen("texte-menu"); setMode(null); }
    else if (screen === "fiche") { setScreen("texte-menu"); }
    else if (screen === "texte-menu") { goHome(); }
    else goHome();
  }

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"Georgia,serif", maxWidth:430, margin:"0 auto" }}>

      {/* ── HEADER ── */}
      <div style={{ background:"#0d0c15", borderBottom:`1px solid rgba(107,92,231,0.25)`, padding:"12px 18px 10px", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          {screen !== "home" ? (
            <button onClick={goBack} style={{ background:C.violetL, border:`1px solid ${C.violetB}`, color:"#a89ff0", borderRadius:8, padding:"5px 11px", fontSize:12, cursor:"pointer", fontFamily:"Georgia,serif" }}>← Retour</button>
          ) : (
            <div style={{ fontSize:13, fontStyle:"italic", color:"#a89ff0" }}>Bac Français · 1ère Générale</div>
          )}
          {texte && screen !== "home" && (
            <div style={{ fontSize:12, fontStyle:"italic", color:C.muted }}>{texte.titre} {texte.numero}</div>
          )}
        </div>
        {screen === "texte-menu" && texte && (
          <div style={{ marginTop:6, fontSize:11, color:C.hint }}>{texte.auteur} · {texte.acte}</div>
        )}
      </div>

      {/* ── HOME ── */}
      {screen === "home" && (
        <div>
          <div style={{ textAlign:"center", padding:"32px 20px 24px" }}>
            <div style={{ display:"inline-block", background:C.violetL, border:`1px solid ${C.violetB}`, color:"#c4bbff", fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", borderRadius:20, padding:"3px 12px", marginBottom:14 }}>
              Révision · Lecture linéaire
            </div>
            <div style={{ fontSize:26, fontStyle:"italic", color:C.text, lineHeight:1.2, marginBottom:6 }}>Bac Français</div>
            <div style={{ fontSize:13, color:C.muted }}>1ère Générale · 10 textes</div>
          </div>

          <div style={{ padding:"0 18px 40px" }}>
            <div style={{ ...sectionLabel, marginBottom:12 }}>Choisis un texte</div>
            {TEXTES.map((t, i) => (
              <div key={t.id} onClick={() => goTexteMenu(i)} style={{
                ...card({ cursor:"pointer", marginBottom:10 }),
                borderLeft:`3px solid ${t.mouvements[0].couleur}`,
                borderRadius:"0 12px 12px 0",
              }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div>
                    <div style={{ fontSize:15, fontStyle:"italic", color:C.text, marginBottom:2 }}>{t.numero} — {t.titre}</div>
                    <div style={{ fontSize:12, color:C.muted }}>{t.auteur} · {t.acte}</div>
                    <div style={{ fontSize:11, color:C.hint, marginTop:4 }}>
                      {t.mouvements.reduce((acc,m) => acc+m.procedes.length, 0)} procédés · {t.mouvements.length} mouvements
                    </div>
                  </div>
                  <div style={{ fontSize:20, color:C.hint }}>›</div>
                </div>
              </div>
            ))}
            {Array.from({length: 10 - TEXTES.length}).map((_, i) => (
              <div key={i} style={{ ...card({ marginBottom:8, opacity:0.35 }) }}>
                <div style={{ fontSize:13, color:C.hint, fontStyle:"italic" }}>Texte n°{TEXTES.length+i+1} — à venir</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TEXTE MENU ── */}
      {screen === "texte-menu" && texte && (
        <div style={{ padding:"16px 18px 32px" }}>
          {/* Problématique */}
          <div style={{ background:C.violetL, border:`1px solid ${C.violetB}`, borderLeft:`4px solid ${C.violet}`, borderRadius:"0 12px 12px 0", padding:"12px 14px", marginBottom:20, fontSize:13, fontStyle:"italic", color:"#c4bbff", lineHeight:1.5 }}>
            {texte.problematique}
          </div>

          {/* Fiche complète */}
          <div style={{ ...sectionLabel, marginBottom:8 }}>Fiche de révision</div>
          <div onClick={goFiche} style={{ ...card({ cursor:"pointer", marginBottom:20, borderColor:C.violetB }), background:C.violetL }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <div style={{ fontSize:15, fontWeight:"bold", color:"#c4bbff", marginBottom:3 }}>📄 Consulter la fiche</div>
                <div style={{ fontSize:12, color:"rgba(196,187,255,0.7)" }}>Contexte · Plan · Procédés · Bilan</div>
              </div>
              <div style={{ fontSize:22, color:"#c4bbff" }}>›</div>
            </div>
          </div>

          {/* Modes entraînement */}
          <div style={{ ...sectionLabel, marginBottom:10 }}>Modes d'entraînement</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {MODES.map(m => (
              <div key={m.id} onClick={() => goMode(m.id)} style={{
                background:C.surface, border:`1px solid ${C.border}`, borderRadius:14,
                padding:"14px 12px", cursor:"pointer", textAlign:"left",
              }}>
                <div style={{ fontSize:20, marginBottom:6 }}>{m.icon}</div>
                <div style={{ fontSize:13, fontWeight:"bold", color:C.text, marginBottom:3 }}>{m.name}</div>
                <div style={{ fontSize:11, color:C.hint, lineHeight:1.4 }}>{m.desc}</div>
              </div>
            ))}
          </div>

          {/* Notions */}
          <div style={{ marginTop:20 }}>
            <div style={{ ...sectionLabel, marginBottom:8 }}>Notions clés</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {texte.notions.map(n => (
                <span key={n} style={{ fontSize:12, padding:"3px 9px", borderRadius:20, background:C.violetL, color:"#c4bbff", border:`1px solid ${C.violetB}` }}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── FICHE ── */}
      {screen === "fiche" && texte && <FicheTexte texte={texte} onBack={goBack} />}

      {/* ── MODES ── */}
      {screen === "mode" && texte && mode === "flashcards"  && <ModeFlashcards  texte={texte} onBack={() => { setScreen("texte-menu"); setMode(null); }} />}
      {screen === "mode" && texte && mode === "qcm"         && <ModeQCM         texte={texte} onBack={() => { setScreen("texte-menu"); setMode(null); }} />}
      {screen === "mode" && texte && mode === "mouvement"   && <ModeMouvement   texte={texte} onBack={() => { setScreen("texte-menu"); setMode(null); }} />}
      {screen === "mode" && texte && mode === "examinateur" && <ModeExaminateur texte={texte} onBack={() => { setScreen("texte-menu"); setMode(null); }} />}

    </div>
  );
}
