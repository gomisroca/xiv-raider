## Planning

- DB Structure
- Action/Query Structure
- Desired Views
- Styling

## Features

- Authentication
- Create Raid Group
- Generate invite link to raid groups, so people can join
- When a person joins a group, they can create a character
- Then they will be able to select the character's job
- They will get checkboxes for each piece of gear they have, marking them as BiS or not
  - For non-BiS, they will be able to select the BiS they want (tomestone/raid)
- Auto-generate a loot distribution based on the group's BiS gear
  - i.e. if a melee dps is missing a piece from X fight, they will have priority, then ranged, tanks and healers.
  - Allow for custom loot distribution

## Long Term Features

- Raid Days Management
  - Post events
  - Get notifications
- Link character to account
  - The character owner would then be able to join the raid groups they want.
- Alt support
  - Main roles would get priority, then alt role priority would kick in.

## Roadmap

- Authentication

  - Create a user
  - Create a raid group
  - Invite people to join
    - Generate an invite link
    - The link becomes invalid after a certain amount of time / number of uses
    - Only a certain amount of people can be invited
  - Only allow people to see/join if they are invited
  - Creator can delete the raid group, pass lead, kick people, edit the group's name, etc.

- Raid Groups
  - Add a character
    - Input the character's job (we need list of jobs, can just be a const)
    - Input the character's gear status and what the desired BiS is (tomestone/raid)
    - Input the character's name
  - Create a loot distribution (or select auto-generated)
    - Get a list of all the players and move them around to order the priority
    - As people get their gear, it should mark the next person in line to be prioritized
