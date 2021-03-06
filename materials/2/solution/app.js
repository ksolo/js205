/* We could also load this data from a server using an AJAX request.*/
var videosJSON = [
  {"youtubeId": "TddFnTB_7IM",
    "title": "Trip through the 80s",
    "author": "meliberty"
  },
  {"youtubeId": "oOlDewpCfZQ",
   "title": "Four Chords",
   "author": "axisofawesome"
  },
  {"youtubeId": "il2IrgFHfsg",
    "title": "The Ooooh Cat",
    "author": "RnBTree"
  },
  {"youtubeId": "epUk3T2Kfno",
    "title": "Otters Holding Hands",
    "author": "cynthiaholmes"
  }
];

function VideoModel(videoJSON) {
  this.youtubeId = videoJSON.youtubeId;
  this.title     = videoJSON.title || 'Untitled';
  this.author    = videoJSON.author || 'No author';
}

VideoModel.prototype.thumbURL = function() {
  return 'http://i3.ytimg.com/vi/' + this.youtubeId + '/default.jpg';
}

VideoModel.prototype.embedURL = function() {
  return 'http://www.youtube.com/embed/' + this.youtubeId;
}


function VideoCollection(videosJSON) {
  this.items = videosJSON.map(function(videoJSON){
    return new VideoModel(videoJSON)
  });
};

VideoCollection.prototype.sort = function() {
  this.items.sort(function(videoA, videoB){
    return videoA.title.localeCompare(videoB.title);
  });
};


 /* Adds a video to the list */
function VideoItemView(video) {
    var videoLink = $('<a>');
    videoLink.append(video.title);
    var linkUrl = videoLink.attr('href');
    var thumbnailImg = $('<img>');
    thumbnailImg.attr('src', video.thumbURL());
    videoLink.append(thumbnailImg);

    /* On click, we'll make a modal with the title and video iframe */
    videoLink.on('click', function(e) {
        e.preventDefault();

        var videoTitle = $('<h2>');
        videoTitle.html(video.title + ' <small>' + video.author + '</small>');
        var videoEmbed = $('<iframe></iframe>');
        videoEmbed.attr('src', video.embedURL());
        videoEmbed.attr('width', 560);
        videoEmbed.attr('height', 315);

        $('.video-modal').remove();
        var videoModal = $('<div class="video-modal">');
        videoModal.append(videoTitle);
        videoModal.append(videoEmbed);
        $('body').append(videoModal);
    });

    var videoItem = $('<li>');
    videoItem.append(videoLink);
    return videoItem;
 }


$(document).ready(function() {

  var videoList = $('#video-list');
  var videos = new VideoCollection(videosJSON);

  videos.sort();

  videos.items.forEach(function(video){
    var videoItem = new VideoItemView(video);
    videoList.append(videoItem);
  });

});