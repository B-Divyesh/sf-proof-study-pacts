export type PublicExercise = {
  title: string;
  url: string;
  theorem: string;
};

// These are the only public exercises offered by the pact form. Keep each URL
// on a maintained public page; tests/exercises.spec.ts checks every entry.
export const publicExercises: readonly PublicExercise[] = [
  {
    title: 'Natural Number Game — Add zero',
    url: 'https://adam.math.hhu.de/#/g/leanprover-community/nng4/world/Tutorial/level/4',
    theorem: 'theorem add_zero (n : ℕ) : n + 0 = n := by'
  },
  {
    title: 'Theorem Proving in Lean — Rewriting',
    url: 'https://lean-lang.org/theorem_proving_in_lean4/Tactics/',
    theorem: 'example (a b c : Nat) (h₁ : a = b) (h₂ : b = c) : a = c := by'
  },
  {
    title: 'Mathematics in Lean — Sets and Functions',
    url: 'https://leanprover-community.github.io/mathematics_in_lean/C04_Sets_and_Functions.html',
    theorem: 'example (f : α → β) (s t : Set α) : f \` (s ∩ t) ⊆ f \` s ∩ f \` t := by'
  }
];
