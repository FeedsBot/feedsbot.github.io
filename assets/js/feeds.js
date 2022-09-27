var player;

function loadVideo(i) {
  if (i == 'q') i = 5;


  let wrapper = document.getElementById('video-wrapper');

  wrapper.parentElement.classList.remove('feed1');
  wrapper.parentElement.classList.remove('feed2');
  wrapper.parentElement.classList.remove('feed3');
  wrapper.parentElement.classList.remove('feed4');
  wrapper.parentElement.classList.remove('feed5');
  wrapper.parentElement.classList.add('feed' + i);

  let config = {
    source: '/mirror/feed'+i+'.m3u8',
    // eslint-disable-next-line no-undef
    plugins: [QualitySelector, ClapprPIPPlugin],
    qualitySelectorConfig: { labelCallback: function(info) { return info.level.height + 'p'; } },
    width: '100%',
    height: '100%',
    persistConfig: true,
    poster: '/mirror/feed'+i+'.jpg'
  };
  if (player) {
    config.poster = '/assets/blank.png';
    config.autoPlay = true;
    player.configure(config);
  }
  else {
    // eslint-disable-next-line no-undef
    player = new Clappr.Player(config);
    player.attachTo(wrapper);
  }

}

function readHash() {
  let reg = new RegExp('^#feed([1-5]|q)');
  if (window.location.hash && window.location.hash.match(reg)) {
    loadVideo(window.location.hash.match(reg)[1]);
  }
  else {
    loadVideo(5);
  }
}

window.addEventListener('hashchange', readHash, false);
readHash();

function refreshThumbs() {
  let thumbs = document.getElementById('thumbs').getElementsByTagName('img');
  for (let i in thumbs) {
    let thumb = thumbs[i];

    thumb.src = '/mirror/feed'+(i == 0 ? 5 : i)+'.jpg?t='+ (new Date()).getTime();
  }
  setTimeout(refreshThumbs, 15*1000);
}
refreshThumbs();
