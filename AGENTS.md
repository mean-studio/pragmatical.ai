# Project instructions

## Required checks for every UI design or change

Treat responsive behaviour as part of the design, not a final polish step. Apply this checklist whenever designing, implementing or revising a UI in this project, including shared components and design previews.

### Mobile navigation

- Provide a hamburger menu for the corporate navigation at narrow widths. Do not let the desktop navigation wrap into multiple header rows or require horizontal scrolling.
- Use a native framework button with an accessible name and an accurate expanded state. Associate it with the navigation it controls.
- Verify opening, closing, choosing a destination, Escape dismissal and keyboard focus handling. Closed menu links must not remain in the tab order. Use appropriate focus handling for the chosen pattern; trap focus only when the menu is a modal.
- Keep the brand and theme control usable without crowding the header. Check navigation again after changing viewport size and after client-side navigation.

### Buttons and touch controls

- Deliberately adapt button padding, typography, gaps and width for mobile. Do not inherit oversized desktop button styling without reviewing it.
- Preserve touch targets of at least 44 by 44 CSS pixels for primary controls, including icon buttons. Compact visual styling must not make controls difficult to tap.
- Check long labels, icon alignment, wrapping and grouped actions. Stack actions where necessary; avoid clipped labels or crowded buttons.

### Spacing and content hierarchy

- Review section padding, container gutters, vertical gaps and heading margins at each breakpoint. Reduce excessive desktop whitespace on mobile while retaining readable grouping.
- Check the actual scroll experience: the opening message and useful action should not be buried beneath a tall header, oversized gaps or decorative content.
- Scale headings and visuals appropriately. Verify readable text, intentional image crops, sensible content order and no horizontal overflow.
- Design responsive values through the framework's layout primitives and tokens. Do not substitute imperative DOM layout or a separate hand-built rendering system.

### Required verification before reporting completion

- Render and inspect the affected UI at representative widths of 320, 390, 768, 1024 and 1440 CSS pixels. Include at least one realistic mobile height, such as 844 pixels.
- Inspect screenshots and interact with the UI. A successful build or an automated overflow check alone does not establish good mobile design.
- Check light and dark themes, keyboard focus, navigation, button sizing and spacing. Exercise changed responsive interactions in Chromium and WebKit when available.
- After layout changes, recheck the affected pages and shared components, including menu states and client-side back navigation where relevant. Do not rely on screenshots from an earlier implementation.
- Fix discovered issues before declaring the UI complete. If a check cannot be performed, state the specific limitation and do not claim it passed.
- In the handoff, briefly report what responsive behaviour was verified and any remaining defects. Distinguish a static design study from a tested responsive implementation.

These checks do not require new unit tests for purely visual changes. Use meaningful browser interaction and visual inspection, alongside the project's required lint and build checks for implementation changes.
