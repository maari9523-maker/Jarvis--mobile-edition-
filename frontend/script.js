async function callGemini(p){ let lastErr;
for(const m of MODELS){
try{
const res=await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/"+m+":generateContent?key="
+API_KEY,
{method:"POST",headers:{"Content-Type":"application/json"},
body:JSON.stringify({contents:[{parts:[{text:p}]}]})});
const data=await res.json();
if(data.error){
lastErr=new Error(data.error.message);
if(/high demand|temporar|quota|rate|unavailable|no longer
available|deprecated/i.test(data.error.message)) continue;
throw lastErr;
}
return data.candidates[0].content.parts[0].text;
}catch(e){ lastErr=e; }
}
throw lastErr;
}
async function askGemini(p){
add('J.A.R.V.I.S: Thinking...','ai');
try{
const reply=await callGemini(p);
chat.lastChild.innerText='J.A.R.V.I.S: '+reply;
speak(reply); // reply వచ్చి న వెంటనేVOICE
}catch(e){
chat.lastChild.innerText='J.A.R.V.I.S: ERROR - '+e.message;
}
}
