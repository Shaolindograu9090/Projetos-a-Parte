import React from 'react';
import {motion} from 'framer-motion';
export default function MetricCard({label,value,detail,icon:Icon,tone='blue',index=0,loading=false}) {
 return <motion.article className="metric-card" initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:index*.07,duration:.42}}>
  <div className="metric-top"><span>{label}</span><div className={`metric-icon ${tone}`}><Icon size={17}/></div></div>
  <div className="metric-value">{loading?<span className="skeleton" />:value}</div>
  <div className="metric-detail"><span className={`detail-dot ${tone}`}/>{detail}</div>
  <div className={`metric-glow ${tone}`}/>
 </motion.article>
}