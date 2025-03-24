// export default () => <div style={{position: "relative", width: "100%", height: 0, paddingTop: "177.7778%",
//     paddingBottom: 0, boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)", marginTop: "1.6em", marginBottom: "0.9em", overflow: "scroll",
//     borderRadius: "8px", willChange: "transform"}}>
//     <iframe  style={{width: "100%", height: "100%", top: 0, left: 0, border: "none", padding: 0, margin: 0}}
//       src="https://www.canva.com/design/DAGiGsJkUd8/KKfFlBjmB3Bl-YQEy32yyQ/watch?embed">
//     </iframe>
//   </div>

/**
 * <div style="
 * position: relative; width: 100%; height: 0; padding-top: 177.7778%; padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden; border-radius: 8px; will-change: transform;">  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"    src="https://www.canva.com/design/DAGiGsJkUd8/KKfFlBjmB3Bl-YQEy32yyQ/watch?embed" allowfullscreen="allowfullscreen" allow="fullscreen">  </iframe></div><a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGiGsJkUd8&#x2F;KKfFlBjmB3Bl-YQEy32yyQ&#x2F;watch?utm_content=DAGiGsJkUd8&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">Cardápio de páscoa BM 2025</a> de Rayanne Stefany Nascimento da Silva
 */

import "./frame.css";

export default () => {

const canvaUrl = "https://www.canva.com/design/DAGiGsJkUd8/f_zSH_fQRDMoTa8f0MxT1Q/view?embed";

return <div className="flex-1 flex w-[100%] h-fit mt-10">
 <iframe loading="lazy" 
    className="w-[100vw] h-[100vh]"
    src={`${canvaUrl}`}  
    allow="fullscreen"
    ></iframe>
</div>}

