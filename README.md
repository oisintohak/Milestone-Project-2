# Workout Interval Timer
This is the second Milestone Project for the Code Institute course.

---

## UX

### - Strategy - What are we aiming to achieve and for whom?
#### For the user: 
- We want to make a timer that keeps time accurately.
- We want to make a timer that can be used for interval workouts.
- We want a timer that can take user input to change the work/rest times.
- We want a progress bar that shows overall progress and progress within each round.
- We want an interface that will change appearance depending on the state of the timer and display an appropriate message.
- We want a timer that can do a count-down before starting so users have time to prepare.
- We want an audio cue to signal the end of a work/rest period.
- We want to create a website that is easy and intuitive to use.
- We want to create a site that is easy to view on all screen sizes.
- 

### - Scope - What features (based on information from the Strategy) do you want to include in your design? What's on the table and what's not(at least for now)?
- Intuitive user interface.
- Customizable work and rest times.
- Option for an extended break after a set number of rounds.
- Alarm or bell sound after rounds/breaks.
- Progress bar showing current position in workout.
- Options should be collapsable, to leave a minimal interface when timer is running.

### - Structure (How is the information structured and how is it logically grouped?)
- Single page layout.
- Simple logo at the top of the page.
- Options should expand below the logo and be collapsable.

### - Skeleton (How will our information be represented, and how will the user navigate to the information and the features?)
###### Wireframes:
- [Desktop](wireframes/desktop.png)
- [Mobile](wireframes/mobile.png)

### - Surface (What will the finished product look like? - What colors, typography, and design elements will we use?)
- Minimal interface.
- Contrasting accents for work/rest times to act as instant visual signal to users.


### - Planning
 - Timer function needss to differentiate between work & rest times.
 - When paused, current round number needs to be saved
 - Add all round times to get total runtime, keep track of elapsed time and compare to length of rounds to calculate current round.

### - Issues
 - When start button is pressed during countdown the timer becomes unresponsive until page is refreshed.
   - Fixed by disabling start and pause buttons when they are pressed.

### - Credits
  #### - Code
  - The method for keeping time accurately (by comparing a current Date object to one previously recorded) was taken from [this article by Jamie Uttariello](https://olinations.medium.com/an-accurate-vanilla-js-stopwatch-script-56ceb5c6f45b)

  #### - Audio
    - The beep sounds used in the timer were taken from [https://mixkit.co/free-sound-effects/beep/](https://mixkit.co/free-sound-effects/beep/)

  #### - Icons
    -  Favicon taken from [Flaticon.com](https://www.flaticon.com/)
    -  Other icons taken from [Fontawesome](https://fontawesome.com/)