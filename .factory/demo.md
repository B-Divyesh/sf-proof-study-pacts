# Proof Pact demo

- URL: `http://localhost:8080/demo` locally, or
  `https://proof-study-pacts.sociobot.in/demo` after deployment. Opening
  `/?demo=1` is a supported one-click alias and immediately replaces the URL
  with `/demo`.
- Sample: Mira and Theo work on Natural Number Game's `add_zero` exercise.
  Their pact includes two roles, two independent attempts, and two saved proof
  states.
- Storage: the server creates a random `demo-*` workspace with a 24-hour
  expiry. The browser stores only its key in `sessionStorage` under
  `demo:pact`. Demo mode does not read or write real pact browser keys.
- Reset: select **Reset demo** in the persistent banner. This forgets the
  current demo key and provisions a newly seeded workspace.
- Recovery: a missing or expired demo key is discarded automatically. The app
  creates a new seeded workspace while keeping the demo banner visible.
- Leave: select **Start for real**. This removes the demo session key and opens
  the real pact form.
