/* ================================================================
   CONFIGURATION PARTAGEE — utilisee par toutes les pages
   ================================================================ */
const CONFIG = {
  SUPABASE_URL: "https://psvmmughgagggalavnrv.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_C-tEmOPK1iRR6bKG490hTQ_CIDpi45o",
 
  EMAILJS_PUBLIC_KEY: "qtSxvtlkT5Oyebnw-",
  EMAILJS_SERVICE_ID: "service_11d8zur",
  EMAILJS_TEMPLATE_OWNER: "template_y97c61m",
  EMAILJS_TEMPLATE_PARENT: "template_amojq6e",
 
  PAYPAL_CLIENT_ID: "Afan1JosdweYaD3YhMbqrwahEbsONCF_F2Di3MzNv6iOtlal7rozQGX3k39leF99D43ZZULcrdNuVfDz",
 
  OWNER_EMAIL: "zinsouorianerocmel@gmail.com",
  OWNER_NAME: "Oriane Zinsou",
 
  RATES: {
    day: 14,
    evening: 17,
    night: 90,
    multiday: 70
  },
  EVENING_STARTS_AT: 19
};
 
/* ================================================================
   BANDEAU D'ERREUR VISIBLE SUR LA PAGE (debug mobile)
   ================================================================ */
function showDebug(message){
  let banner = document.getElementById('debug-banner');
  if(!banner){
    banner = document.createElement('div');
    banner.id = 'debug-banner';
    banner.style.cssText = "background:#fdecea; color:#8c3b3b; padding:14px 18px; font-size:13px; font-family:monospace; border-bottom:2px solid #8c3b3b; word-break:break-word;";
    document.body.insertBefore(banner, document.body.firstChild);
  }
  banner.style.display = 'block';
  banner.textContent = "Erreur technique : " + message;
}
window.addEventListener('error', (e) => {
  showDebug(e.message + (e.filename ? " (" + e.filename.split('/').pop() + ":" + e.lineno + ")" : ""));
});
window.addEventListener('unhandledrejection', (e) => {
  showDebug((e.reason && e.reason.message) ? e.reason.message : String(e.reason));
});
 
/* ================================================================
   INITIALISATION SUPABASE / EMAILJS (protegee)
   ================================================================ */
let supabase = null;
try {
  if(!window.supabase){
    throw new Error("La librairie Supabase ne s'est pas chargée. Essayez d'ouvrir cette page dans Chrome ou Safari directement (pas depuis Instagram/WhatsApp).");
  }
  if(typeof window.supabase.createClient !== 'function'){
    throw new Error("Version de la librairie Supabase inattendue (createClient absent). Type reçu : " + typeof window.supabase);
  }
  supabase = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
  if(!supabase || !supabase.auth){
    throw new Error("Le client Supabase créé est incomplet (pas de .auth). Clés reçues : " + (supabase ? Object.keys(supabase).join(', ') : 'aucune'));
  }
} catch(err){
  showDebug(err.message);
  supabase = null;
}
 
try {
  if(window.emailjs){
    emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
  }
} catch(err){
  showDebug("EmailJS : " + err.message);
}
 
