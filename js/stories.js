"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function handleAddingNewStory(evt) {
  evt.preventDefault();
  console.log("hanedelADDIngNewStory");
  const storyTitle = $("#story-title").val();
  const storyAuthor = $("#story-author").val();
  const storyURL = $("#story-url").val();
  console.log('current user', currentUser);
  console.log('inputs', storyAuthor, storyTitle, storyURL)
  console.log('data obj', {story: {title: storyTitle, author: storyAuthor, url: storyURL}});
  const dataStoryObj = {story: {author: storyAuthor, title: storyTitle, url: storyURL}};
  let newStory = await storyList.addStory(currentUser, dataStoryObj);
  console.log('new Story', newStory);
  generateStoryMarkup(newStory);
}

$submitStory.on("click", handleAddingNewStory);
