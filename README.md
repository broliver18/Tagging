# Tagging

## Description
The purpose of this app is to filter out playlists using tags. Instead of searching tracks by title, artist or album, the end-user has the ability to
add custom tags to each track. The user is then able to search for tracks by tags. You can also select tracks to add to an existing playlist, a new playlist
or delete from the current playlist. 

With this app, it becomes easier to edit and create new playlists. For example, if you want to create new playlists from
an existing one, you could use tags to determine which playlists will contains which tracks. Once that is done, you just need to search the playlist
by each tag nmae, click on the select all button, and create a new playlist from the selected tracks.

## Links
Video explanation: https://www.linkedin.com/feed/update/urn:li:activity:7064947738160812032/

## Featurs
- Once a tag is created, it is saved to each track's dropdown tag menu where it can be added to other tracks by a simple click.
- The tag options mentioned above can be deleted by clicking on the 'x' button next to it
- Tags can be created by either selecting from the dropdown menu or by typing out a name and pressing the ',' or 'Enter' key
- Tags can be deleted by clicking the 'x' button next to a tag or by hitting the 'Backspace' key
- App will not allow track to have multiple tags with identical name (not case-sentive)
- App will prevent tracks from being added to a playlist that already contains those same tracks
- App will prevent playlist with no name or no tracks from being created
- App will prevent playlist from being created if a playlist with that name already exists (case-sensitive)
- 'Select All' button selects only the tracks that are displayed - once pressed, 'Deselect All' button will become available in its place
- Responsive - works well with desktop, tablet or mobile
- *CAUTION* - If existing playlist contains duplicate tracks, editing that playlist will not function as expected

## How to Use
1. Download zip file of repo
2. Extract the files
3. Open the terminal on your computer
4. Navigate to the parent folder of the project - jamming (not jamming-main) using the `cd` commmand
5. Type `npm install` into the terminal and wait for the install to complete
6. Type `npm start` to open application on 'http://localhost:3000'
7. Each track contains a tag menu that appears once mouse hovers over the track
8. Start organizing your playlists

## Technologies
- React.js
- Spotify Web API
- Javascript
- HTML
- CSS
- CSS Transition
