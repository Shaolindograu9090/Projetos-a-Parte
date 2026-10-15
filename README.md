# TechPulse — Tech Intelligence Dashboard

Dashboard responsivo em React + Vite com dados públicos sobre desenvolvimento open source, vulnerabilidades exploradas e notícias de tecnologia.

## Recursos
- Indicadores e gráficos animados (Recharts + Framer Motion).
- Integração ao vivo com GitHub REST API, catálogo CISA KEV e Hacker News API.
- Busca, ordenação, atualização manual e exportação CSV.
- Layout responsivo, navegação lateral e painel de proveniência das fontes.
- Tratamento de falhas: se uma fonte estiver indisponível, o painel usa dados ilustrativos e exibe um aviso.
- Respeita `prefers-reduced-motion`.

## Requisitos
- Node.js 20+ recomendado
- npm

## Executar localmente
```bash
npm install
npm run dev
```
Abra o endereço local mostrado pelo Vite no terminal.

## Gerar versão de produção
```bash
npm run build
npm run preview
```
O resultado estático será criado em `dist/`.

## Fontes de dados
- GitHub REST API: https://docs.github.com/en/rest/repos
- CISA Known Exploited Vulnerabilities (KEV): https://www.cisa.gov/known-exploited-vulnerabilities-catalog
- Hacker News API: https://github.com/HackerNews/API

## Observações importantes
- Os endpoints públicos podem impor limites, ficar indisponíveis ou mudar. A atualização é manual para evitar chamadas excessivas.
- Os números do GitHub refletem apenas a seleção de repositórios configurada em `src/lib/api.js`, não todo o ecossistema.
- Quando uma API falha, os valores de fallback são ilustrativos e o dashboard mostra um aviso. Não use esses valores como informação atual de segurança.
- Para uso empresarial, considere criar um backend/cache com limites, monitoramento e validação das respostas, além de uma política de atualização adequada.
