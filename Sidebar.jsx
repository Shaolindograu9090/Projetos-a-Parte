import React from 'react';
import {Activity, LayoutDashboard, ShieldAlert, GitBranch, Newspaper, Settings, CircleHelp, ChevronLeft, Zap} from 'lucide-react';
export default function Sidebar({active,setActive,collapsed,setCollapsed}) {
 const items=[['overview','Visão geral',LayoutDashboard],['security','Cibersegurança',ShieldAlert],['opensource','Open source',GitBranch],['signals','Radar tech',Newspaper]];
 return <aside className={`sidebar ${collapsed?'collapsed':''}`}>
  <div className="brand"><div className="brand-mark"><Activity size={21}/></div>{!collapsed&&<div><b>tech<span>pulse</span></b><small>INTELLIGENCE PLATFORM</small></div>}</div>
  <div className="workspace">{!collapsed&&<><span className="eyebrow">WORKSPACE</span><div className="workspace-name"><span className="live-dot"/> Global tech watch <ChevronLeft size={14}/></div></>}</div>
  <nav>{items.map(([id,label,Icon])=><button key={id} className={`nav-item ${active===id?'active':''}`} onClick={()=>setActive(id)} title={label}><Icon size={18}/>{!collapsed&&<span>{label}</span>}{active===id&&!collapsed&&<i/>}</button>)}</nav>
  <div className="sidebar-bottom"><div className="nav-divider"/><button className="nav-item" onClick={()=>setActive('settings')}><Settings size={18}/>{!collapsed&&<span>Preferências</span>}</button><button className="nav-item" onClick={()=>setActive('help')}><CircleHelp size={18}/>{!collapsed&&<span>Sobre os dados</span>}</button>
  <div className="sidebar-status"><span className="status-pulse"/>{!collapsed&&<div><b>Sistemas operacionais</b><small>Conectores públicos</small></div>}</div>
  <button className="collapse-btn" onClick={()=>setCollapsed(!collapsed)}><ChevronLeft size={16}/>{!collapsed&&'Recolher menu'}</button></div>
 </aside>
}