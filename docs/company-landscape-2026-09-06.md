# Comparable companies and design direction

Reviewed 6 September 2026. This maps overlapping capabilities and public positioning;
it does not establish feature parity or independently validate vendor claims.

| Reference | Where it overlaps | What the presentation teaches us |
|---|---|---|
| [Ollama](https://ollama.com/) | Open-model access and private/local execution: adjacent infrastructure for AI applications. It is a partial reference rather than a direct equivalent to the application builder or contract product. | One immediately understandable promise, a prominent product view, and a clear download action. Explain the useful outcome before infrastructure detail. |
| [Meta’s Astryx](https://astryx.atmeta.com/) | The closest of these references to SWC: components, themes, templates and an interface for agents. Its [CLI documentation](https://astryx.atmeta.com/docs/cli) describes component discovery, structured documentation and theme generation. Astryx uses React/StyleX; our implementation remains SWC. | Demonstrate the system through real interface compositions. Show adaptability rather than explaining every component in a paragraph. |
| [Dify](https://dify.ai/) | Strong overlap with agent-stack’s workflow and data-flow story: visual orchestration, knowledge pipelines, model/tool integrations and deployment choices. | Make the execution path visible. Separate workflow creation, knowledge preparation and deployment so visitors can understand their relationship. |
| [LangChain / LangSmith](https://www.langchain.com/) | Agent frameworks and harnesses, stateful orchestration, evaluation, deployment and governance. Relevant to agent-stack and the infrastructure around domain workflows. | Explain the lifecycle and the control points. Connect infrastructure to inspectable work and measured outcomes. |
| [Lovable](https://lovable.dev/) | Application creation from natural language, iteration and deployment: a direct category reference for AI Studio. | Lead with the act of creating something. A concrete interface/result makes the promise easier to assess. |
| [Harvey](https://www.harvey.ai/) | The clearest domain reference for Contract Vetting in this set: legal agents, document analysis, shared matter context and Contract Intelligence for reviews and negotiations. | Give the domain product its own prominence. Show the relationship between documents, context, agents and review, rather than reducing the product to a generic automation example. |

## Positioning implications

These references cover different layers. They should not all be presented as
equivalent competitors, and Astryx is a Meta design system rather than a separate
company.

Pragmatical’s coherent story is the relationship between its own interface
foundation (SWC), creation experience (AI Studio), workflow infrastructure
(agent-stack), and domain products. Contract Vetting is a flagship expression of
the harness: documents, retrieved sources, rules, versions and review decisions
flow through a repeatable process. It belongs alongside the creation story in the
homepage hierarchy.

That combination is a useful positioning direction, not evidence that the
combination is unique in the market. Stronger differentiation needs demonstrable
product outputs, workflow traces and substantiated results.

## Typography and controls

Browser inspection of the live sites at a 1440px viewport found:

- Ollama: a system sans-serif stack; its main headline uses weight 500.
- Astryx: Figtree for the main site; its main headline uses weight 400, with
  stronger emphasis within it. Individual theme demonstrations use other faces.
- Dify: Söhne; its main headline uses weight 500.

The common direction is readable, contemporary sans-serif typography and
restrained weight. These are observations of the rendered pages, not permanent
brand specifications.

Applied to this branch: Figtree for headings and body, medium-weight main
headings, less compressed letter spacing, and sans-serif section labels. The
previous Bricolage/IBM Plex pairing is removed. A single SWC icon button switches
between light and dark, showing the icon and accessible label for the destination
mode. The selected mode persists; the former System preference is resolved once
when an existing visitor returns.

The research informs typography and emphasis. No competitor assets, customer
logos or performance claims are copied into the site.
