# Jobflow Challenge - JobActionsProvider

Over the last two years, the apply flow has changed quite a lot. Because of this, we now have a centralized provider which handles all of these different states and transitions. Making changes to this is very error-prone and we already had quite a few incidents where the apply process or some part of it broke. The difficulty is that there are a lot of different conditions and flows overall, plus the fact that the component or provider itself is over 800 lines long.

Create a plan for how to solve these issues. You do not need to implement the solution itself.
we are open to any type of changes, even bigger ones, as long as they address the issue at hand in the long term. And we make sure something like this also in similar components doesn't happen again.

The plan could look like this:

1. Create component / provider / hook / service / etc. to solve the issues.
2. Structure the code like...
