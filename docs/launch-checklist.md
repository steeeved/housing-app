# Launch checklist

Fill in one row at a time. Write what you expect before you look. Evidence is something another person could check: a number, a status code or a command. "It looked fine" is not evidence.

Never paste a secret, a cookie or a connection address here. Use only invented details.

## Part 1: the doors from outside

Run `bun run launch:check <your live address>` and paste the PASS, WARN and FAIL lines you got. Lines marked WARN are not failures. Say what you will do about each one.

| ID | Check | Expected | Actual | Evidence |
|---|---|---|---|---|
| L1 | Launch check against the live address | No FAIL lines | | the output lines |
| L2 | Every WARN looked at | A reason or a fix for each | | |

## Part 2: a phone-sized screen

Open the live site in your browser. Open the browser tools, switch on the device toolbar and choose a narrow phone width. Test the home page, `/listings`, the inquiry form and `/sign-in`.

| ID | Check | Expected | Actual | Evidence |
|---|---|---|---|---|
| M1 | No sideways scrolling on any of the four pages | Nothing runs off the screen | | which pages you opened |
| M2 | Text is readable without zooming | Body text easy to read | | |
| M3 | Buttons and fields are easy to hit with a thumb | Each is at least about the size of a fingertip | | |
| M4 | The inquiry form works from the narrow screen | An invented inquiry is sent and shown as saved | | status or message |
| M5 | One problem you found, and its fix | A fix on a branch, merged by pull request | | pull request title |

## Part 3: a slow connection

In the browser tools, open the network tab, tick the box that turns the cache off, and choose a slow connection setting. Reload the home page and `/listings`.

| ID | Check | Expected | Actual | Evidence |
|---|---|---|---|---|
| S1 | The home page becomes usable | Content shows without a long blank screen | | seconds you waited |
| S2 | The listings page becomes usable | The cards appear | | seconds you waited |
| S3 | The heaviest thing on the page | You can name it and say if it matters | | its name and size |
| S4 | The browser's Lighthouse report on mobile, one page | Scores noted, one finding picked | | the four scores |

## Part 4: safe to show

| ID | Check | Expected | Actual | Evidence |
|---|---|---|---|---|
| P1 | The Chapter 10 access matrix on the live site | The four results match Chapter 10 | | the four results |
| P2 | Nothing real in the README, the pages or the data | Invented details only | | what you searched |
| P3 | Every claim in the README is true | Each claim has a way to check it | | the claims you tested |
| P4 | The repository is private and holds no secret | Private, and the secret scan is green | | `bun run scan:secrets` result |
| P5 | The sharing tier your parent chose | Link shared only as allowed | | the tier, not a name |

## Not checked

List what you did not check. A launch with an honest list is stronger than a launch with a long list of ticks.
