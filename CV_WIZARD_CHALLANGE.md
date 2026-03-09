# CV Wizard Challenge - Interview Ticket

We want to build a CV wizard, i.e. a place where we show each candidate dynamic questions about what they need to answer in order to apply.

For this we have the "getOnboardingSteps" method, which returns the steps.
They have various properties:
- type: the type of the step
- isRequired: whether the step is required to be answered, or first a question is asked, if the user even has that step. We may change this from the backend at any time.
- shouldBeShown: whether the step should be shown to the user (i.e. if it's false, don't show it)

If the "isRequired" is false, first display a question, i.e. "Do you have a certification?"
If the user answers "yes", then show the certification step.
If the user answers "no", then show the next step.

If the "isRequired" is true, then show the step directly (without the additional question).


For the work experience step, we want to give the user the ability to add multiple work experiences.
The "maxToAdd" property is the maximum number of work experiences the user can add.
If the user adds a work experience, then show the next step.
If the user doesn't add a work experience, then show the next step.
(There are 2 separate prototype flows, so you can check both of them)



Have a look at this clickdummy + design: https://www.figma.com/design/Ds4iGsbmFe1oHw25sflF6l/RN-Interview?node-id=0-1&t=9ucZmjFGcovLVAKs-1

# Tips

Make sure to validate the forms, you don't need to add crazy validation, but:
- Only submit to the "API", when all fields are filled, else display a red border around the fields + the button should be disabled
- The core requirement does NOT include the "update" functionality (i.e. going back and editing an already submitted form), but if you find an easy way to implement it / talk about how you would implement it, that's a plus.