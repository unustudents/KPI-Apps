# Graph Report - .  (2026-04-29)

## Corpus Check
- Corpus is ~5,775 words - fits in a single context window. You may not need a graph.

## Summary
- 65 nodes · 45 edges · 11 communities detected
- Extraction: 76% EXTRACTED · 24% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]

## God Nodes (most connected - your core abstractions)
1. `pad()` - 4 edges
2. `useSLA()` - 4 edges
3. `SLAProvider()` - 4 edges
4. `IncidentList()` - 3 edges
5. `uid()` - 3 edges
6. `DashboardPage()` - 2 edges
7. `IdentitasPage()` - 2 edges
8. `handleSave()` - 2 edges
9. `formatDate()` - 2 edges
10. `formatDT()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `SLA Monitor Application` --uses_framework--> `Next.js Logo`  [INFERRED]
  README.md → public/next.svg
- `DashboardPage()` --calls--> `useSLA()`  [INFERRED]
  app/page.tsx → app/sla-monitor/context/SLAProvider.tsx
- `IdentitasPage()` --calls--> `useSLA()`  [INFERRED]
  app/(menu)/identitas/page.tsx → app/sla-monitor/context/SLAProvider.tsx
- `IncidentList()` --calls--> `useSLA()`  [INFERRED]
  app/(menu)/incidents/components/IncidentList.tsx → app/sla-monitor/context/SLAProvider.tsx
- `IncidentList()` --calls--> `useMonitorActions()`  [INFERRED]
  app/(menu)/incidents/components/IncidentList.tsx → app/sla-monitor/context/MonitorActions.tsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.22
Nodes (5): DashboardPage(), IncidentList(), useMonitorActions(), useSLA(), IdentitasPage()

### Community 1 - "Community 1"
Cohesion: 0.36
Nodes (4): formatDate(), formatDT(), formatTimerString(), pad()

### Community 2 - "Community 2"
Cohesion: 0.25
Nodes (4): SLAProvider(), useConfig(), useIncidents(), useToast()

### Community 3 - "Community 3"
Cohesion: 0.33
Nodes (3): handleSave(), uid(), createSeedData()

### Community 5 - "Community 5"
Cohesion: 1.0
Nodes (2): calcMetrics(), getMonthIncidents()

### Community 6 - "Community 6"
Cohesion: 0.67
Nodes (3): Next.js Logo, SLA Monitor Application, Vercel Logo

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (1): Next.js Breaking Changes

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (1): Claude Agent Rules

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (1): Window Icon

### Community 24 - "Community 24"
Cohesion: 1.0
Nodes (1): Globe Icon

### Community 25 - "Community 25"
Cohesion: 1.0
Nodes (1): File Icon

## Knowledge Gaps
- **7 isolated node(s):** `Next.js Breaking Changes`, `SLA Monitor Application`, `Claude Agent Rules`, `Window Icon`, `Globe Icon` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 5`** (3 nodes): `calculations.ts`, `calcMetrics()`, `getMonthIncidents()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (1 nodes): `Next.js Breaking Changes`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (1 nodes): `Claude Agent Rules`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (1 nodes): `Window Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (1 nodes): `Globe Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (1 nodes): `File Icon`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useSLA()` connect `Community 0` to `Community 2`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `uid()` connect `Community 3` to `Community 1`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `useSLA()` (e.g. with `DashboardPage()` and `IdentitasPage()`) actually correct?**
  _`useSLA()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `SLAProvider()` (e.g. with `useIncidents()` and `useConfig()`) actually correct?**
  _`SLAProvider()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `IncidentList()` (e.g. with `useSLA()` and `useMonitorActions()`) actually correct?**
  _`IncidentList()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `uid()` (e.g. with `handleSave()` and `createSeedData()`) actually correct?**
  _`uid()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Next.js Breaking Changes`, `SLA Monitor Application`, `Claude Agent Rules` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._